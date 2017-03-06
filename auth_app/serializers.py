from django.contrib.auth.models import User

from rest_framework import serializers

from auth_app.models import Article 


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title', 'text')

class UserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        print('*********\nCREATEUSER\n***************')
        user = User.objects.create_user(**validated_data)
        return user


    class Meta:
        model = User
        fields = ('username', 'password', 'email')