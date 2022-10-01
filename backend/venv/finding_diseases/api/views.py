from django.forms.models import model_to_dict
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, permissions
from level.models import Level
from level.serializers import LevelSerializer

# Create your views here.

def ping(request, *args, **kwargs):
    return JsonResponse({"status": "running"})

"""Django Pure API Detail View""" 
# def get_task(request, id, *args, **kwargs):
#     task = get_object_or_404(Task, id=id)
#     return JsonResponse(model_to_dict(task, fields=["id", "title", "description_short"]))

"""Django Rest Framework Detail API View""" 
# @api_view(["GET"])
# def get_task(request, id, *args, **kwargs):
#     task = get_object_or_404(Task, id=id)
#     return Response(TaskSerializer(task).data)

"""Django Rest Framework Generic Detail API View""" 
class LevelDetailAPIView(generics.RetrieveAPIView):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer
    lookup_field = "title"

"""Django Rest Framework Generic List API View""" 
# class TaskListAPIView(generics.ListAPIView):
#     queryset = Task.objects.all()
#     serializer_class = TaskSerializer