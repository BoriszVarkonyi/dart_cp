# Generated by Django 4.1.3 on 2023-01-19 08:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0012_remove_fencermodel_barcode'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='notes',
            field=models.TextField(default='', null=True),
        ),
    ]
