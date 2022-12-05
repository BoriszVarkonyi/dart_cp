from django.contrib import admin
from .models import Fencer

@admin.register(Fencer)
class FencerAdmin(admin.ModelAdmin):
  pass