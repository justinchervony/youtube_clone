from django.urls import path, include
from comment import views

urlpatterns = [
    path('', views.create_user_comment),
    path('<str:video_id>', views.get_video_id_comments)
]