from django.db import models

disease = [
    ('healthy','Healthy'),
    ('pneumoniaB','Pneumonia Bacterial'),
    ('pneumoniaV','Pneumonia Viral'),
    ('tuberculosis','Tuberculosis'),
    ('covid','Covid'),
    ('edema','Edema'),
    ('lesion','Lung Lesion')
]

# lets us explicitly set upload path and filename
def upload_to(instance, filename):
    print('images/{category}/{filename}'.format(category=instance.category, filename=filename))
    return 'images/{category}/{filename}'.format(category=instance.category, filename=filename)

class CTImage(models.Model):
    category = models.CharField(max_length=100, choices=disease)
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)