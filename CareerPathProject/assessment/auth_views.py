from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.utils import timezone
from django.shortcuts import redirect
from django.conf import settings
from datetime import timedelta
from .models import UserProfile, PaymentTransaction
import stripe
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import json
import logging

# Set up logging
logger = logging.getLogger(__name__)


@api_view(['POST'])
@permission_classes([AllowAny])
def google_auth(request):
    """
    Production-ready Google OAuth authentication
    Verifies Google ID token and creates/authenticates user
    """
    token = request.data.get('token')
    
    if not token:
        logger.warning('Google auth attempted without token')
        return Response(
            {'error': 'Google token is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        # Get Google Client ID from settings
        CLIENT_ID = settings.GOOGLE_CLIENT_ID
        
        if not CLIENT_ID:
            logger.error('GOOGLE_CLIENT_ID not configured in settings')
            return Response(
                {'error': 'Google authentication not configured'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        logger.info(f'Attempting to verify token with CLIENT_ID: {CLIENT_ID[:20]}...')
        
        # Verify the token with Google
        try:
            idinfo = id_token.verify_oauth2_token(
                token, 
                google_requests.Request(), 
                CLIENT_ID
            )
            logger.info('Token verified successfully')
        except Exception as verify_error:
            logger.error(f'Token verification failed: {str(verify_error)}')
            return Response(
                {'error': f'Token verification failed: {str(verify_error)}'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Verify token issuer
        if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            logger.warning(f'Invalid token issuer: {idinfo["iss"]}')
            return Response(
                {'error': 'Invalid token issuer'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get user info from token
        email = idinfo.get('email')
        google_id = idinfo.get('sub')
        name = idinfo.get('name', '')
        email_verified = idinfo.get('email_verified', False)
        picture = idinfo.get('picture', '')
        
        if not email:
            logger.warning('Google token missing email')
            return Response(
                {'error': 'Email not provided by Google'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        logger.info(f'Token info - Email: {email}, Verified: {email_verified}')
        
        if not email_verified:
            logger.warning(f'Unverified email attempted login: {email}')
            return Response(
                {'error': 'Email not verified with Google'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if user exists
        user = User.objects.filter(email=email).first()
        
        if not user:
            # Create new user
            username = email.split('@')[0]
            # Make username unique if it exists
            base_username = username
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1
            
            user = User.objects.create_user(
                username=username,
                email=email,
                first_name=name.split()[0] if name else '',
                last_name=' '.join(name.split()[1:]) if len(name.split()) > 1 else ''
            )
            
            # Create user profile
            try:
                profile = UserProfile.objects.create(user=user)
            except Exception as profile_error:
                logger.error(f'Failed to create user profile: {str(profile_error)}')
                user.delete()
                return Response(
                    {'error': f'Failed to create user profile: {str(profile_error)}'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            
            logger.info(f'New user created via Google OAuth: {email}')
        else:
            try:
                profile = user.profile
            except Exception as profile_error:
                logger.warning(f'User profile missing, creating: {str(profile_error)}')
                profile = UserProfile.objects.create(user=user)
            logger.info(f'Existing user logged in via Google OAuth: {email}')
        
        # Create or get token
        auth_token, _ = Token.objects.get_or_create(user=user)
        
        return Response({
            'success': True,
            'token': auth_token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_premium': profile.is_premium_active,
                'name': f"{user.first_name} {user.last_name}".strip(),
                'picture': picture
            }
        })
        
    except ValueError as e:
        logger.error(f'Invalid Google token: {str(e)}')
        return Response(
            {'error': 'Invalid or expired token'},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        logger.error(f'Google auth error: {str(e)}', exc_info=True)
        return Response(
            {'error': 'Authentication failed. Please try again.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    """
    Register a new user
    """
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not username or not email or not password:
        return Response(
            {'error': 'Username, email, and password are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Check if user exists
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'Email already exists'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Create user
    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )
    
    # Create user profile
    UserProfile.objects.create(user=user)
    
    # Create token
    token, _ = Token.objects.get_or_create(user=user)
    
    return Response({
        'success': True,
        'token': token.key,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_premium': False
        }
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    """
    Login user and return token
    """
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response(
            {'error': 'Username and password are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = authenticate(username=username, password=password)
    
    if not user:
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    token, _ = Token.objects.get_or_create(user=user)
    profile = user.profile
    
    return Response({
        'success': True,
        'token': token.key,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_premium': profile.is_premium_active
        }
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """
    Logout user by deleting token
    """
    request.user.auth_token.delete()
    return Response({'success': True, 'message': 'Logged out successfully'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    """
    Get user profile information
    """
    user = request.user
    profile = user.profile
    
    return Response({
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_premium': profile.is_premium_active,
            'premium_end_date': profile.premium_end_date,
            'phone': profile.phone,
            'date_of_birth': profile.date_of_birth,
        }
    })


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    """
    Update user profile
    """
    user = request.user
    profile = user.profile
    
    # Update user fields
    if 'email' in request.data:
        user.email = request.data['email']
        user.save()
    
    # Update profile fields
    if 'phone' in request.data:
        profile.phone = request.data['phone']
    
    if 'date_of_birth' in request.data:
        profile.date_of_birth = request.data['date_of_birth']
    
    profile.save()
    
    return Response({
        'success': True,
        'message': 'Profile updated successfully'
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_payment_intent(request):
    """
    Create Stripe payment intent for premium subscription
    """
    amount = request.data.get('amount', 2999)  # $29.99 in cents
    
    try:
        # Initialize Stripe (you need to set STRIPE_SECRET_KEY in settings)
        stripe.api_key = getattr(settings, 'STRIPE_SECRET_KEY', '')
        
        # Create payment intent
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
            metadata={
                'user_id': request.user.id,
                'username': request.user.username
            }
        )
        
        # Create transaction record
        transaction = PaymentTransaction.objects.create(
            user=request.user,
            amount=amount / 100,  # Convert cents to dollars
            currency='USD',
            payment_method='stripe',
            status='pending',
            stripe_payment_intent_id=intent.id,
            description='Premium Membership - 1 Year'
        )
        
        return Response({
            'success': True,
            'client_secret': intent.client_secret,
            'transaction_id': str(transaction.transaction_id)
        })
        
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def confirm_payment(request):
    """
    Confirm payment and activate premium membership
    """
    transaction_id = request.data.get('transaction_id')
    payment_intent_id = request.data.get('payment_intent_id')
    
    try:
        transaction = PaymentTransaction.objects.get(
            transaction_id=transaction_id,
            user=request.user
        )
        
        # Verify payment with Stripe
        stripe.api_key = getattr(settings, 'STRIPE_SECRET_KEY', '')
        intent = stripe.PaymentIntent.retrieve(payment_intent_id)
        
        if intent.status == 'succeeded':
            # Update transaction
            transaction.status = 'completed'
            transaction.save()
            
            # Activate premium membership
            profile = request.user.profile
            profile.is_premium = True
            profile.premium_start_date = timezone.now()
            profile.premium_end_date = timezone.now() + timedelta(days=365)  # 1 year
            profile.last_payment_date = timezone.now()
            profile.save()
            
            return Response({
                'success': True,
                'message': 'Premium membership activated!',
                'premium_end_date': profile.premium_end_date
            })
        else:
            transaction.status = 'failed'
            transaction.save()
            return Response(
                {'error': 'Payment not completed'},
                status=status.HTTP_400_BAD_REQUEST
            )
            
    except PaymentTransaction.DoesNotExist:
        return Response(
            {'error': 'Transaction not found'},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_premium_status(request):
    """
    Check if user has active premium membership
    """
    profile = request.user.profile
    
    return Response({
        'is_premium': profile.is_premium_active,
        'premium_end_date': profile.premium_end_date,
        'days_remaining': (profile.premium_end_date - timezone.now()).days if profile.premium_end_date else 0
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def payment_history(request):
    """
    Get user's payment history
    """
    transactions = PaymentTransaction.objects.filter(user=request.user)
    
    data = [{
        'transaction_id': str(t.transaction_id),
        'amount': float(t.amount),
        'currency': t.currency,
        'status': t.status,
        'payment_method': t.payment_method,
        'description': t.description,
        'created_at': t.created_at
    } for t in transactions]
    
    return Response({'transactions': data})

@api_view(['POST'])
@permission_classes([AllowAny])
def demo_login(request):
    """
    Demo login for testing without Google OAuth
    Creates or logs in a demo user
    """
    email = request.data.get('email', 'demo@personalitypro.com')
    
    # Check if demo user exists
    user = User.objects.filter(email=email).first()
    
    if not user:
        # Create demo user
        username = email.split('@')[0]
        base_username = username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1
        
        user = User.objects.create_user(
            username=username,
            email=email,
            first_name='Demo',
            last_name='User'
        )
        user.set_password('demo123')  # Set a default password
        user.save()
        
        # Create user profile
        profile = UserProfile.objects.create(user=user)
    else:
        profile = user.profile
    
    # Create or get token
    token, _ = Token.objects.get_or_create(user=user)
    
    return Response({
        'success': True,
        'token': token.key,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_premium': profile.is_premium_active,
            'name': f"{user.first_name} {user.last_name}".strip()
        }
    })
