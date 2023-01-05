import http

from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import * 
from .serializers import *
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from rest_framework import viewsets, permissions, status
from rest_framework.viewsets import ViewSet
from .models import *
from .serializers import *
from django.core import serializers
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_xml.parsers import XMLParser
import xml.etree.ElementTree as ET
from rest_framework.parsers import MultiPartParser
from django.forms.models import model_to_dict

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

#XML beolvasás view
class MyUploadView(APIView):

    parser_classes = (XMLParser,MultiPartParser,)
    def get(self, request):

      return Response(data="FASZ A SZÁDBA")
    def post(self, request):

      #File upload and save to disk
      f = request.FILES['test']
      print(f)

      path = default_storage.save('yes.xml', ContentFile(f.read()))

      #Parse XML file
      myarr = []
      parserxd = ET.XMLParser(encoding="utf-8")
      mytree = ET.parse('yes.xml', parser=parserxd)
      myroot = mytree.getroot()
      tireurs = myroot.find("Tireurs")

      for child in tireurs.findall("Tireur"):
        ID = child.get("ID")
        NOM = child.get("Nom")
        PRENOM = child.get("Prenom")
        SEXE = child.get("Sexe")
        LATERALITE = child.get("Lateralite")
        if child.get("Nation"):
          NATION = child.get("Nation")
        else:
          NATION = ""
        if  child.get("Club"):
          CLUB = child.get("Club")
        else:
          CLUB = ""
        LICENCE = child.get("Licence")
        STATUT = child.get("Statut")
        DATENAISSANCE = child.get("DateNaissance")
        CLASSEMENT = child.get("Classement")
        POINTS = child.get("Points")

        obj = FencerModel(id=ID, nom=NOM, pre_nom=PRENOM, sexe=SEXE, lateralite=LATERALITE, nation=NATION, club=CLUB,
                          licence=LICENCE, statut=STATUT, date_naissance=DATENAISSANCE, classement=CLASSEMENT,
                          points=POINTS)
        dict_obj = model_to_dict(obj)
        myarr.append(dict_obj)

      default_storage.delete("yes.xml")
      return Response(data=myarr)
