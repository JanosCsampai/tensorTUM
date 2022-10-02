from django.db import models

# Create your models here.

class UserStatistics(models.Model):
    total_count = models.IntegerField(default=0)
    healthy_count = models.IntegerField(default=0)
    pneunomia_count = models.IntegerField(default=0)
    tuberculosis_count = models.IntegerField(default=0)
    covid_count = models.IntegerField(default=0)
    total_correct_count = models.IntegerField(default=0)
    healthy_correct_count = models.IntegerField(default=0)
    pneunomia_correct_count = models.IntegerField(default=0)
    tuberculosis_correct_count = models.IntegerField(default=0)
    covid_correct_count = models.IntegerField(default=0)

    def __str__(self):
        return str(self.total_count)
