from django.core.management.base import BaseCommand
from assessment.models import Question, Choice


class Command(BaseCommand):
    help = 'Load MBTI assessment questions into the database'

    def handle(self, *args, **kwargs):
        # Clear existing questions
        Question.objects.all().delete()

        questions_data = [
            # Q1 - EI
            {
                'text': 'At a party do you:',
                'dimension': 'EI',
                'order': 1,
                'choices': [
                    {'text': 'Interact with many, including strangers', 'score_letter': 'E'},
                    {'text': 'Interact with a few, known to you', 'score_letter': 'I'},
                ]
            },
            # Q2 - SN
            {
                'text': 'Are you more:',
                'dimension': 'SN',
                'order': 2,
                'choices': [
                    {'text': 'Realistic than speculative', 'score_letter': 'S'},
                    {'text': 'Speculative than realistic', 'score_letter': 'N'},
                ]
            },
            # Q3 - SN
            {
                'text': 'Is it worse to:',
                'dimension': 'SN',
                'order': 3,
                'choices': [
                    {'text': 'Have your "head in the clouds"', 'score_letter': 'S'},
                    {'text': 'Be "in a rut"', 'score_letter': 'N'},
                ]
            },
            # Q4 - TF
            {
                'text': 'Are you more impressed by:',
                'dimension': 'TF',
                'order': 4,
                'choices': [
                    {'text': 'Principles', 'score_letter': 'T'},
                    {'text': 'Emotions', 'score_letter': 'F'},
                ]
            },
            # Q5 - TF
            {
                'text': 'Are you more drawn toward the:',
                'dimension': 'TF',
                'order': 5,
                'choices': [
                    {'text': 'Convincing', 'score_letter': 'T'},
                    {'text': 'Touching', 'score_letter': 'F'},
                ]
            },
            # Q6 - JP
            {
                'text': 'Do you prefer to work:',
                'dimension': 'JP',
                'order': 6,
                'choices': [
                    {'text': 'To deadlines', 'score_letter': 'J'},
                    {'text': 'Just "whenever"', 'score_letter': 'P'},
                ]
            },
            # Q7 - JP
            {
                'text': 'Do you tend to choose:',
                'dimension': 'JP',
                'order': 7,
                'choices': [
                    {'text': 'Rather carefully', 'score_letter': 'J'},
                    {'text': 'Somewhat impulsively', 'score_letter': 'P'},
                ]
            },
            # Q8 - EI
            {
                'text': 'At parties do you:',
                'dimension': 'EI',
                'order': 8,
                'choices': [
                    {'text': 'Stay late, with increasing energy', 'score_letter': 'E'},
                    {'text': 'Leave early with decreased energy', 'score_letter': 'I'},
                ]
            },
            # Q9 - SN
            {
                'text': 'Are you more attracted to:',
                'dimension': 'SN',
                'order': 9,
                'choices': [
                    {'text': 'Sensible people', 'score_letter': 'S'},
                    {'text': 'Imaginative people', 'score_letter': 'N'},
                ]
            },
            # Q10 - SN
            {
                'text': 'Are you more interested in:',
                'dimension': 'SN',
                'order': 10,
                'choices': [
                    {'text': 'What is actual', 'score_letter': 'S'},
                    {'text': 'What is possible', 'score_letter': 'N'},
                ]
            },
            # Q11 - TF
            {
                'text': 'In judging others are you more swayed by:',
                'dimension': 'TF',
                'order': 11,
                'choices': [
                    {'text': 'Laws than circumstances', 'score_letter': 'T'},
                    {'text': 'Circumstances than laws', 'score_letter': 'F'},
                ]
            },
            # Q12 - TF
            {
                'text': 'In approaching others is your inclination to be somewhat:',
                'dimension': 'TF',
                'order': 12,
                'choices': [
                    {'text': 'Objective', 'score_letter': 'T'},
                    {'text': 'Personal', 'score_letter': 'F'},
                ]
            },
            # Q13 - JP
            {
                'text': 'Are you more:',
                'dimension': 'JP',
                'order': 13,
                'choices': [
                    {'text': 'Punctual', 'score_letter': 'J'},
                    {'text': 'Leisurely', 'score_letter': 'P'},
                ]
            },
            # Q14 - JP
            {
                'text': 'Does it bother you more having things:',
                'dimension': 'JP',
                'order': 14,
                'choices': [
                    {'text': 'Incomplete', 'score_letter': 'J'},
                    {'text': 'Completed', 'score_letter': 'P'},
                ]
            },
            # Q15 - EI
            {
                'text': 'In your social groups do you:',
                'dimension': 'EI',
                'order': 15,
                'choices': [
                    {'text': "Keep abreast of other's happenings", 'score_letter': 'E'},
                    {'text': 'Get behind on the news', 'score_letter': 'I'},
                ]
            },
            # Q16 - SN
            {
                'text': 'In doing ordinary things are you more likely to:',
                'dimension': 'SN',
                'order': 16,
                'choices': [
                    {'text': 'Do it the usual way', 'score_letter': 'S'},
                    {'text': 'Do it your own way', 'score_letter': 'N'},
                ]
            },
            # Q17 - SN
            {
                'text': 'Writers should:',
                'dimension': 'SN',
                'order': 17,
                'choices': [
                    {'text': '"Say what they mean and mean what they say"', 'score_letter': 'S'},
                    {'text': 'Express things more by use of analogy', 'score_letter': 'N'},
                ]
            },
            # Q18 - TF
            {
                'text': 'Which appeals to you more:',
                'dimension': 'TF',
                'order': 18,
                'choices': [
                    {'text': 'Consistency of thought', 'score_letter': 'T'},
                    {'text': 'Harmonious human relationships', 'score_letter': 'F'},
                ]
            },
            # Q19 - TF
            {
                'text': 'Are you more comfortable in making:',
                'dimension': 'TF',
                'order': 19,
                'choices': [
                    {'text': 'Logical judgments', 'score_letter': 'T'},
                    {'text': 'Value judgments', 'score_letter': 'F'},
                ]
            },
            # Q20 - JP
            {
                'text': 'Do you want things:',
                'dimension': 'JP',
                'order': 20,
                'choices': [
                    {'text': 'Settled and decided', 'score_letter': 'J'},
                    {'text': 'Unsettled and undecided', 'score_letter': 'P'},
                ]
            },
            # Q21 - EI
            {
                'text': 'Would you say you are more:',
                'dimension': 'EI',
                'order': 21,
                'choices': [
                    {'text': 'Serious and determined', 'score_letter': 'I'},
                    {'text': 'Easy-going', 'score_letter': 'E'},
                ]
            },
            # Q22 - EI
            {
                'text': 'In phoning do you:',
                'dimension': 'EI',
                'order': 22,
                'choices': [
                    {'text': 'Rarely question that it will all be said', 'score_letter': 'E'},
                    {'text': 'Rehearse what you\'ll say', 'score_letter': 'I'},
                ]
            },
            # Q23 - SN
            {
                'text': 'Facts:',
                'dimension': 'SN',
                'order': 23,
                'choices': [
                    {'text': '"Speak for themselves"', 'score_letter': 'S'},
                    {'text': 'Illustrate principles', 'score_letter': 'N'},
                ]
            },
            # Q24 - SN
            {
                'text': 'Are visionaries:',
                'dimension': 'SN',
                'order': 24,
                'choices': [
                    {'text': 'Somewhat annoying', 'score_letter': 'S'},
                    {'text': 'Rather fascinating', 'score_letter': 'N'},
                ]
            },
            # Q25 - TF
            {
                'text': 'Are you more often:',
                'dimension': 'TF',
                'order': 25,
                'choices': [
                    {'text': 'A cool-headed person', 'score_letter': 'T'},
                    {'text': 'A warm-hearted person', 'score_letter': 'F'},
                ]
            },
            # Q26 - TF
            {
                'text': 'Is it worse to be:',
                'dimension': 'TF',
                'order': 26,
                'choices': [
                    {'text': 'Unjust', 'score_letter': 'T'},
                    {'text': 'Merciless', 'score_letter': 'F'},
                ]
            },
            # Q27 - JP
            {
                'text': 'Should one usually let events occur:',
                'dimension': 'JP',
                'order': 27,
                'choices': [
                    {'text': 'By careful selection and choice', 'score_letter': 'J'},
                    {'text': 'Randomly and by chance', 'score_letter': 'P'},
                ]
            },
            # Q28 - JP
            {
                'text': 'Do you feel better about:',
                'dimension': 'JP',
                'order': 28,
                'choices': [
                    {'text': 'Having purchased', 'score_letter': 'J'},
                    {'text': 'Having the option to buy', 'score_letter': 'P'},
                ]
            },
            # Q29 - EI
            {
                'text': 'In company do you:',
                'dimension': 'EI',
                'order': 29,
                'choices': [
                    {'text': 'Initiate conversation', 'score_letter': 'E'},
                    {'text': 'Wait to be approached', 'score_letter': 'I'},
                ]
            },
            # Q30 - SN
            {
                'text': 'Common sense is:',
                'dimension': 'SN',
                'order': 30,
                'choices': [
                    {'text': 'Rarely questionable', 'score_letter': 'S'},
                    {'text': 'Frequently questionable', 'score_letter': 'N'},
                ]
            },
            # Q31 - SN
            {
                'text': 'Children often do not:',
                'dimension': 'SN',
                'order': 31,
                'choices': [
                    {'text': 'Make themselves useful enough', 'score_letter': 'S'},
                    {'text': 'Exercise their fantasy enough', 'score_letter': 'N'},
                ]
            },
            # Q32 - TF
            {
                'text': 'In making decisions do you feel more comfortable with:',
                'dimension': 'TF',
                'order': 32,
                'choices': [
                    {'text': 'Standards', 'score_letter': 'T'},
                    {'text': 'Feelings', 'score_letter': 'F'},
                ]
            },
            # Q33 - TF
            {
                'text': 'Are you more:',
                'dimension': 'TF',
                'order': 33,
                'choices': [
                    {'text': 'Firm than gentle', 'score_letter': 'T'},
                    {'text': 'Gentle than firm', 'score_letter': 'F'},
                ]
            },
            # Q34 - JP
            {
                'text': 'Which is more admirable:',
                'dimension': 'JP',
                'order': 34,
                'choices': [
                    {'text': 'The ability to organize and be methodical', 'score_letter': 'J'},
                    {'text': 'The ability to adapt and make do', 'score_letter': 'P'},
                ]
            },
            # Q35 - JP
            {
                'text': 'Do you put more value on:',
                'dimension': 'JP',
                'order': 35,
                'choices': [
                    {'text': 'Infinite', 'score_letter': 'J'},
                    {'text': 'Open-minded', 'score_letter': 'P'},
                ]
            },
            # Q36 - EI
            {
                'text': 'Does new and non-routine interaction with others:',
                'dimension': 'EI',
                'order': 36,
                'choices': [
                    {'text': 'Stimulate and energize you', 'score_letter': 'E'},
                    {'text': 'Tax your reserves', 'score_letter': 'I'},
                ]
            },
            # Q37 - SN
            {
                'text': 'Are you more frequently:',
                'dimension': 'SN',
                'order': 37,
                'choices': [
                    {'text': 'A practical sort of person', 'score_letter': 'S'},
                    {'text': 'A fanciful sort of person', 'score_letter': 'N'},
                ]
            },
            # Q38 - TF
            {
                'text': 'Are you more likely to:',
                'dimension': 'TF',
                'order': 38,
                'choices': [
                    {'text': 'See how others are useful', 'score_letter': 'T'},
                    {'text': 'See how others see', 'score_letter': 'F'},
                ]
            },
            # Q39 - TF
            {
                'text': 'Which is more satisfying:',
                'dimension': 'TF',
                'order': 39,
                'choices': [
                    {'text': 'To discuss an issue thoroughly', 'score_letter': 'T'},
                    {'text': 'To arrive at agreement on an issue', 'score_letter': 'F'},
                ]
            },
            # Q40 - TF
            {
                'text': 'Which rules you more:',
                'dimension': 'TF',
                'order': 40,
                'choices': [
                    {'text': 'Your head', 'score_letter': 'T'},
                    {'text': 'Your heart', 'score_letter': 'F'},
                ]
            },
            # Q41 - JP
            {
                'text': 'Are you more comfortable with work that is:',
                'dimension': 'JP',
                'order': 41,
                'choices': [
                    {'text': 'Contracted', 'score_letter': 'J'},
                    {'text': 'Done on a casual basis', 'score_letter': 'P'},
                ]
            },
            # Q42 - JP
            {
                'text': 'Do you tend to look for:',
                'dimension': 'JP',
                'order': 42,
                'choices': [
                    {'text': 'The orderly', 'score_letter': 'J'},
                    {'text': 'Whatever turns up', 'score_letter': 'P'},
                ]
            },
            # Q43 - EI
            {
                'text': 'Do you prefer:',
                'dimension': 'EI',
                'order': 43,
                'choices': [
                    {'text': 'Many friends with brief contact', 'score_letter': 'E'},
                    {'text': 'A few friends with more lengthy contact', 'score_letter': 'I'},
                ]
            },
            # Q44 - SN
            {
                'text': 'Do you go more by:',
                'dimension': 'SN',
                'order': 44,
                'choices': [
                    {'text': 'Facts', 'score_letter': 'S'},
                    {'text': 'Principles', 'score_letter': 'N'},
                ]
            },
            # Q45 - SN
            {
                'text': 'Are you more interested in:',
                'dimension': 'SN',
                'order': 45,
                'choices': [
                    {'text': 'Production and distribution', 'score_letter': 'S'},
                    {'text': 'Design and research', 'score_letter': 'N'},
                ]
            },
            # Q46 - TF
            {
                'text': 'Which is more of a compliment:',
                'dimension': 'TF',
                'order': 46,
                'choices': [
                    {'text': '"There is a very logical person."', 'score_letter': 'T'},
                    {'text': '"There is a very sentimental person."', 'score_letter': 'F'},
                ]
            },
            # Q47 - TF
            {
                'text': 'Do you value in yourself more that you are:',
                'dimension': 'TF',
                'order': 47,
                'choices': [
                    {'text': 'Unwavering', 'score_letter': 'T'},
                    {'text': 'Devoted', 'score_letter': 'F'},
                ]
            },
            # Q48 - JP
            {
                'text': 'Do you more often prefer the:',
                'dimension': 'JP',
                'order': 48,
                'choices': [
                    {'text': 'Final and unalterable statement', 'score_letter': 'J'},
                    {'text': 'Tentative and preliminary statement', 'score_letter': 'P'},
                ]
            },
            # Q49 - JP
            {
                'text': 'Are you more comfortable:',
                'dimension': 'JP',
                'order': 49,
                'choices': [
                    {'text': 'After a decision', 'score_letter': 'J'},
                    {'text': 'Before a decision', 'score_letter': 'P'},
                ]
            },
            # Q50 - EI
            {
                'text': 'Do you:',
                'dimension': 'EI',
                'order': 50,
                'choices': [
                    {'text': 'Speak easily and at length with strangers', 'score_letter': 'E'},
                    {'text': 'Find little to say to strangers', 'score_letter': 'I'},
                ]
            },
            # Q51 - SN
            {
                'text': 'Are you more likely to trust your:',
                'dimension': 'SN',
                'order': 51,
                'choices': [
                    {'text': 'Experience', 'score_letter': 'S'},
                    {'text': 'Hunch', 'score_letter': 'N'},
                ]
            },
            # Q52 - SN
            {
                'text': 'Do you feel:',
                'dimension': 'SN',
                'order': 52,
                'choices': [
                    {'text': 'More practical than ingenious', 'score_letter': 'S'},
                    {'text': 'More ingenious than practical', 'score_letter': 'N'},
                ]
            },
            # Q53 - TF
            {
                'text': 'Which person is more to be complimented – one of:',
                'dimension': 'TF',
                'order': 53,
                'choices': [
                    {'text': 'Clear reason', 'score_letter': 'T'},
                    {'text': 'Strong feeling', 'score_letter': 'F'},
                ]
            },
            # Q54 - TF
            {
                'text': 'Are you inclined more to be:',
                'dimension': 'TF',
                'order': 54,
                'choices': [
                    {'text': 'Fair-minded', 'score_letter': 'T'},
                    {'text': 'Sympathetic', 'score_letter': 'F'},
                ]
            },
            # Q55 - JP
            {
                'text': 'Is it preferable mostly to:',
                'dimension': 'JP',
                'order': 55,
                'choices': [
                    {'text': 'Make sure things are arranged', 'score_letter': 'J'},
                    {'text': 'Just let things happen', 'score_letter': 'P'},
                ]
            },
            # Q56 - JP
            {
                'text': 'In relationships should most things be:',
                'dimension': 'JP',
                'order': 56,
                'choices': [
                    {'text': 'Re-negotiable', 'score_letter': 'J'},
                    {'text': 'Random and circumstantial', 'score_letter': 'P'},
                ]
            },
            # Q57 - EI
            {
                'text': 'When the phone rings do you:',
                'dimension': 'EI',
                'order': 57,
                'choices': [
                    {'text': 'Hasten to get to it first', 'score_letter': 'E'},
                    {'text': 'Hope someone else will answer', 'score_letter': 'I'},
                ]
            },
            # Q58 - SN
            {
                'text': 'Do you prize more in yourself:',
                'dimension': 'SN',
                'order': 58,
                'choices': [
                    {'text': 'A strong sense of reality', 'score_letter': 'S'},
                    {'text': 'A vivid imagination', 'score_letter': 'N'},
                ]
            },
            # Q59 - SN
            {
                'text': 'Are you drawn more to:',
                'dimension': 'SN',
                'order': 59,
                'choices': [
                    {'text': 'Fundamentals', 'score_letter': 'S'},
                    {'text': 'Overtones', 'score_letter': 'N'},
                ]
            },
            # Q60 - TF
            {
                'text': 'Which seems the greater error:',
                'dimension': 'TF',
                'order': 60,
                'choices': [
                    {'text': 'To be too passionate', 'score_letter': 'F'},
                    {'text': 'To be too objective', 'score_letter': 'T'},
                ]
            },
            # Q61 - TF
            {
                'text': 'Do you see yourself as basically:',
                'dimension': 'TF',
                'order': 61,
                'choices': [
                    {'text': 'Hard-headed', 'score_letter': 'T'},
                    {'text': 'Soft-hearted', 'score_letter': 'F'},
                ]
            },
            # Q62 - JP
            {
                'text': 'Which situation appeals to you more:',
                'dimension': 'JP',
                'order': 62,
                'choices': [
                    {'text': 'The structured and scheduled', 'score_letter': 'J'},
                    {'text': 'The unstructured and unscheduled', 'score_letter': 'P'},
                ]
            },
            # Q63 - JP
            {
                'text': 'Are you a person that is more:',
                'dimension': 'JP',
                'order': 63,
                'choices': [
                    {'text': 'Routinized than whimsical', 'score_letter': 'J'},
                    {'text': 'Whimsical than routinized', 'score_letter': 'P'},
                ]
            },
            # Q64 - EI
            {
                'text': 'Are you more inclined to be:',
                'dimension': 'EI',
                'order': 64,
                'choices': [
                    {'text': 'Easy to approach', 'score_letter': 'E'},
                    {'text': 'Somewhat reserved', 'score_letter': 'I'},
                ]
            },
            # Q65 - SN
            {
                'text': 'In writings do you prefer:',
                'dimension': 'SN',
                'order': 65,
                'choices': [
                    {'text': 'The more literal', 'score_letter': 'S'},
                    {'text': 'The more figurative', 'score_letter': 'N'},
                ]
            },
            # Q66 - TF
            {
                'text': 'Is it harder for you to:',
                'dimension': 'TF',
                'order': 66,
                'choices': [
                    {'text': 'Identify with others', 'score_letter': 'T'},
                    {'text': 'Utilize others', 'score_letter': 'F'},
                ]
            },
            # Q67 - TF
            {
                'text': 'Which do you wish more for yourself:',
                'dimension': 'TF',
                'order': 67,
                'choices': [
                    {'text': 'Clarity of reason', 'score_letter': 'T'},
                    {'text': 'Strength of compassion', 'score_letter': 'F'},
                ]
            },
            # Q68 - TF
            {
                'text': 'Which is the greater fault:',
                'dimension': 'TF',
                'order': 68,
                'choices': [
                    {'text': 'Being indiscriminate', 'score_letter': 'F'},
                    {'text': 'Being critical', 'score_letter': 'T'},
                ]
            },
            # Q69 - JP
            {
                'text': 'Do you prefer the:',
                'dimension': 'JP',
                'order': 69,
                'choices': [
                    {'text': 'Planned event', 'score_letter': 'J'},
                    {'text': 'Unplanned event', 'score_letter': 'P'},
                ]
            },
            # Q70 - JP
            {
                'text': 'Do you tend to be more:',
                'dimension': 'JP',
                'order': 70,
                'choices': [
                    {'text': 'Deliberate than spontaneous', 'score_letter': 'J'},
                    {'text': 'Spontaneous than deliberate', 'score_letter': 'P'},
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
