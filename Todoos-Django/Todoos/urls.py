"""
URL configuration for Todoos project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api import views
from api import auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    # Authentication endpoints
    path('api/auth/register', auth_views.RegisterView.as_view(), name='register'),
    path('api/auth/login', auth_views.LoginView.as_view(), name='login'),
    path('api/auth/logout', auth_views.LogoutView.as_view(), name='logout'),
    path('api/auth/user', auth_views.CurrentUserView.as_view(), name='current-user'),
    # Todo endpoints
    path('api/todos', views.TodoCompleteList.as_view()),
    path('api/todos/create', views.TodoListCreate.as_view()),
    path('api/todos/search/', views.TodoSearchView.as_view(), name='search'),
    path('api/todos/bulkdel', views.BulkDeleteView.as_view()),
    path('api/todos/bulkcom', views.BulkCompleteView.as_view()),
    path('api/todos/<int:pk>', views.TodoRetrieveDestroy.as_view()),
    path('api/todos/<int:pk>/complete', views.TodoComplete.as_view()),
    path('api/todos/completed', views.TodosFinished.as_view()),
    path('api-auth', include('rest_framework.urls')),
]
