# Generated by Django 4.1.3 on 2023-05-27 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0023_givenequipmentmodel'),
    ]

    operations = [
        migrations.AddField(
            model_name='givenequipmentmodel',
            name='isready',
            field=models.BooleanField(default=False),
        ),
    ]
