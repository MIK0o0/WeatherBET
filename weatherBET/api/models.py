from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class CityWeather(models.Model):
    name = models.CharField(max_length=100, unique=True)
    was_rain = models.BooleanField()
    forecast_mm = models.FloatField()
    precip_mm = models.FloatField()
    rain_chance = models.IntegerField()
    yes_course = models.FloatField()
    no_course = models.FloatField()

class AppUserManager(BaseUserManager):
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(email, password)
		user.is_superuser = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	balance = models.FloatField(default=1000) 
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']
	objects = AppUserManager()
	def __str__(self):
		return self.username
	
class Bet(models.Model):
	bet_id = models.AutoField(primary_key=True)
	user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)
	date = models.DateField(auto_now_add=True)
	bet_type = models.BooleanField()
	city_name = models.ForeignKey(CityWeather, on_delete=models.PROTECT)
	amount = models.FloatField()
	reward = models.FloatField()