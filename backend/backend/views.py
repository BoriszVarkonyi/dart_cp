from rest_framework import viewsets
from .models import Fencer
from .serializers import FencerSerializer

class FencerViewSet(viewsets.ModelViewSet):
  queryset = Fencer.objects.all()
  serializer_class = FencerSerializer