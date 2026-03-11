#!/usr/bin/env python
"""
Quick test script to verify Django setup
Run this after: python manage.py migrate && python manage.py load_questions
"""

import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'personalitypro.settings')
django.setup()

from assessment.models import Question, Choice

def test_setup():
    print("=" * 60)
    print("PersonalityPro Django Setup Test")
    print("=" * 60)
    
    # Test 1: Check questions loaded
    question_count = Question.objects.count()
    print(f"\n✓ Questions loaded: {question_count}")
    
    if question_count != 15:
        print(f"  ⚠ Warning: Expected 15 questions, found {question_count}")
        print("  Run: python manage.py load_questions")
    else:
        print("  ✓ All 15 MBTI questions loaded successfully!")
    
    # Test 2: Check choices
    choice_count = Choice.objects.count()
    print(f"\n✓ Choices loaded: {choice_count}")
    
    if choice_count != 30:
        print(f"  ⚠ Warning: Expected 30 choices (2 per question), found {choice_count}")
    else:
        print("  ✓ All choices loaded successfully!")
    
    # Test 3: Check dimensions
    dimensions = Question.objects.values_list('dimension', flat=True).distinct()
    print(f"\n✓ Dimensions covered: {', '.join(dimensions)}")
    
    expected_dimensions = ['EI', 'SN', 'TF', 'JP']
    if set(dimensions) == set(expected_dimensions):
        print("  ✓ All 4 MBTI dimensions covered!")
    else:
        print(f"  ⚠ Warning: Expected {expected_dimensions}, found {list(dimensions)}")
    
    # Test 4: Show question distribution
    print("\n✓ Question distribution by dimension:")
    for dim in expected_dimensions:
        count = Question.objects.filter(dimension=dim).count()
        print(f"  - {dim}: {count} questions")
    
    # Test 5: Sample question
    first_question = Question.objects.first()
    if first_question:
        print(f"\n✓ Sample question:")
        print(f"  Q: {first_question.text}")
        for choice in first_question.choices.all():
            print(f"    - {choice.text} ({choice.score_letter})")
    
    print("\n" + "=" * 60)
    print("Setup test complete!")
    print("=" * 60)
    print("\nNext steps:")
    print("1. Start server: python manage.py runserver 8000")
    print("2. Open browser: http://localhost:8000/index.html")
    print("3. Take the assessment!")
    print("\n")

if __name__ == '__main__':
    try:
        test_setup()
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\nMake sure you've run:")
        print("  python manage.py migrate")
        print("  python manage.py load_questions")
        sys.exit(1)
