# Generated by Django 2.2.4 on 2019-08-07 06:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mapping',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
