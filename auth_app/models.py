from django.db import models

# Article model with title, text and creation date
class Article(models.Model):
	title = models.CharField(max_length=100)
	text = models.TextField()
	creation_date = models.DateField(auto_now_add=True)

	class Meta:
		ordering = ('creation_date',)