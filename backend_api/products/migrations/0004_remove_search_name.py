# Generated by Django 2.2.4 on 2019-08-16 19:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_search'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='search',
            name='name',
        ),
    ]
