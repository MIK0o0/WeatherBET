# Generated by Django 4.2.1 on 2023-06-17 17:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_appuser_delete_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appuser',
            name='country',
        ),
    ]
