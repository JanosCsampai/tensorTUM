from django.urls import path
from .views import ping, LevelDetailAPIView, CTImageListAPIView, CTImageForCategory

app_name="api"

urlpatterns = [
    path('ping/', ping, name="ping"),
    path('ctimages/<int:amount>/', CTImageListAPIView.as_view()),
    path('ctimages/<str:category>/<int:amount>/', CTImageForCategory.as_view()),
    path('level/<str:title>/', LevelDetailAPIView.as_view())
]
