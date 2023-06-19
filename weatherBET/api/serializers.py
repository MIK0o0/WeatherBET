from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import Bet, CityWeather
from django.core.exceptions import ValidationError

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
		user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username')
		
class BalanceSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ['user_id','balance']
	def update(self, instance, validated_data):
		print("Update")
		amount = validated_data['amount']
		if amount is not None:
			instance.balance -= amount
			instance.save()
		return instance



class BetSerializer(serializers.Serializer):
	bet_type = serializers.BooleanField()
	city_name = serializers.CharField()
	amount = serializers.FloatField()
	reward = serializers.FloatField()
	
	def create(self, bet_data, user_data):
		print("create")
		user_id = user_data['user_id']
		app_user = UserModel.objects.get(user_id=user_id)
		city_name = bet_data['city_name']
		city_weather = CityWeather.objects.get(name=city_name)

		Bet.objects.create(
			user_id = app_user,
			bet_type = bet_data['bet_type'],
			city_name = city_weather,
			amount = bet_data['amount'],
			reward = bet_data['reward'] 
		)
	
	