from rest_framework import viewsets, permissions
from .models import * 
from .serializers import *

class FencerViewSet(viewsets.ModelViewSet):
  queryset = FencerModel.objects.all()
  serializer_class = FencerSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CompetitionViewSet(viewsets.ModelViewSet):
  queryset = CompetitionModel.objects.all()
  serializer_class = CompetitionSerializer

class TournamentViewSet(viewsets.ModelViewSet):
  queryset = TournamentModel.objects.all()
  serializer_class = TournamentSerializer

class WeaponControlViewSet(viewsets.ModelViewSet):
  queryset = WeaponControlModel.objects.all()
  serializer_class = WeaponControlSerializer