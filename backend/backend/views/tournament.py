from rest_framework.views import APIView
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action

from ..models import *
from ..serializers import *

from collections import OrderedDict

class TournamentViewSet(viewsets.ModelViewSet):
  queryset = TournamentModel.objects.all()
  serializer_class = TournamentSerializer
  permission_classes = [permissions.IsAuthenticated]

  @action(detail=True, url_path='hascomp/(?P<comp_pk>[0-9]+)')
  def has_comp(self, request, comp_pk, pk=None):
    get_object_or_404(CompetitionModel,
                      pk=comp_pk,
                      tournaments_id=self.get_object())
    return Response({'detail': 'Found.'}, status=200)


class TournamentCompetitionsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, tournament):
        tournament = self.kwargs['tournament']
        queryset = CompetitionModel.objects.filter(tournaments=tournament)
        serializer_class = CompetitionSerializer(queryset, context={'request': request}, many=True)
        return Response(serializer_class.data)


# get all fencers with a specific nationality grouped by tournaments
class TournamentsFencersByNationality(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, nationality):
        nationality = self.kwargs['nationality']
        tournaments = TournamentModel.objects.all()
        tournament_serializer = TournamentSerializer(
                tournaments,
                many=True
        )
        response = OrderedDict()
        for tournament in tournament_serializer.data:
            id = tournament['id']
            fencers = FencerModel.objects.filter(
                nation=nationality,
                competitions__tournaments=id,
            ).distinct()
            fencer_serializer = FencerSerializer(
                fencers,
                many=True
            )
            response[id] = fencer_serializer.data

        return Response(response)
