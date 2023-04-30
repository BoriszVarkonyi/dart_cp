from rest_framework.views import APIView
from rest_framework import viewsets, permissions
from rest_framework.response import Response

from ..models import *
from ..serializers import *

# from rest_framework_xml.parsers import XMLParser
# from rest_framework.parsers import MultiPartParser
# import xml.etree.ElementTree as ET
# from django.core.files.storage import default_storage
# from django.core.files.base import ContentFile
# from django.forms.models import model_to_dict
# import random

class FencerModelMixin(object):
  def get_serializer(self, *args, **kwargs):
    if isinstance(kwargs.get('data', {}), list):
      kwargs['many'] = True
    return super(FencerModelMixin, self).get_serializer(*args, **kwargs)

class FencerViewSet(FencerModelMixin, viewsets.ModelViewSet):
    queryset = FencerModel.objects.all()
    serializer_class = FencerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
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
        fencerobj = FencerModel.objects.get(id=request.data['fencerID'])
        count_comps = fencerobj.competitions.count()
        print('fobjcomp')
        print (fencerobj.competitions.all())
        if count_comps == 1:
            fencerobj.delete()
        else:
            fencerobj.competitions.remove(request.data['compID'])
            fencerobj.save()
        return Response(status=200)

# Frontend says deprecated

#class XmlUploadView(APIView):

#    parser_classes = (XMLParser,MultiPartParser,)
#    def post(self, request):
#      print(request.FILES)


#      #File upload and save to disk
#      f = request.FILES['xmlfile']
#      print(f)

#      filename = "file" + str(random.randint(0,100)) + ".xml"
#      path = default_storage.save(filename, ContentFile(f.read()))

#      #Parse XML file
#      myarr = []
#      parserxd = ET.XMLParser(encoding='iso-8859-5')

#      mytree = ET.parse(filename, parser=parserxd)
#      myroot = mytree.getroot()
#      tireurs = myroot.find("Tireurs")

#      for child in tireurs.findall("Tireur"):
#        ID = child.get("ID")
#        NOM = child.get("Nom")
#        PRENOM = child.get("Prenom")
#        SEXE = child.get("Sexe")
#        LATERALITE = child.get("Lateralite")
#        if child.get("Nation"):
#          NATION = child.get("Nation")
#        else:
#          NATION = ""
#        if  child.get("Club"):
#          CLUB = child.get("Club")
#        else:
#          CLUB = ""
#        LICENCE = child.get("Licence")
#        STATUT = child.get("Statut")
#        DATENAISSANCE = child.get("DateNaissance")
#        CLASSEMENT = child.get("Classement")
#        POINTS = child.get("Points")

#        obj = FencerModel(
#                id=ID,
#                nom=NOM,
#                pre_nom=PRENOM,
#                sexe=SEXE,
#                lateralite=LATERALITE,
#                nation=NATION,
#                club=CLUB,
#                licence=LICENCE,
#                statut=STATUT,
#                date_naissance=DATENAISSANCE,
#                classement=CLASSEMENT,
#                points=POINTS
#            )
#        dict_obj = model_to_dict(obj)
#        myarr.append(dict_obj)

#      default_storage.delete(filename)
#      return Response(data=myarr)


# get competitions of specific fencer
class FencersCompetitionsView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, fencer):
        fencer = self.kwargs['fencer']
        queryset = FencerModel.objects.get(id=fencer)
        serializer_class = FencersCompetitionSerializer(
            queryset,
            context={'request': request}
        )
        return Response(serializer_class.data)

class AllCompetitorsData(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, competition):

        competition = self.kwargs['competition']

        queryset = FencerModel.objects.filter(competitions=competition)
        serializer = CompetitorsDataSerializer(queryset, many=True, context={'competition': competition})

        return Response(data=serializer.data)

