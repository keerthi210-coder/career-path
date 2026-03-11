from django.db import models
from django.contrib.auth.models import User
import uuid


class Question(models.Model):
    """MBTI Assessment Question"""
    text = models.TextField()
    dimension = models.CharField(max_length=2)  # EI, SN, TF, JP
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.dimension} - {self.text[:50]}"


class Choice(models.Model):
    """Answer choice for a question"""
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    text = models.TextField()
    score_letter = models.CharField(max_length=1)  # E, I, S, N, T, F, J, P
    
    def __str__(self):
        return f"{self.score_letter}: {self.text[:30]}"


class AssessmentResult(models.Model):
    """Stores assessment results"""
    session_id = models.CharField(max_length=100, unique=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assessments')
    
    # Dimension scores
    e_score = models.IntegerField(default=0)
    i_score = models.IntegerField(default=0)
    s_score = models.IntegerField(default=0)
    n_score = models.IntegerField(default=0)
    t_score = models.IntegerField(default=0)
    f_score = models.IntegerField(default=0)
    j_score = models.IntegerField(default=0)
    p_score = models.IntegerField(default=0)
    
    # Result
    personality_type = models.CharField(max_length=4)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.personality_type} - {self.session_id}"


class Answer(models.Model):
    """Individual answer to a question"""
    result = models.ForeignKey(AssessmentResult, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.result.session_id} - Q{self.question.id}"


class UserProfile(models.Model):
    """Extended user profile with premium membership"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    
    # Premium membership
    is_premium = models.BooleanField(default=False)
    premium_start_date = models.DateTimeField(null=True, blank=True)
    premium_end_date = models.DateTimeField(null=True, blank=True)
    
    # Payment info (store payment IDs, not card details)
    stripe_customer_id = models.CharField(max_length=255, blank=True, null=True)
    last_payment_date = models.DateTimeField(null=True, blank=True)
    
    # User info
    phone = models.CharField(max_length=20, blank=True, null=True)
    date_of_birth = models.DateField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - {'Premium' if self.is_premium else 'Free'}"
    
    @property
    def is_premium_active(self):
        """Check if premium membership is currently active"""
        if not self.is_premium or not self.premium_end_date:
            return False
        from django.utils import timezone
        return timezone.now() < self.premium_end_date


class PaymentTransaction(models.Model):
    """Track payment transactions"""
    PAYMENT_STATUS = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]
    
    PAYMENT_METHOD = [
        ('stripe', 'Stripe'),
        ('paypal', 'PayPal'),
        ('razorpay', 'Razorpay'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    transaction_id = models.CharField(max_length=255, unique=True, default=uuid.uuid4)
    
    # Payment details
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD)
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    
    # External payment gateway IDs
    stripe_payment_intent_id = models.CharField(max_length=255, blank=True, null=True)
    paypal_order_id = models.CharField(max_length=255, blank=True, null=True)
    
    # Metadata
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.username} - ${self.amount} - {self.status}"


class EmailReport(models.Model):
    """Track sent email reports"""
    email = models.EmailField()
    session_id = models.CharField(max_length=100)
    personality_type = models.CharField(max_length=4)
    sent_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    
    class Meta:
        ordering = ['-sent_at']
    
    def __str__(self):
        return f"{self.email} - {self.personality_type}"
