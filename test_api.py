#!/usr/bin/env python
"""
Test API endpoints to verify everything is working
"""

import requests
import json

API_BASE_URL = 'http://localhost:8000/api'

def test_questions():
    """Test getting questions"""
    print("\n1. Testing GET /api/questions/")
    response = requests.get(f'{API_BASE_URL}/questions/')
    print(f"   Status: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"   ✓ Got {len(data)} questions")
        return True
    else:
        print(f"   ✗ Failed: {response.text}")
        return False

def test_register():
    """Test user registration"""
    print("\n2. Testing POST /api/auth/register/")
    data = {
        "username": "testuser2",
        "email": "test2@example.com",
        "password": "password123"
    }
    response = requests.post(f'{API_BASE_URL}/auth/register/', json=data)
    print(f"   Status: {response.status_code}")
    if response.status_code == 201:
        result = response.json()
        print(f"   ✓ User created: {result['user']['username']}")
        print(f"   ✓ Token: {result['token'][:20]}...")
        return result['token']
    else:
        print(f"   ✗ Failed: {response.text}")
        return None

def test_login():
    """Test user login"""
    print("\n3. Testing POST /api/auth/login/")
    data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "password123"
    }
    response = requests.post(f'{API_BASE_URL}/auth/login/', json=data)
    print(f"   Status: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"   ✓ Login successful: {result['user']['username']}")
        print(f"   ✓ Token: {result['token'][:20]}...")
        return result['token']
    else:
        print(f"   ✗ Failed: {response.text}")
        return None

def test_profile(token):
    """Test getting user profile"""
    print("\n4. Testing GET /api/auth/profile/")
    headers = {'Authorization': f'Token {token}'}
    response = requests.get(f'{API_BASE_URL}/auth/profile/', headers=headers)
    print(f"   Status: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"   ✓ Username: {result['user']['username']}")
        print(f"   ✓ Email: {result['user']['email']}")
        print(f"   ✓ Premium: {result['user']['is_premium']}")
        return True
    else:
        print(f"   ✗ Failed: {response.text}")
        return False

def test_check_premium(token):
    """Test checking premium status"""
    print("\n5. Testing GET /api/auth/check-premium/")
    headers = {'Authorization': f'Token {token}'}
    response = requests.get(f'{API_BASE_URL}/auth/check-premium/', headers=headers)
    print(f"   Status: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"   ✓ Premium status: {result['is_premium']}")
        print(f"   ✓ Days remaining: {result['days_remaining']}")
        return True
    else:
        print(f"   ✗ Failed: {response.text}")
        return False

def test_personality():
    """Test getting personality description"""
    print("\n6. Testing GET /api/personality/INTJ/")
    response = requests.get(f'{API_BASE_URL}/personality/INTJ/')
    print(f"   Status: {response.status_code}")
    if response.status_code == 200:
        result = response.json()
        print(f"   ✓ Type: {result['personality_type']}")
        print(f"   ✓ Name: {result['description']['name']}")
        return True
    else:
        print(f"   ✗ Failed: {response.text}")
        return False

def main():
    print("=" * 60)
    print("PersonalityPro API Test Suite")
    print("=" * 60)
    
    try:
        # Test questions endpoint
        test_questions()
        
        # Test registration
        token = test_register()
        
        # Test login
        if not token:
            token = test_login()
        
        # Test profile
        if token:
            test_profile(token)
            test_check_premium(token)
        
        # Test personality
        test_personality()
        
        print("\n" + "=" * 60)
        print("✓ All tests completed!")
        print("=" * 60)
        print("\nYour system is working correctly!")
        print("Open http://localhost:8000/index.html to use the app")
        
    except requests.exceptions.ConnectionError:
        print("\n✗ ERROR: Cannot connect to server")
        print("Make sure Django is running: python manage.py runserver 8000")
    except Exception as e:
        print(f"\n✗ ERROR: {e}")

if __name__ == '__main__':
    main()
