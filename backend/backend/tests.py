from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase

# using https://pypi.org/project/django-test-without-migrations/ might speed
# up the running of tests, but don't forget to create a new requirements.txt


 

class TestAuthenticationCredentials(APITestCase):
    def testAuthenticationRequired(self):
        urls = [ '/api/fencers/', '/api/competitions/', '/api/tournaments/',
            '/api/weaponcontrols/', '/api/registrations/', '/api/pistes/',
            '/api/equipments/', '/api/individualformulas/' ]
        for url in urls:
            print(url)
            response = self.client.get(url)
            self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)