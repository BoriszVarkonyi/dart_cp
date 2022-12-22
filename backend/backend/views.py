from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import * 
from .serializers import *

class FencerViewSet(viewsets.ModelViewSet):
  queryset = FencerModel.objects.all()
  serializer_class = FencerSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CompetitionViewSet(viewsets.ModelViewSet):
  queryset = CompetitionModel.objects.all()
  serializer_class = CompetitionSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class TournamentViewSet(viewsets.ModelViewSet):
  queryset = TournamentModel.objects.all()
  serializer_class = TournamentSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

  @action(detail=True, url_path='hascomp/(?P<comp_pk>[0-9]+)')
  def has_comp(self, request, comp_pk, pk=None):
    get_object_or_404(CompetitionModel,
                      pk=comp_pk,
                      assoc_tournament_id=self.get_object())
    return Response({'detail': 'Found.'}, status=200)

class WeaponControlViewSet(viewsets.ModelViewSet):
  queryset = WeaponControlModel.objects.all()
  serializer_class = WeaponControlSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]
