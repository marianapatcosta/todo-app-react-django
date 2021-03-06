# Generated by Django 3.1.4 on 2021-02-14 20:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import todo.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='', max_length=120)),
                ('description', models.TextField(default='', max_length=1500)),
                ('priority', models.CharField(choices=[('low', 'LOW'), ('medium', 'MEDIUM'), ('high', 'HIGH')], default=todo.models.PriorityTypes['LOW'], max_length=120)),
                ('status', models.CharField(choices=[('backlog', 'BACKLOG'), ('ready to do', 'READY_TO_DO'), ('on going', 'ON_GOING'), ('review', 'REVIEW'), ('closed', 'CLOSED')], default=todo.models.StatusTypes['BACKLOG'], max_length=120)),
                ('is_completed', models.BooleanField(default=False)),
                ('owner', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
