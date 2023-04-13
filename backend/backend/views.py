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

    def create(self, request, *args, **kwargs):

        #print(request.data)

        if len(request.data) == 13:
            print("SINGLE")
            if FencerModel.objects.filter(id=request.data['id']).exists():
                fencerobject = FencerModel.objects.get(id=request.data['id'])
                fencerobject.competitions.add(request.data['competitions'][0])
                fencerobject.save()
                return Response(status=200)
            else:
                serializer = FencerSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=201)
                return Response(serializer.errors, status=400)

        else:
            print("MULTIPLE")
            for x in request.data:
                #print(x['id'])
                if FencerModel.objects.filter(id=x['id']).exists():
                    fencerobject = FencerModel.objects.get(id=x['id'])
                    fencerobject.competitions.add(x['competitions'][0])
                    fencerobject.save()
                else:
                    serializer = FencerSerializer(data=x)
                    if serializer.is_valid():
                        serializer.save()
            return Response(status=201)
    
    def destroy(self, request, *args, **kwargs):
        print(request.data)
        #fencerobj = FencerModel.objects.get(id=request.data['id'])
        #fencerobj.competitions.remove(request.data)
        return Response(status=200)


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

# TODO GetHash:
# [x] Get competition id and fencer id
# [x] Check ids if they exist
# [x] Make data into hashable format
# [x] Hash data into ciphertext and tag
# [x] Make json object wiht ciphertext and tag
# [x] Return the made object
class GetHash(APIView):
    def get(self, request, competition, fencer):

        # Get compid & fencerid from request
        comp_id = competition
        fencer_id = fencer

        # Check existance of fencer-competition pair
        get_object_or_404(FencerModel, id=fencer_id, competitions=comp_id)

        # Convert to json_string then to bytes
        tohash_obj = { 'competition': comp_id, 'fencer': fencer_id }
        tohash_string = json.dumps(tohash_obj)
        tohash_bytes = str.encode(tohash_string)

        # Make cipher obj then HASH
        cipher = AES.new(str.encode(SECRET_KEY), AES.MODE_EAX)
        ciphertext, tag = cipher.encrypt_and_digest(tohash_bytes)

        # Make the object
        def convert_from_byties(byties):
            # Converts bytes (like ciphertext) to lists of integers (suitable for json)
            return_list = []
            for byte in byties:
                return_list.append(byte)
            return return_list

        return_json_string = {
                              'ciphertext': convert_from_byties(ciphertext),
                              'tag': convert_from_byties(tag),
                              'nonce': convert_from_byties(cipher.nonce),
                             }

        # Return ciphertext
        return Response(return_json_string)


# TODO VerifyHash:
# [x] Get tag from post
# [x] Get nonce
# [x] Generate cipher obj
# [x] Convert tag, nonce, ciphertext back to bytes
# [x] verify tag
# [x] Decode ciphertext into fencer - compt object
# [x] Check if the fencer - comp relationship exists
# [x] Return the fencer - comp object
class VerifyHash(APIView):
    def post(self, request):

        # errors
        http_bad_input = status.HTTP_415_UNSUPPORTED_MEDIA_TYPE
        msg_bad_input = {
                "The structure of the POST data was invalid":
                "If everything was done correctly contact support"
            }

        # get data from post
        post_data = request.data
        try:
            tag_list = post_data['tag']
            nonce_list = post_data['nonce']
            ciphertext_list = post_data['ciphertext']
        except KeyError:
            return Response(msg_bad_input, http_bad_input)

        def convert_to_byties(list):
            # Converts from list of integers to bytets
            # "Reverse" of convert_from_byties
            return bytes(bytearray(list))

        # Convert data to bytes with func
        try:
            nonce = convert_to_byties(nonce_list)
            tag = convert_to_byties(tag_list)
            ciphertext = convert_to_byties(ciphertext_list)
        except:
            return Response(msg_bad_input, http_bad_input)

        # Make cipher obj with nonce
        cipher = AES.new(str.encode(SECRET_KEY), AES.MODE_EAX, nonce)

        # decrypt and verify
        try:
            decrypted_bytes = cipher.decrypt_and_verify(ciphertext, tag)
        except ValueError:
            return Response(
                    {
                        "Failed to decrypt data":
                        "Invalid format, or the data has been tampered with"
                    },
                    status=status.HTTP_423_LOCKED
                )

         # make json from string data
        data_string = decrypted_bytes.decode('utf-8')
        data_json = json.loads(data_string)

        # Check existance of fencer-competition pair
        fencer = data_json['fencer']
        competition = data_json['competition']
        get_object_or_404(FencerModel, id=fencer , competitions=competition)

        # return json_string
        return Response(decrypted_bytes.decode('utf-8'))


class CustomTokenObtainPairView(TokenObtainPairView):
    sefializer_class = CustomTokenObtainPairSerializer


class AllCompetitorsData(APIView):

    def get(self, request, competition):

        competition = self.kwargs['competition']

        queryset = FencerModel.objects.filter(competitions=competition)
        serializer = CompetitorsDataSerializer(queryset, many=True, context={'competition': competition})

        return Response(data=serializer.data)
    
class Statistics(APIView):

    def get(self, request, competition):

        #Get all fencers
        fencers = FencerModel.objects.filter(competitions=competition)
        fencernum = fencers.count()

        all_issues = WeaponControlModel.objects.filter(competitions=competition)
        serializer = WeaponControlSerializer(all_issues, many=True)


        #Get total issues
        counter = 0

        for x in serializer.data:
            ycount = 0
            for key,value in x.items():
                if key == "notes":
                    continue 
                if ycount > 1:
                    if value == None:
                        continue
                    counter += value
                ycount += 1

        #Get total countries

        countries = []

        fser = FencerSerializer(fencers, many=True)

        for x in fser.data:
            print(x['nation'])
            if x['nation'] in countries:
                print("MARBENNE")
            else:
                countries.append(x['nation'])

        count = len(countries)

        #Get total ratio
        if fencernum == 0:
            total_ratio = "Not enough data"
        else:
            total_ratio =  round(counter / fencernum, 2)

        #Get most/least common issues

        Issues_Dict = {}

        for x in serializer.data:
            ycount = 0
            for key, value in x.items():
                if ycount > 1:
                    realname = WeaponControlModel._meta.get_field(key).verbose_name
                    if key == "notes":
                        continue
                    if realname in Issues_Dict:
                        Issues_Dict[realname] += value
                    else:
                        Issues_Dict[realname] = value
                ycount += 1

        sorted_issues = dict(sorted(Issues_Dict.items(), key=lambda x:x[1], reverse=True))

        if sorted_issues == {}:
            most_issue_name = "Not enough data"
            most_issue_value = "Not enough data"

            least_issue_name = "Not enough data"
            least_issue_value = "Not enough data"
        else:
            most_issue_name = list(sorted_issues.keys())[0]
            most_issue_value = list(sorted_issues.values())[0]

            least_issue_name = list(sorted_issues.keys())[-1]
            least_issue_value = list(sorted_issues.values())[-1]

        #Get most/least issues & ratio

        n_r_dict = {}

        for z in countries:
            n_r_dict[z] = {}

        for x in fser.data:
            for y in serializer.data:
                f_id = x['id']
                if y['fencers'] == f_id:
                    ccount = 0
                    issue_count = 0
                    for key,value in y.items():
                        if ccount > 1:
                            if key == "notes":
                                continue
                            issue_count += value
                        ccount += 1
                    if n_r_dict[x['nation']] == {}:
                        n_r_dict[x['nation']] = {'fencer_num':1, 'issue_num':issue_count}
                    else:
                        n_r_dict[x['nation']]['fencer_num'] += 1
                        n_r_dict[x['nation']]['issue_num'] += issue_count

        for key,value in n_r_dict.items():
            if value != {}:
                value['ratio'] = value['issue_num'] / value['fencer_num']




        if len(serializer.data) == 0:
            return(Response("Not a valid competition or no weapon control record added"))
        else:
            return(Response({'total_issues':counter, 'total_fencers':fencernum, 'total_nation':count, 'total_ratio':total_ratio, 'most_issue':{most_issue_name:most_issue_value}, 'least_issue':{least_issue_name:least_issue_value}, 'n_r':n_r_dict}))


class StatisticsGetByNations(APIView):
    def get(self, request, competition):

        # get comp id from url
        comp_id = competition

        # data from db
        queryset = WeaponControlModel.objects.filter( competitions=comp_id, )
        serializer = WeaponControlNationSerializer(queryset, many=True)

        # generate return list
        return_list = dict()

        # generate issues list
        issues_list = [
                'issue_1',
                'issue_2',
                'issue_3',
                'issue_4',
                'issue_5',
                'issue_6',
                'issue_7',
                'issue_8',
                'issue_9',
                'issue_10',
                'issue_11',
                'issue_12',
                'issue_13',
                'issue_14',
                'issue_15',
                'issue_16',
                'issue_17',
                'issue_18',
                'issue_19',
                'issue_20',
                'issue_21',
                'issue_22',
                'issue_23',
                'issue_24',
                'issue_25',
                'issue_26',
                'issue_27',
                'issue_28',
            ]

        # loop through all issues of the competition and add the issues to the return list
        for weapon_control_data in serializer.data:
            nation = weapon_control_data['fencers']['nation']
            # get sums of issues
            sums_of_issues = 0
            for issue_id in issues_list:
                sums_of_issues += weapon_control_data[issue_id]

            if (nation not in return_list):
                return_list[nation] = 0

            return_list[nation] += sums_of_issues

        # Return the list and return_list
        return Response(return_list)


class StatisticsGetByNationsByIssue(APIView):
    def get(self, request, competition):

        # get comp id from url
        comp_id = competition

        # data from db
        queryset = WeaponControlModel.objects.filter( competitions=comp_id, )
        serializer = WeaponControlNationSerializer(queryset, many=True)

        # generate return list
        list_return = dict()

        # generate issues list
        issues_list = {
           "issue_1": "FIE mark on blade",
           "issue_2": "Arm gap and weight",
           "issue_3": "Arm length",
           "issue_4": "Blade length",
           "issue_5": "Grip length",
           "issue_6": "Form and depth of the guard",
           "issue_7": "Guard oxydation/ deformation",
           "issue_8": "Excentricity of the blade",
           "issue_9": "Blade flexibility",
           "issue_10": "Curve on the blade",
           "issue_11": "Foucault current device",
           "issue_12": "Point and arm size",
           "issue_13": "Length/ condition of body/ mask wire",
           "issue_14": "Resistance of body/ mask wire",
           "issue_15": "Mask: FIE mark",
           "issue_16": "Mask: condition and insulation",
           "issue_17": "Mask: resistance (sabre/foil",
           "issue_18": "Metallic jacket condition",
           "issue_19": "Metallic jacket resistance",
           "issue_20": "Sabre/ glove overlay condition",
           "issue_21": "Sabre glove overlay resistance",
           "issue_22": "Glove condition",
           "issue_23": "Foil chest protector",
           "issue_24": "Socks",
           "issue_25": "Incorrect name printing",
           "issue_26": "Incorrect national logo",
           "issue_27": "Commercial",
           "issue_28": "Other items",
        }

        for weapon_control_data in serializer.data:
            nation = weapon_control_data['fencers']['nation']
            # make issues obj
            list_issues = dict()

            for issue_id in issues_list:
                human_readable_issue = issues_list[issue_id]
                list_issues[human_readable_issue] = weapon_control_data[issue_id]

            if (nation not in list_return):
                list_return[nation] = dict()
                for issue_id in issues_list:
                    human_readable_issue = issues_list[issue_id]
                    list_return[nation][human_readable_issue] = 0

            for issue_id in issues_list:
                human_readable_issue = issues_list[issue_id]
                list_return[nation][human_readable_issue] += list_issues[human_readable_issue]

        return Response(list_return)


class StatisticsGetByIssues(APIView):
    def get(self, request, competition):

        # get comp id from url
        comp_id = competition

        # data from db
        queryset = WeaponControlModel.objects.filter( competitions=comp_id, )
        serializer = WeaponControlNationSerializer(queryset, many=True)

        # generate return list
        list_return = dict()

        issues_list = {
           "issue_1": "FIE mark on blade",
           "issue_2": "Arm gap and weight",
           "issue_3": "Arm length",
           "issue_4": "Blade length",
           "issue_5": "Grip length",
           "issue_6": "Form and depth of the guard",
           "issue_7": "Guard oxydation/ deformation",
           "issue_8": "Excentricity of the blade",
           "issue_9": "Blade flexibility",
           "issue_10": "Curve on the blade",
           "issue_11": "Foucault current device",
           "issue_12": "Point and arm size",
           "issue_13": "Length/ condition of body/ mask wire",
           "issue_14": "Resistance of body/ mask wire",
           "issue_15": "Mask: FIE mark",
           "issue_16": "Mask: condition and insulation",
           "issue_17": "Mask: resistance (sabre/foil",
           "issue_18": "Metallic jacket condition",
           "issue_19": "Metallic jacket resistance",
           "issue_20": "Sabre/ glove overlay condition",
           "issue_21": "Sabre glove overlay resistance",
           "issue_22": "Glove condition",
           "issue_23": "Foil chest protector",
           "issue_24": "Socks",
           "issue_25": "Incorrect name printing",
           "issue_26": "Incorrect national logo",
           "issue_27": "Commercial",
           "issue_28": "Other items",
        }

        for issue_id in issues_list:
            human_readable_issue = issues_list[issue_id]
            list_return[human_readable_issue] = 0

        # loop through all issues of the competition and add the issues to the return list
        for weapon_control_data in serializer.data:
            nation = weapon_control_data['fencers']['nation']
            # get sums of issues

            for issue_id in issues_list:
                human_readable_issue = issues_list[issue_id]
                list_return[human_readable_issue] += weapon_control_data[issue_id]

        # Return the list and return_list
        return Response(list_return)

