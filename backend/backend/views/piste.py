from rest_framework import viewsets, permissions

from ..models import *
from ..serializers import *

class PisteViewSet(viewsets.ModelViewSet):
    queryset = PisteModel.objects.all()
    serializer_class = PisteSerializer
    permission_classes = [permissions.IsAuthenticated]

