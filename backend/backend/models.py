from django.db import models

class Fencer(models.Model):
    COUNTRIES = [
        ('HU', 'Hungary'),
        ('AL', 'Albania'),
    ] 
    SEXES = [
        ('M', 'MALE'),
        ('F', 'FEMALE'),
    ]
    name = models.CharField(max_length=128)
    age = models.IntegerField()
    country = models.CharField(max_length=2, choices=COUNTRIES)
    sex = models.CharField(max_length=1, choices=SEXES, default='M')