from django.urls import path
from .views import ping, LevelDetailAPIView

app_name="api"

urlpatterns = [
    path('ping/', ping, name="ping"),
    # path('levels/', LevelListAPIView.as_view()),
    path('level/<str:title>/', LevelDetailAPIView.as_view())
]
