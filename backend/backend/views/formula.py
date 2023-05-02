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


class IndividualFormulaViewSet(IndividualFormulaModel, viewsets.ModelViewSet):
    queryset = IndividualFormulaModel.objects.all()
    serializer_class = IndividualFormulaSerializer
    permission_classes = [permissions.IsAuthenticated]