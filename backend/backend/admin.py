from django.contrib import admin
from .models import *

@admin.register(FencerModel)
class FencerAdmin(admin.ModelAdmin):
  pass

@admin.register(TournamentModel)
class TournamentAdmin(admin.ModelAdmin):
  pass

@admin.register(CompetitionModel)
class CompetitionAdmin(admin.ModelAdmin):
  pass

@admin.register(WeaponControlModel)
class WeaponControlAdmin(admin.ModelAdmin):
  pass