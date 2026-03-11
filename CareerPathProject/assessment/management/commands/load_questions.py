from django.core.management.base import BaseCommand
from assessment.models import Question, Choice


class Command(BaseCommand):
    help = 'Load MBTI assessment questions into the database'

    def handle(self, *args, **kwargs):
        # Clear existing questions
        Question.objects.all().delete()
        
        questions_data = [
            {
                'text': 'You value:',
                'dimension': 'TF',
                'order': 1,
                'choices': [
                    {'text': 'Justice and fairness', 'score_letter': 'T'},
                    {'text': 'Harmony and compassion', 'score_letter': 'F'},
                ]
            },
            {
                'text': 'When making travel plans, you:',
                'dimension': 'JP',
                'order': 2,
                'choices': [
                    {'text': 'Plan every detail in advance', 'score_letter': 'J'},
                    {'text': 'Decide as you go', 'score_letter': 'P'},
                ]
            },
            {
                'text': 'In social situations, you usually:',
                'dimension': 'EI',
                'order': 3,
                'choices': [
                    {'text': 'Observe and listen', 'score_letter': 'I'},
                    {'text': 'Start conversations and interact actively', 'score_letter': 'E'},
                ]
            },
            {
                'text': 'In conflicts, you:',
                'dimension': 'TF',
                'order': 4,
                'choices': [
                    {'text': 'Stay objective and focus on solutions', 'score_letter': 'T'},
                    {'text': 'Consider how others feel', 'score_letter': 'F'},
                ]
            },
            {
                'text': 'You prefer:',
                'dimension': 'JP',
                'order': 5,
                'choices': [
                    {'text': 'Having a schedule and plan', 'score_letter': 'J'},
                    {'text': 'Keeping options open and being spontaneous', 'score_letter': 'P'},
                ]
            },
            {
                'text': 'When working on a project, you:',
                'dimension': 'JP',
                'order': 6,
                'choices': [
                    {'text': 'Finish it ahead of time', 'score_letter': 'J'},
                    {'text': 'Work best under last-minute pressure', 'score_letter': 'P'},
                ]
            },
            {
                'text': 'You are more interested in:',
                'dimension': 'SN',
                'order': 7,
                'choices': [
                    {'text': 'What is happening now', 'score_letter': 'S'},
                    {'text': 'What could happen in the future', 'score_letter': 'N'},
                ]
            },
            {
                'text': 'You remember:',
                'dimension': 'SN',
                'order': 8,
                'choices': [
                    {'text': 'Specific details', 'score_letter': 'S'},
                    {'text': 'Patterns and underlying meanings', 'score_letter': 'N'},
                ]
            },
            {
                'text': 'If a friend is upset, you:',
                'dimension': 'TF',
                'order': 9,
                'choices': [
                    {'text': 'Offer practical advice', 'score_letter': 'T'},
                    {'text': 'Listen and empathize with their feelings', 'score_letter': 'F'},
                ]
            },
            {
                'text': 'You enjoy activities that require:',
                'dimension': 'TF',
                'order': 10,
                'choices': [
                    {'text': 'Critical thinking and strategy', 'score_letter': 'T'},
                    {'text': 'Social interaction and collaboration', 'score_letter': 'F'},
                ]
            },
            {
                'text': 'After a long week, you recharge by:',
                'dimension': 'EI',
                'order': 11,
                'choices': [
                    {'text': 'Spending quiet time alone', 'score_letter': 'I'},
                    {'text': 'Going out with friends', 'score_letter': 'E'},
                ]
            },
            {
                'text': 'You enjoy:',
                'dimension': 'EI',
                'order': 12,
                'choices': [
                    {'text': 'Thinking deeply about ideas', 'score_letter': 'I'},
                    {'text': 'Engaging in dynamic activities and people', 'score_letter': 'E'},
                ]
            },
            {
                'text': 'You prefer to spend your free time:',
                'dimension': 'EI',
                'order': 13,
                'choices': [
                    {'text': 'Alone or with a close friend', 'score_letter': 'I'},
                    {'text': 'At a party or in a group', 'score_letter': 'E'},
                ]
            },
            {
                'text': 'You prefer:',
                'dimension': 'SN',
                'order': 14,
                'choices': [
                    {'text': 'Facts and real-life examples', 'score_letter': 'S'},
                    {'text': 'Ideas and abstract concepts', 'score_letter': 'N'},
                ]
            },
            {
                'text': 'When making decisions, you rely more on:',
                'dimension': 'TF',
                'order': 15,
                'choices': [
                    {'text': 'Logic and objective analysis', 'score_letter': 'T'},
                    {'text': 'Personal values and feelings', 'score_letter': 'F'},
                ]
            },
            {
                'text': 'You are most satisfied when:',
                'dimension': 'TF',
                'order': 16,
                'choices': [
                    {'text': 'Solving challenging problems or creating plans', 'score_letter': 'T'},
                    {'text': 'Helping or inspiring others', 'score_letter': 'F'},
                    {'text': 'Maintaining order and completing tasks efficiently', 'score_letter': 'T'},
                    {'text': 'Exploring new experiences and taking risks', 'score_letter': 'F'},
                ]
            },
            {
                'text': 'You often:',
                'dimension': 'SN',
                'order': 17,
                'choices': [
                    {'text': 'Think about long-term goals and possibilities', 'score_letter': 'N'},
                    {'text': 'Focus on the here and now', 'score_letter': 'S'},
                ]
            },
            {
                'text': 'Deadlines:',
                'dimension': 'JP',
                'order': 18,
                'choices': [
                    {'text': 'Motivate you to plan and complete early', 'score_letter': 'J'},
                    {'text': 'Push you to work creatively closer to the end', 'score_letter': 'P'},
                ]
            },
            {
                'text': 'When solving a problem, you:',
                'dimension': 'SN',
                'order': 19,
                'choices': [
                    {'text': 'Focus on practical solutions', 'score_letter': 'S'},
                    {'text': 'Consider many possibilities and future outcomes', 'score_letter': 'N'},
                ]
            },
            {
                'text': 'You like:',
                'dimension': 'JP',
                'order': 20,
                'choices': [
                    {'text': 'Organized, structured environments', 'score_letter': 'J'},
                    {'text': 'Flexible, adaptable environments', 'score_letter': 'P'},
                ]
            },
            {
                'text': 'When in a group project, you prefer to:',
                'dimension': 'EI',
                'order': 21,
                'choices': [
                    {'text': 'Lead and organize tasks', 'score_letter': 'E'},
                    {'text': 'Support and contribute creatively', 'score_letter': 'I'},
                ]
            },
            {
                'text': 'When making decisions, you:',
                'dimension': 'EI',
                'order': 22,
                'choices': [
                    {'text': 'Reflect internally first', 'score_letter': 'I'},
                    {'text': 'Discuss with others and get feedback', 'score_letter': 'E'},
                ]
            },
            {
                'text': 'When giving feedback, you:',
                'dimension': 'TF',
                'order': 23,
                'choices': [
                    {'text': 'Focus on facts and performance', 'score_letter': 'T'},
                    {'text': 'Focus on encouragement and support', 'score_letter': 'F'},
                ]
            },
            {
                'text': 'You prefer:',
                'dimension': 'SN',
                'order': 24,
                'choices': [
                    {'text': 'Step-by-step instructions', 'score_letter': 'S'},
                    {'text': 'Finding your own method', 'score_letter': 'N'},
                ]
            },
            {
                'text': 'Which statement best describes you:',
                'dimension': 'TF',
                'order': 25,
                'choices': [
                    {'text': 'I enjoy analyzing and strategizing', 'score_letter': 'T'},
                    {'text': 'I enjoy helping and understanding others', 'score_letter': 'F'},
                    {'text': 'I enjoy organizing and making things work', 'score_letter': 'T'},
                    {'text': 'I enjoy spontaneity and adventure', 'score_letter': 'F'},
                ]
            },
        ]
        
        created_count = 0
        for q_data in questions_data:
            question = Question.objects.create(
                text=q_data['text'],
                dimension=q_data['dimension'],
                order=q_data['order']
            )
            
            for choice_data in q_data['choices']:
                Choice.objects.create(
                    question=question,
                    text=choice_data['text'],
                    score_letter=choice_data['score_letter']
                )
            
            created_count += 1
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully loaded {created_count} questions with their choices'
            )
        )

