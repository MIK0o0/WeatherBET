import json
from api.models import Bet
import requests
from datetime import date
from django.db.models import F
from django.contrib.auth import get_user_model

def add_rewards():
    User = get_user_model()
    queryset = get_user_rewards_today()

    for item in queryset:
        user_id = item['user_id']
        reward = item['reward']
        
        try:
            user = User.objects.get(user_id=user_id)
            user.balance += reward
            user.save()
        except User.DoesNotExist:
            pass



def get_user_rewards_today():
    today = date.today()
    user_rewards = Bet.objects.filter(date=today, city_name__was_rain=F('bet_type'), city_name__id=F('city_name')).values('user_id', 'reward')
    return user_rewards

