import http
from django.db.models import Count, RestrictedError

from dartagnan.settings import SECRET_KEY
from .models import *
from .serializers import *
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.core import serializers
from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status
from rest_framework.viewsets import ViewSet
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_xml.parsers import XMLParser
from rest_framework.parsers import MultiPartParser
import xml.etree.ElementTree as ET
from collections import OrderedDict
from backend.issues import *
import random
from itertools import groupby
import json
from Crypto.Cipher import AES
from rest_framework_simplejwt.views import TokenObtainPairView

class FencerModelMixin(object):
  def get_serializer(self, *args, **kwargs):
    if isinstance(kwargs.get('data', {}), list):
      kwargs['many'] = True
    return super(FencerModelMixin, self).get_serializer(*args, **kwargs)

class FencerViewSet(FencerModelMixin, viewsets.ModelViewSet):
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
                      tournaments_id=self.get_object())
    return Response({'detail': 'Found.'}, status=200)

class WeaponControlViewSet(viewsets.ModelViewSet):
  queryset = WeaponControlModel.objects.all()
  serializer_class = WeaponControlSerializer
  permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class RegistrationViewSet(viewsets.ModelViewSet):
    queryset = RegistrationModel.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

#XML beolvasás view
class XmlUploadView(APIView):

    parser_classes = (XMLParser,MultiPartParser,)
    def post(self, request):
      print(request.FILES)
      

      #File upload and save to disk
      f = request.FILES['xmlfile']
      print(f)

      filename = "file" + str(random.randint(0,100)) + ".xml"
      path = default_storage.save(filename, ContentFile(f.read()))

      #Parse XML file
      myarr = []
      parserxd = ET.XMLParser(encoding='iso-8859-5')

      mytree = ET.parse(filename, parser=parserxd)
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

        obj = FencerModel(
                id=ID,
                nom=NOM,
                pre_nom=PRENOM, 
                sexe=SEXE,
                lateralite=LATERALITE,
                nation=NATION,
                club=CLUB,
                licence=LICENCE,
                statut=STATUT,
                date_naissance=DATENAISSANCE,
                classement=CLASSEMENT,
                points=POINTS
            )
        dict_obj = model_to_dict(obj)
        myarr.append(dict_obj)

      default_storage.delete(filename)
      return Response(data=myarr)

# get competitions of specific fencer
class FencersCompetitionsView(APIView):
    def get(self, request, fencer):
        fencer = self.kwargs['fencer']
        queryset = FencerModel.objects.get(id=fencer) 
        serializer_class = FencersCompetitionSerializer(
            queryset, 
            context={'request': request}
        )
        return Response(serializer_class.data)

class TournamentCompetitionsView(APIView):
    def get(self, request, tournament):
        tournament = self.kwargs['tournament']
        queryset = CompetitionModel.objects.filter(tournaments=tournament)
        serializer_class = CompetitionSerializer(queryset, context={'request': request}, many=True)
        return Response(serializer_class.data)

class CompetitionsFencerView(APIView):
    def get(self, request, competition):
        competition = self.kwargs['competition']
        queryset = FencerModel.objects.filter(competitions=competition)
        serializer_class = FencerSerializer(queryset, context={'request': request}, many=True)
        return Response(serializer_class.data)

# get all fencers with a specific nationality grouped by tournaments
class TournamentsFencersByNationality(APIView):
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

class WeaponControlFencersIssues(APIView):
    def get(self, request, competition, fencer):

        competition = self.kwargs['competition']
        fencer = self.kwargs['fencer']

        queryset = WeaponControlModel.objects.filter(
                competitions = competition,
                fencers = fencer,
            )
        if queryset.exists():
            wc_serializer = WeaponControlIssuesSerializer(
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

class RegisterFencerIn(APIView):
    def post(self, request, competition, fencer):
        competition = self.kwargs[ 'competition' ]
        fencer = self.kwargs[ 'fencer' ]
        return SetRegistration(competition, fencer, True)

class RegisterFencerOut(APIView):
    def post(self, request, competition, fencer):
        competition = self.kwargs[ 'competition' ]
        fencer = self.kwargs[ 'fencer' ]
        return SetRegistration(competition, fencer, False)

class GetRegistrationsForCompetition(APIView):
    def get(self, request, competition):
        queryset = RegistrationModel.objects.filter(competitions = competition)
        serializer_class = RegistrationSerializer(queryset, context={'request': request}, many=True)
        return Response(serializer_class.data)

class RegisterFencerList(APIView):
    def get(self, request, competition):
        queryset = RegistrationModel.objects.filter(competitions = competition)
        serializer = RegistrationSerializer(
                queryset,
                many = True,
        )
        return Response(serializer.data)

class CompetitionIssuesByNations(APIView):
    def get(self, request, competition):

        competition = self.kwargs['competition']

        queryset = WeaponControlModel.objects.filter(competitions = competition).annotate(co = Count(id)).order_by('fencers__nation')
        serializer = WeaponControlNationSerializer(queryset, many=True)

        an_iterator = groupby(serializer.data, lambda x : x['fencers']['nation'])

        orderedFencers = {} 

        for key, group in an_iterator:
            key_and_group = {key : list(group)}
            print(key_and_group)
            orderedFencers.update(key_and_group) 

        #print(serializer)

        return Response(data=orderedFencers)


# TODO GetHash:
# [x] Get competition id and fencer id
# [x] Check ids if they exist
# [x] Make data into hashable format
# [x] Hash data into ciphertext and tag
# [x] Make json object wiht ciphertext and tag
# [x] Return the made object

class GetHash(APIView):
    def get(self, request, competition, fencer):

        # Get compid & fencerid
        comp_id = competition
        fencer_id = fencer

        # Check existance of fencer-competition pair
        get_object_or_404(FencerModel, id=fencer_id, competitions=comp_id)

        # Convert to json_string then to bytes
        tohash_obj = { 'competition': comp_id, 'fencer': fencer_id }
        tohash_string = json.dumps(tohash_obj)
        tohash_bytes = str.encode(tohash_string)

        # HASH
        cipher = AES.new(str.encode(SECRET_KEY), AES.MODE_EAX)
        ciphertext, tag = cipher.encrypt_and_digest(tohash_bytes)

        # Make the object

        # Converts bytets (like ciphertext) to lists of integers (suitable for json)
        def convert_from_byties(byties):
            return_list = []
            for byte in byties:
                return_list.append(byte)
            return return_list


        return_json_string = {
                              'ciphertext': convert_from_byties(ciphertext),
                              'tag': convert_from_byties(tag)
                             }

        # Return ciphertext
        return Response(return_json_string)


# TODO VerifyHash:
# [ ] Get tag from post
# [ ] Convert tag back to bytes
# [ ] verify tag with Secret key cipher
# [ ] Decode ciphertext into fencer - compt object
# [ ] Check if the fencer - comp relationship exists
# [ ] Return the fencer - comp object

class VerifyHash(APIView):
    def post(self, request):

        # get data from post
        post_data = request.data

        # Get tag from post
        tag_list = post_data['tag']
        # Converts from list of integers to bytets
        # "Reverse" of convert_from_byties
        def convert_to_byties(list):
            return bytes(bytearray(list))
        tag = convert_to_byties(tag_list)

        # Verify tag
        cipher = AES.new(str.encode(SECRET_KEY), AES.MODE_EAX)
        # try:
        #     cipher.verify(tag)
        # except ValueError:
        #     return Response(0)

        # get ciphertext and decrypt
        ciphertext_list = post_data['ciphertext']
        ciphertext = convert_to_byties(ciphertext_list)
        data_string = cipher.decrypt(ciphertext)

         # make json from string data
        # data_json = json.loads(data_string)

        # Check for relationship
        # fencer = data_json['fencer']
        # competition = data_json['competition']
        # get_object_or_404(FencerModel, id=fencer , competitions=competition)

        # return json_string
        return Response(data_string)


class CustomTokenObtainPairView(TokenObtainPairView):
    sefializer_class = CustomTokenObtainPairSerializer
