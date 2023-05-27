from rest_framework.views import APIView
from rest_framework import viewsets, permissions
from rest_framework.response import Response

from backend.issues import *
from collections import OrderedDict

from ..models import *
from ..serializers import *

class EquipmentViewSet(viewsets.ModelViewSet):
  queryset = EquipmentModel.objects.all()
  serializer_class = EquipmentSerializer
  permission_classes = [permissions.IsAuthenticated]

class GivenEquipmentViewSet(viewsets.ModelViewSet):
  queryset = GivenEquipmentModel.objects.all()
  serializer_class = GivenEquipmentSerializer
  permission_classes = [permissions.IsAuthenticated]


class WeaponControlViewSet(viewsets.ModelViewSet):
  queryset = WeaponControlModel.objects.all()
  serializer_class = WeaponControlSerializer
  permission_classes = [permissions.IsAuthenticated]

class WeaponControlFencersIssues(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, competition, fencer):

        competition = self.kwargs['competition']
        fencer = self.kwargs['fencer']

        queryset = WeaponControlModel.objects.filter(
                competitions = competition,
                fencers = fencer,
            )
        if queryset.exists():
            wc_serializer = WeaponControlNationSerializer(
                queryset,
                many=True,
            )
            response = OrderedDict()
            response['exists'] = True
            for field_name in issues_list.keys():
                hr_name = issues_list[field_name]
                response[hr_name] = wc_serializer.data[0][field_name]

            response['notes'] = wc_serializer.data[0]['notes']

        else:
            response = OrderedDict()
            response['exists'] = False
            for field_name in issues_list.keys():
                hr_name = issues_list[field_name]
                response[hr_name] = 0

            response['notes'] = ""

        # add fencer name to return object
        # get data from fencer
        queryset_fencer = FencerModel.objects.get(
                    id = fencer,
                )
        serializers_fencer = FencerSerializer(queryset_fencer)
        # add to obj
        response['fencer'] = serializers_fencer.data

        return Response(response)


    def post(self, request, competition, fencer):
        data = request.data.copy()
        data['competitions'] = competition
        data['fencers'] = fencer
        serializer = WeaponControlSerializer(
                        data=data,
                )

        if serializer.is_valid():
            serializer.save()
            return Response(True)

        return Response(serializer.errors)

    def patch(self, request, competition, fencer):
        data = request.data
        queryset = WeaponControlModel.objects.get(
                        competitions = competition,
                        fencers = fencer,
                )
        serializer = WeaponControlSerializer(
                        queryset,
                        data=data,
                        partial=True,
                )
        if serializer.is_valid():
            serializer.save()
            return Response(True)

        return Response(serializer.errors)

    def delete(self, request, competition, fencer):
        queryset = WeaponControlModel.objects.get(
                        competitions = competition,
                        fencers = fencer,
                )
        queryset.delete()

        return Response(True)
