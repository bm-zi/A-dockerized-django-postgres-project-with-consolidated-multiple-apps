# Generated by Django 3.1.6 on 2021-03-23 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('codeslib', '0002_codelibrary_is_favorite'),
    ]

    operations = [
        migrations.AlterField(
            model_name='codelibrary',
            name='is_favorite',
            field=models.BooleanField(default=False),
        ),
    ]
