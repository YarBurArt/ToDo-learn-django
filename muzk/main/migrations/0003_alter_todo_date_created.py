# Generated by Django 4.1.5 on 2023-01-31 17:03

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_todo_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2023, 1, 31, 17, 3, 28, 73707, tzinfo=datetime.timezone.utc), verbose_name='Date created'),
        ),
    ]
