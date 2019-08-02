# Generated by Django 2.2.3 on 2019-07-31 06:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webs', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Website',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('website_name', models.CharField(max_length=100)),
                ('price', models.CharField(max_length=20)),
                ('product_link', models.URLField(max_length=10000)),
                ('status', models.CharField(max_length=1000)),
            ],
        ),
        migrations.DeleteModel(
            name='Mapping',
        ),
    ]
