from rest_framework import serializers
from .models import Question, Choice, AssessmentResult, Answer


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text', 'score_letter']


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)
    
    class Meta:
        model = Question
        fields = ['id', 'text', 'dimension', 'order', 'choices']


class AnswerInputSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    choice_id = serializers.IntegerField()


class AssessmentSubmissionSerializer(serializers.Serializer):
    session_id = serializers.CharField(max_length=100)
    answers = AnswerInputSerializer(many=True)


class AssessmentResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssessmentResult
        fields = ['session_id', 'personality_type', 'e_score', 'i_score', 
                 's_score', 'n_score', 't_score', 'f_score', 'j_score', 'p_score', 'created_at']
