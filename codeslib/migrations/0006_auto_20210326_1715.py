# Generated by Django 3.1.6 on 2021-03-26 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('codeslib', '0005_auto_20210325_2336'),
    ]

    operations = [
        migrations.AlterField(
            model_name='codelibrary',
            name='is_favorite',
            field=models.BooleanField(blank=True, default=True, null=True),
        ),
    ]
