# Generated by Django 4.1.3 on 2023-04-26 08:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0018_pistemodel'),
    ]

    operations = [
        migrations.CreateModel(
            name='EquipmentModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mask', models.IntegerField()),
                ('underplastron', models.IntegerField()),
                ('chest_protector', models.IntegerField()),
                ('jacket', models.IntegerField()),
                ('electric_jacket', models.IntegerField()),
                ('glove', models.IntegerField()),
                ('breeches', models.IntegerField()),
                ('socks', models.IntegerField()),
                ('weapon', models.IntegerField()),
                ('bodywire', models.IntegerField()),
                ('maskwire', models.IntegerField()),
                ('competitions', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.competitionmodel')),
            ],
        ),
    ]
