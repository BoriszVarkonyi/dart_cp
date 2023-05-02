from rest_framework_simplejwt.views import TokenObtainPairView
from ..serializers import *

class CustomTokenObtainPairView(TokenObtainPairView):
    sefializer_class = CustomTokenObtainPairSerializer
