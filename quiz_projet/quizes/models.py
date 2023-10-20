from django.db import models

# Create your models here.


class Quiz(models.Model):
    name = models.CharField(max_length=120)
    topic = models.CharField(max_length=120)
    number_of_questions = models.IntegerField()
     

    def __str__(self):
        return f"{self.name}-{self.topic}"


    def get_questions(self):
        return self.question_set.all()[:self.number_of_questions]
    
    class Meta: 
        verbose_name_plural = 'Quizes'
        verbose_name = 'Quiz'