from django.contrib import admin
from .models import Question, Choice, AssessmentResult, Answer, UserProfile, PaymentTransaction, EmailReport


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 2
    fields = ['text', 'score_letter']


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['order', 'text_preview', 'dimension']
    list_filter = ['dimension']
    search_fields = ['text']
    ordering = ['order']
    inlines = [ChoiceInline]
    
    def text_preview(self, obj):
        return obj.text[:50] + '...' if len(obj.text) > 50 else obj.text
    text_preview.short_description = 'Question'


@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ['question', 'text_preview', 'score_letter']
    list_filter = ['score_letter']
    search_fields = ['text']
    
    def text_preview(self, obj):
        return obj.text[:40] + '...' if len(obj.text) > 40 else obj.text
    text_preview.short_description = 'Choice Text'


class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 0
    readonly_fields = ['question', 'choice']


@admin.register(AssessmentResult)
class AssessmentResultAdmin(admin.ModelAdmin):
    list_display = ['session_id', 'personality_type', 'user', 'created_at', 'score_summary']
    list_filter = ['personality_type', 'created_at']
    search_fields = ['session_id', 'user__username']
    readonly_fields = ['session_id', 'personality_type', 'e_score', 'i_score', 
                      's_score', 'n_score', 't_score', 'f_score', 'j_score', 'p_score', 'created_at']
    inlines = [AnswerInline]
    
    def score_summary(self, obj):
        return f"E:{obj.e_score} I:{obj.i_score} S:{obj.s_score} N:{obj.n_score} T:{obj.t_score} F:{obj.f_score} J:{obj.j_score} P:{obj.p_score}"
    score_summary.short_description = 'Scores'


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ['result', 'question', 'choice']
    search_fields = ['result__session_id']


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'is_premium', 'premium_end_date', 'created_at']
    list_filter = ['is_premium', 'created_at']
    search_fields = ['user__username', 'user__email']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(PaymentTransaction)
class PaymentTransactionAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'currency', 'status', 'payment_method', 'created_at']
    list_filter = ['status', 'payment_method', 'created_at']
    search_fields = ['user__username', 'transaction_id', 'stripe_payment_intent_id']
    readonly_fields = ['transaction_id', 'created_at', 'updated_at']


@admin.register(EmailReport)
class EmailReportAdmin(admin.ModelAdmin):
    list_display = ['email', 'personality_type', 'user', 'sent_at']
    list_filter = ['personality_type', 'sent_at']
    search_fields = ['email', 'session_id', 'user__username']
    readonly_fields = ['sent_at']
