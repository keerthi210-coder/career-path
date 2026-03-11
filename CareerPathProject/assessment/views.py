from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import render
from .models import Question, Choice, AssessmentResult, Answer
from .serializers import (
    QuestionSerializer, 
    AssessmentSubmissionSerializer, 
    AssessmentResultSerializer
)

def home(request):
    return render(request, "assessment/index.html")

@api_view(['GET'])
def get_questions(request):
    """
    Get all assessment questions with their choices
    """
    questions = Question.objects.all().prefetch_related('choices')
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def submit_assessment(request):
    """
    Submit assessment answers and calculate personality type
    """
    serializer = AssessmentSubmissionSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    session_id = serializer.validated_data['session_id']
    answers_data = serializer.validated_data['answers']
    
    # Initialize score counters
    scores = {
        'E': 0, 'I': 0,
        'S': 0, 'N': 0,
        'T': 0, 'F': 0,
        'J': 0, 'P': 0
    }
    
    # Create assessment result
    result = AssessmentResult.objects.create(session_id=session_id)
    
    # Process each answer
    for answer_data in answers_data:
        try:
            question = Question.objects.get(id=answer_data['question_id'])
            choice = Choice.objects.get(id=answer_data['choice_id'], question=question)
            
            # Save the answer
            Answer.objects.create(
                result=result,
                question=question,
                choice=choice
            )
            
            # Increment the score for the chosen letter
            score_letter = choice.score_letter.upper()
            if score_letter in scores:
                scores[score_letter] += 1
                
        except (Question.DoesNotExist, Choice.DoesNotExist):
            result.delete()
            return Response(
                {'error': f'Invalid question or choice ID'},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    # Calculate personality type
    personality_type = calculate_personality_type(scores)
    
    # Update result with scores and personality type
    result.e_score = scores['E']
    result.i_score = scores['I']
    result.s_score = scores['S']
    result.n_score = scores['N']
    result.t_score = scores['T']
    result.f_score = scores['F']
    result.j_score = scores['J']
    result.p_score = scores['P']
    result.personality_type = personality_type
    result.save()
    
    # Return the result
    result_serializer = AssessmentResultSerializer(result)
    return Response(result_serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def get_result(request, session_id):
    """
    Get assessment result by session ID
    """
    result = get_object_or_404(AssessmentResult, session_id=session_id)
    serializer = AssessmentResultSerializer(result)
    return Response(serializer.data)


def calculate_personality_type(scores):
    """
    Calculate MBTI personality type from scores
    
    Args:
        scores: Dictionary with keys E, I, S, N, T, F, J, P
    
    Returns:
        4-letter personality type string (e.g., "INTJ")
    """
    personality_type = ""
    
    # Extraversion (E) vs Introversion (I)
    personality_type += 'E' if scores['E'] >= scores['I'] else 'I'
    
    # Sensing (S) vs Intuition (N)
    personality_type += 'S' if scores['S'] >= scores['N'] else 'N'
    
    # Thinking (T) vs Feeling (F)
    personality_type += 'T' if scores['T'] >= scores['F'] else 'F'
    
    # Judging (J) vs Perceiving (P)
    personality_type += 'J' if scores['J'] >= scores['P'] else 'P'
    
    return personality_type


@api_view(['GET'])
def get_personality_description(request, personality_type):
    """
    Get description for a specific personality type
    """
    descriptions = get_personality_descriptions()
    
    if personality_type.upper() not in descriptions:
        return Response(
            {'error': 'Invalid personality type'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    return Response({
        'personality_type': personality_type.upper(),
        'description': descriptions[personality_type.upper()]
    })


def get_personality_descriptions():
    """
    Return descriptions for all 16 MBTI personality types
    """
    return {
        'INTJ': {
            'name': 'The Architect',
            'description': 'Strategic, analytical, and independent thinkers who excel at planning and problem-solving.',
            'strengths': ['Strategic thinking', 'Independent', 'Determined', 'Innovative'],
            'careers': ['Software Engineer', 'Scientist', 'Strategist', 'Analyst']
        },
        'INTP': {
            'name': 'The Logician',
            'description': 'Innovative inventors with an unquenchable thirst for knowledge and understanding.',
            'strengths': ['Analytical', 'Creative', 'Objective', 'Curious'],
            'careers': ['Researcher', 'Programmer', 'Philosopher', 'Mathematician']
        },
        'ENTJ': {
            'name': 'The Commander',
            'description': 'Bold, imaginative, and strong-willed leaders who find or create solutions.',
            'strengths': ['Leadership', 'Strategic', 'Confident', 'Efficient'],
            'careers': ['CEO', 'Manager', 'Entrepreneur', 'Consultant']
        },
        'ENTP': {
            'name': 'The Debater',
            'description': 'Smart and curious thinkers who love intellectual challenges and debates.',
            'strengths': ['Quick thinking', 'Charismatic', 'Energetic', 'Creative'],
            'careers': ['Entrepreneur', 'Lawyer', 'Inventor', 'Marketing Specialist']
        },
        'INFJ': {
            'name': 'The Advocate',
            'description': 'Quiet and mystical, yet inspiring and idealistic advocates for meaningful causes.',
            'strengths': ['Insightful', 'Principled', 'Passionate', 'Creative'],
            'careers': ['Counselor', 'Writer', 'Psychologist', 'Teacher']
        },
        'INFP': {
            'name': 'The Mediator',
            'description': 'Poetic, kind, and altruistic people who seek harmony and authenticity.',
            'strengths': ['Idealistic', 'Empathetic', 'Creative', 'Open-minded'],
            'careers': ['Writer', 'Artist', 'Counselor', 'Social Worker']
        },
        'ENFJ': {
            'name': 'The Protagonist',
            'description': 'Charismatic and inspiring leaders who motivate others to achieve their potential.',
            'strengths': ['Charismatic', 'Altruistic', 'Natural leader', 'Reliable'],
            'careers': ['Teacher', 'HR Manager', 'Coach', 'Politician']
        },
        'ENFP': {
            'name': 'The Campaigner',
            'description': 'Enthusiastic, creative, and sociable free spirits who find joy in connections.',
            'strengths': ['Enthusiastic', 'Creative', 'Sociable', 'Energetic'],
            'careers': ['Journalist', 'Actor', 'Entrepreneur', 'Counselor']
        },
        'ISTJ': {
            'name': 'The Logistician',
            'description': 'Practical and fact-minded individuals who value reliability and tradition.',
            'strengths': ['Organized', 'Responsible', 'Practical', 'Honest'],
            'careers': ['Accountant', 'Administrator', 'Engineer', 'Military Officer']
        },
        'ISFJ': {
            'name': 'The Defender',
            'description': 'Dedicated and warm protectors who are always ready to defend loved ones.',
            'strengths': ['Supportive', 'Reliable', 'Patient', 'Practical'],
            'careers': ['Nurse', 'Teacher', 'Administrator', 'Social Worker']
        },
        'ESTJ': {
            'name': 'The Executive',
            'description': 'Excellent administrators who manage people and processes efficiently.',
            'strengths': ['Organized', 'Direct', 'Loyal', 'Strong-willed'],
            'careers': ['Manager', 'Judge', 'Police Officer', 'Business Administrator']
        },
        'ESFJ': {
            'name': 'The Consul',
            'description': 'Caring, social, and popular people who are eager to help others.',
            'strengths': ['Caring', 'Social', 'Organized', 'Dutiful'],
            'careers': ['Nurse', 'Teacher', 'Event Coordinator', 'Sales Representative']
        },
        'ISTP': {
            'name': 'The Virtuoso',
            'description': 'Bold and practical experimenters who master tools and techniques.',
            'strengths': ['Practical', 'Flexible', 'Spontaneous', 'Rational'],
            'careers': ['Mechanic', 'Engineer', 'Pilot', 'Forensic Scientist']
        },
        'ISFP': {
            'name': 'The Adventurer',
            'description': 'Flexible and charming artists who are always ready to explore new experiences.',
            'strengths': ['Artistic', 'Curious', 'Flexible', 'Passionate'],
            'careers': ['Artist', 'Designer', 'Musician', 'Chef']
        },
        'ESTP': {
            'name': 'The Entrepreneur',
            'description': 'Smart, energetic, and perceptive people who truly enjoy living on the edge.',
            'strengths': ['Energetic', 'Perceptive', 'Direct', 'Sociable'],
            'careers': ['Entrepreneur', 'Sales', 'Paramedic', 'Marketing']
        },
        'ESFP': {
            'name': 'The Entertainer',
            'description': 'Spontaneous, energetic, and enthusiastic people who love life and entertainment.',
            'strengths': ['Bold', 'Original', 'Practical', 'Observant'],
            'careers': ['Performer', 'Event Planner', 'Sales', 'Tour Guide']
        }
    }



@api_view(['POST'])
def send_report(request):
    """
    Send personality report to user's email
    """
    email = request.data.get('email')
    session_id = request.data.get('session_id')
    personality_type = request.data.get('personality_type')
    
    if not email or not personality_type:
        return Response(
            {'error': 'Email and personality type are required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Get personality description
    descriptions = get_personality_descriptions()
    if personality_type.upper() not in descriptions:
        return Response(
            {'error': 'Invalid personality type'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    description = descriptions[personality_type.upper()]
    
    # Create email content
    subject = f'Your PersonalityPro Report - {personality_type} ({description["name"]})'
    
    message = f"""
Hello!

Thank you for completing the PersonalityPro assessment!

Your Personality Type: {personality_type} - {description['name']}

{description['description']}

Your Key Strengths:
{chr(10).join(f'• {strength}' for strength in description['strengths'])}

Ideal Career Paths:
{chr(10).join(f'• {career}' for career in description['careers'])}

To unlock your complete personality report with detailed insights, visit:
https://personalitypro.com/premium

Best regards,
The PersonalityPro Team

---
This report was generated on {__import__('datetime').datetime.now().strftime('%B %d, %Y')}
"""
    
    try:
        # Send email
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )
        
        return Response({
            'success': True,
            'message': 'Report sent successfully'
        })
        
    except Exception as e:
        print(f'Error sending email: {e}')
        return Response(
            {'error': 'Failed to send email'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# Page views
def login_page(request):
    return render(request, "assessment/login.html")

def assessment_page(request):
    return render(request, "assessment/assessment.html")

def questions_page(request):
    return render(request, "assessment/questions.html")

def loading_page(request):
    return render(request, "assessment/loading.html")

def profile_page(request):
    return render(request, "assessment/profile.html")

def report_page(request):
    return render(request, "assessment/report.html")

def personalities_page(request):
    return render(request, "assessment/personalities.html")

def premium_page(request):
    return render(request, "assessment/premium.html")

def resources_page(request):
    return render(request, "assessment/resources.html")
