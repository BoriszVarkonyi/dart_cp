from rest_framework.viewsets import ViewSet
from rest_framework.views import APIView
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from ..models import *
from ..serializers import *

from Crypto.Cipher import AES
from dartagnan.settings import SECRET_KEY
import json

# TODO GetHash:
# [x] Get competition id and fencer id
# [x] Check ids if they exist
# [x] Make data into hashable format
# [x] Hash data into ciphertext and tag
# [x] Make json object wiht ciphertext and tag
# [x] Return the made object
class GetHash(APIView):
    permission_classes = [permissions.IsAuthenticated]
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
    permission_classes = [permissions.IsAuthenticated]
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

