# Generated by Django 3.1.6 on 2021-06-02 20:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jf', '0009_auto_20210602_1635'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobsearchfilter',
            name='from_this_company',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
