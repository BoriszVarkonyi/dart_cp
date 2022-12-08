from django.db import models

SEX_CHOICE = [
    ("M", "Male"),
    ("F", "Female"),
    ("X", "Mix"),
]
WEAPON_CHOICE = [
    ("E", "Epee"),
    ("F", "Foil"),
    ("S", "Sabre"),
]
LATERALITE_CHOICE = [
    ("D", "Droit"),
    ("G", "Gauche"),
]
SHORT_NATION_CHOICE = [
    ("HUN", "Hungary"),
    ("ENG", "England"),
]
COMPETITION_TYPE_CHOICE = [
    ("I", "Individual"),
    ("T", "Team"),
]

class TournamentModel(models.Model):
    title_long = models.CharField(max_length=12)
    starting_date = models.DateField()
    ending_date = models.DateField()

class CompetitionModel(models.Model):
    assoc_tournament_id = models.ForeignKey(TournamentModel, on_delete=models.CASCADE)
    title_long = models.CharField(max_length=72)
    weapon_type = models.CharField(max_length=1, choices=WEAPON_CHOICE)
    is_wheelchair = models.BooleanField(default=False)
    sex = models.CharField(max_length=1, choices=SEX_CHOICE)
    type = models.CharField(max_length=1, choices=COMPETITION_TYPE_CHOICE)
    age_group = models.CharField(max_length=64)
    host_country = models.CharField(max_length=3, choices=SHORT_NATION_CHOICE)
    address = models.CharField(max_length=128)
    entry_fee = models.IntegerField()
    currency = models.CharField(max_length=32) #coice for money
    start_date = models.DateField()
    end_date = models.DateField()

class FencerModel(models.Model):
    id = models.CharField(max_length=12,primary_key=True)
    competition = models.ForeignKey(CompetitionModel, on_delete=models.CASCADE)
    nom = models.CharField(max_length=72)
    pre_nom = models.CharField(max_length=72)
    sexe = models.CharField(max_length=1, choices=SEX_CHOICE)
    lateralite = models.CharField(max_length=1, choices=LATERALITE_CHOICE)
    nation = models.CharField(max_length=3, choices=SHORT_NATION_CHOICE)
    club = models.CharField(max_length=256)
    licence = models.CharField(max_length=12)
    statut = models.CharField(max_length=1)
    date_naissance = models.DateField()
    classement = models.IntegerField()
    points = models.IntegerField()
    barcode = models.IntegerField()
    registration_status = models.BooleanField(default=False)

#class FencerCompetitionJoinModel(models.Model):
#   competitionID = models.ForeignKey(CompetitionModel, on_delete=models.CASCADE)
#   fencerID = models.ForeignKey(FencerModel, on_delete=models.CASCADE)


class WeaponControlModel(models.Model):
    assoc_fencer_id = models.ForeignKey(FencerModel, on_delete=models.CASCADE)
    assoc_competition_id = models.ForeignKey(CompetitionModel, on_delete=models.CASCADE)
    #issues...
    #Robitol: sok kis cella vagy 1 charfield, vagy valami mas
    notes = models.TextField()
