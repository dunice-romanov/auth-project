from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView

from auth_app.models import Article
from auth_app.serializers import ArticleSerializer, UserSerializer

class ArticleList(generics.ListCreateAPIView):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

class UserList(generics.ListAPIView):
    permission_classes = (IsAuthenticated,) 
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserCreate(generics.ListCreateAPIView):
    """
    Create new by POST[username, password]
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

