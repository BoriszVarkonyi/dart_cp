from rest_framework.views import APIView
from rest_framework import viewsets, permissions

from ..models import *
from ..serializers import *

class CompetitionViewSet(viewsets.ModelViewSet):
    queryset = CompetitionModel.objects.all()
    serializer_class = CompetitionSerializer
    permission_classes = [permissions.IsAuthenticated]

class CompetitionsFencerView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, competition):
        competition = self.kwargs['competition']
        queryset = FencerModel.objects.filter(competitions=competition)
        serializer_class = FencerSerializer(queryset, context={'request': request}, many=True)
        return Response(serializer_class.data)

