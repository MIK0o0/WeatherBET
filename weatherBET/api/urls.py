from django.urls import path
from .views import get_course_by_city
from . import views

urlpatterns = [
    path('city/<str:city_name>/', get_course_by_city, name='get_course_by_city'),
    path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
]

