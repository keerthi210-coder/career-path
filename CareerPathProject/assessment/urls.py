from django.urls import path
from . import views, auth_views

app_name = 'assessment'

urlpatterns = [
    path('', views.home, name='home'),
    
    # Page views
    path('login/', views.login_page, name='login_page'),
    path('assessment/', views.assessment_page, name='assessment_page'),
    path('questions/', views.questions_page, name='questions_page'),
    path('loading/', views.loading_page, name='loading_page'),
    path('profile/', views.profile_page, name='profile_page'),
    path('report/', views.report_page, name='report_page'),
    path('personalities/', views.personalities_page, name='personalities_page'),
    path('premium/', views.premium_page, name='premium_page'),
    path('resources/', views.resources_page, name='resources_page'),
    
    # API endpoints
    path('api/questions/', views.get_questions, name='get_questions'),
    path('api/submit-assessment/', views.submit_assessment, name='submit_assessment'),
    path('api/result/<str:session_id>/', views.get_result, name='get_result'),
    path('api/personality/<str:personality_type>/', views.get_personality_description, name='personality_description'),
    path('api/send-report/', views.send_report, name='send_report'),
    
    # Authentication endpoints
    path('api/auth/register/', auth_views.register, name='register'),
    path('api/auth/login/', auth_views.login, name='login'),
    path('api/auth/logout/', auth_views.logout, name='logout'),
    path('api/auth/google/', auth_views.google_auth, name='google_auth'),
    path('api/auth/demo-login/', auth_views.demo_login, name='demo_login'),
    path('api/auth/profile/', auth_views.get_profile, name='get_profile'),
    path('api/auth/update-profile/', auth_views.update_profile, name='update_profile'),
    path('api/auth/check-premium/', auth_views.check_premium_status, name='check_premium'),
    
    # Payment endpoints
    path('api/payment/create-intent/', auth_views.create_payment_intent, name='create_payment_intent'),
    path('api/payment/confirm/', auth_views.confirm_payment, name='confirm_payment'),
    path('api/payment/history/', auth_views.payment_history, name='payment_history'),
]
