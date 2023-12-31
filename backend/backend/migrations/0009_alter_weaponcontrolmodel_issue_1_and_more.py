# Generated by Django 4.1.3 on 2023-01-09 22:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0008_alter_competitionmodel_entry_fee_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_1',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='FIE mark on blade'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_10',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Curve on the blade'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_11',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Foucault current device'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_12',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Point and arm size'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_13',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Length/ condition of body/ mask wire'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_14',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Resistance of body/ mask wire'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_15',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Mask: FIE mark'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_16',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Mask: condition and insulation'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_17',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Mask: resistance (sabre/foil)'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_18',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Metallic jacket condition'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_19',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Metallic jacket resistance'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_2',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Arm gap and weight'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_20',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Sabre/ glove overlay condition'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_21',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Sabre glove overlay resistance'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_22',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Glove condition'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_23',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Foil chest protector'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_24',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Socks'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_25',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Incorrect name printing'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_26',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Incorrect national logo'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_27',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Commercial'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_28',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Other items'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_3',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Arm length'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_4',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Blade length'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_5',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Grip length'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_6',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Form and depth of the guard'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_7',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Guard oxydation/ deformation'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_8',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Excentricity of the blade'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='issue_9',
            field=models.SmallIntegerField(default=0, null=True, verbose_name='Blade flexibility'),
        ),
        migrations.AlterField(
            model_name='weaponcontrolmodel',
            name='notes',
            field=models.TextField(default=''),
        ),
    ]
