# Generated by Django 3.1.6 on 2021-03-26 23:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('codeslib', '0006_auto_20210326_1715'),
    ]

    operations = [
        migrations.AlterField(
            model_name='source',
            name='source',
            field=models.TextField(max_length=10240),
        ),
    ]
