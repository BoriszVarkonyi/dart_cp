# Generated by Django 4.1.3 on 2023-04-01 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0014_alter_competitionmodel_host_country_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='notes',
            field=models.CharField(default='null', max_length=1024, null=True),
        ),
    ]
