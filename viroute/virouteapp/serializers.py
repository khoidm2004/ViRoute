import bcrypt
from rest_framework import serializers
from virouteapp.models import User

class UserLoginSerializer(serializers.Serializer):
    userEmail = serializers.EmailField()  
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        userEmail = attrs.get('userEmail')
        password = attrs.get('password')
        
        try:
            user = User.objects.get(userEmail=userEmail)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials")  

        # Check password
        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            raise serializers.ValidationError("Invalid credentials")  

        attrs['user'] = user 
        return attrs