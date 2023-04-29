from rest_framework.viewsets import ViewSet
from rest_framework.views import APIView
from rest_framework import viewsets, permissions
from rest_framework.response import Response

from ..models import *
from ..serializers import *

def SetRegistration(competitions, fencers, registration_value):
    instance = RegistrationModel.objects.filter(
        competitions = competitions,
        fencers = fencers,
    )
    data={
        'fencers':fencers,
        'competitions':competitions,
        'registered':registration_value,
    }

    if instance.exists():
        serializer = RegistrationSerializer(
            instance.first(),
            data = data
        )
    else:
        serializer = RegistrationSerializer(
            data=data
        )

    if serializer.is_valid():
        serializer.save()
        return Response(True)

    return Response(serializer.errors)

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = RegistrationModel.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticated]

class RegisterFencerIn(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, competition, fencer):
        competition = self.kwargs[ 'competition' ]
        fencer = self.kwargs[ 'fencer' ]
        return SetRegistration(competition, fencer, True)

class RegisterFencerOut(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, competition, fencer):
        competition = self.kwargs[ 'competition' ]
        fencer = self.kwargs[ 'fencer' ]
        return SetRegistration(competition, fencer, False)

class GetRegistrationsForCompetition(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, competition):
        queryset = RegistrationModel.objects.filter(competitions = competition)
        serializer_class = RegistrationSerializer(queryset, context={'request': request}, many=True)
        return Response(serializer_class.data)

class RegisterFencerList(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, competition):
        queryset = RegistrationModel.objects.filter(competitions = competition)
        serializer = RegistrationSerializer(
                queryset,
                many = True,
        )
        return Response(serializer.data)

