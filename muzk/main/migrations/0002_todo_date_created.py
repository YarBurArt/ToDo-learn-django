# Generated by Django 4.1.5 on 2023-01-27 13:37

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2023, 1, 27, 13, 37, 10, 36759, tzinfo=datetime.timezone.utc), verbose_name='Date created'),
        ),
    ]
