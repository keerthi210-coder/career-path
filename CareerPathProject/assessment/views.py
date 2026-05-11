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

    # Log for debugging
    import logging
    logger = logging.getLogger(__name__)
    logger.info(f'Questions endpoint called. Found {questions.count()} questions')

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
            'name': 'The Executive',
            'description': 'As an ENTJ, your primary mode of living is focused externally, where you deal with things rationally and logically. You are a natural born leader who lives in a world of possibilities, seeing challenges to be surmounted and wanting to be the one responsible for surmounting them. You have a drive for leadership, well-served by your quickness to grasp complexities, your ability to absorb large amounts of impersonal information, and your quick and decisive judgments. You are very career-focused and fit into the corporate world naturally, constantly scanning your environment for potential problems to turn into solutions. You are tireless in your efforts on the job and driven to visualize where an organization is headed. You are assertive, innovative, a long-range thinker with an excellent ability to translate theories and possibilities into solid plans of action.',
            'strengths': ['Natural born leader with drive and decisiveness', 'Excellent verbal communication skills', 'Fair-minded and interested in doing the right thing', 'Able to turn conflict situations into positive lessons'],
            'careers': ['CEO / Executive', 'Management Consultant', 'Entrepreneur', 'Corporate Lawyer', 'Investment Banker']
        },
        'ENTP': {
            'name': 'The Visionary',
            'description': 'As an ENTP, your primary mode of living is focused externally, where you take things in primarily via your intuition. You are an upbeat visionary who highly values knowledge and spends much of your life seeking a higher understanding. You live in the world of possibilities, and become excited about concepts, challenges and difficulties. With Extraverted Intuition dominating your personality, you are constantly absorbing ideas and images about the situations you are presented with, and are usually extremely quick and accurate in your ability to size up a situation. You are an idea person — your perceptive abilities cause you to see possibilities everywhere. You get excited and enthusiastic about your ideas, and are able to spread your enthusiasm to others. You are a fluent conversationalist, mentally quick, and enjoy verbal sparring. You love to debate issues, and may even switch sides sometimes just for the love of the debate. Creative, clever, curious, and theoretical, you have a broad range of possibilities in your life.',
            'strengths': ['Enthusiastic, upbeat, and excellent communicator', 'Sees possibilities everywhere — great at improvising creative solutions', 'Extremely interested in self-improvement and growth', 'Able to quickly find the best or most useful side of others'],
            'careers': ['Innovation Manager', 'Entrepreneur', 'Marketing Director', 'Product Manager', 'Strategic Consultant']
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
            'name': 'The Giver',
            'description': 'As an ENFJ, your primary mode of living is focused externally, dealing with things according to how you feel about them and how they fit your personal value system. You are a people-focused individual who lives in the world of human possibilities. More so than any other type, you have excellent people skills — you understand and care about people, and have a special talent for bringing out the best in others. Your main interest in life is giving love, support, and a good time to other people. You are focused on understanding, supporting, and encouraging others. You make things happen for people, and get your best personal satisfaction from this. People love ENFJs — you are fun to be with, straight-forward, honest, full of self-confidence, bright, energetic, and fast-paced. You like things to be well-organized and will work hard at maintaining structure. You get your best personal satisfaction from serving others.',
            'strengths': ['Genuinely and warmly interested in people', 'Exceptional people skills', 'Strong organizational capabilities', 'Loyal, honest, creative, and imaginative'],
            'careers': ['Teacher / Professor', 'HR Manager', 'Counselor / Therapist', 'Public Relations Manager', 'Life Coach']
        },
        'ENFP': {
            'name': 'The Inspirer',
            'description': 'As an ENFP, your primary mode of living is focused externally, where you take things in primarily via your intuition. You are warm, enthusiastic, typically very bright and full of potential. You live in the world of possibilities, and can become very passionate and excited about things. Your enthusiasm lends you the ability to inspire and motivate others more so than we see in other types. You can talk your way in or out of anything. You love life, seeing it as a special gift, and strive to make the most out of it. You have an unusually broad range of skills and talents and are good at most things which interest you. You have great people skills — genuinely warm and interested in people, with an exceptional ability to intuitively understand a person after a very short period of time. ENFPs are charming, ingenuous, risk-taking, sensitive, people-oriented individuals with capabilities ranging across a broad spectrum.',
            'strengths': ['Exceptionally perceptive about people and situations', 'Warmly, genuinely interested in people with great people skills', 'Creative, energetic, and highly motivational', 'Well-developed verbal and written communication skills'],
            'careers': ['Brand Manager', 'Journalist / Writer', 'Counselor / Coach', 'Entrepreneur', 'Marketing Director']
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
            'name': 'The Caregiver',
            'description': 'As an ESFJ, your primary mode of living is focused externally, where you deal with things according to how you feel about them, or how they fit in with your personal value system. You are a people person — you love people and are warmly interested in others. You have a special skill at bringing out the best in others and are extremely good at reading people and understanding their point of view. You take your responsibilities very seriously and are very dependable. You value security and stability, and have a strong focus on the details of life. You see before others do what needs to be done, and do whatever it takes to make sure it gets done. You are warm and energetic, and get a lot of your personal satisfaction from the happiness of others. At your best you are warm, sympathetic, helpful, cooperative, tactful, down-to-earth, practical, thorough, consistent, organized, enthusiastic, and energetic. You enjoy tradition and security, and seek stable lives rich in contact with friends and family.',
            'strengths': ['Warm, friendly, and affirming by nature', 'Service-oriented — wants to please others and takes commitments seriously', 'Responsible and practical — can be counted on for day-to-day necessities', 'Generally upbeat and popular; people are drawn towards them'],
            'careers': ['Event Planner', 'Healthcare Administrator', 'Teacher', 'HR Manager', 'Social Worker']
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
