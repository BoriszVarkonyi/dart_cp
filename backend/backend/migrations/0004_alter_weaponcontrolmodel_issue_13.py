# Generated by Django 4.1.3 on 2023-01-02 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0003_remove_fencermodel_competition_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_13',
            field=models.SmallIntegerField(null=True, verbose_name='Length/ condition of body/ mask wire'),
        ),
    ]
