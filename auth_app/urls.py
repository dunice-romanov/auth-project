from django.conf.urls import url, include

from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_jwt.views import obtain_jwt_token

from auth_app import views

urlpatterns = {
	url(r'^users/$', views.UserList.as_view()),
	url(r'^signup/$', views.UserCreate.as_view()),
    url(r'^api-token-auth/', obtain_jwt_token),
}

urlpatterns = format_suffix_patterns(urlpatterns)