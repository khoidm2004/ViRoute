import bcrypt
from rest_framework import serializers
from virouteapp.models import User
from .models import BusRoute,FavPlace


class UserLoginSerializer(serializers.Serializer):
    userEmail = serializers.EmailField()  
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        userEmail = attrs.get('userEmail')
        password = attrs.get('password')
        
        try:
            user = User.objects.get(userEmail=userEmail)
        except User.DoesNotExist:
            raise serializers.ValidationError("Your email does not exist, please check again!")  

        # Check password
        if not bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
            raise serializers.ValidationError("Your password is not correct, please check again!")  

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
    
class BusRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusRoute
        fields = '__all__'
        
class FavPlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavPlace
        fields = '__all__'
        
class UpdateAvatarSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=True)

    class Meta:
        model = User
        fields = ['avatar']

    def update(self, instance, validated_data):
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.save()
        return instance
        
'''class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'''