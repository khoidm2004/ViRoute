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
    
class UserSerializer(serializers.ModelSerializer): # sign up
    class Meta:
        model = User
        fields = ['fullName', 'phoneNumber', 'userEmail', 'password']
        # fields = ['userID', 'fullName', 'phoneNumber', 'userEmail', 'balance', 'citizenship', 'dateofbirth', 'password']

    def create(self, validated_data):
        password = validated_data['password']
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        validated_data['password'] = hashed_password

        user = User.objects.create(**validated_data)
        return user