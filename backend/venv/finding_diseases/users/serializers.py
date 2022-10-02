from rest_framework import serializers
from .models import CustomUser
from user_statistics.models import UserStatistics

class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)
    total_count = serializers.ReadOnlyField(source="statistics.total_count")
    total_correct_count = serializers.ReadOnlyField(source="statistics.total_correct_count")

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'user_name', 'password', 'total_count', 'total_correct_count')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance