from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=256, blank=True)

    def __str__(self):
        return self.name


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(
            user=instance,
            name="{} {}".format(
                instance.first_name,
                instance.last_name
            ).strip()
        )


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if not instance.profile.name:
        if instance.first_name or instance.last_name:
            instance.profile.name = "{} {}".format(
                instance.first_name,
                instance.last_name
            ).strip()
    instance.profile.save()
