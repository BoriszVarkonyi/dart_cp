from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0009_alter_weaponcontrolmodel_issue_1_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='RegistrationModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('registered', models.BooleanField(default=False)),
                ('competitions', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.competitionmodel')),
                ('fencers', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.fencermodel')),
            ],
        ),
    ]
