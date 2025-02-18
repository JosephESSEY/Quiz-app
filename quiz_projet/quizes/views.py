from django.shortcuts import render
from .models import Quiz
from django.views.generic import ListView
from django.http import JsonResponse
from questions.models import Question,Answer
from results.models import Result

# Create your views here.

# class QuizListView(ListView):
#     model = Quiz
#     template_name = 'quizes/main.html'

def view(request, *args, **kwargs):
    quiz = Quiz.objects.all()[1:]
    return render(request, 'quizes/main.html', {'obj' : quiz})

def quiz_view(request, pk):
    quiz = Quiz.objects.all()[1:]
    return render(request, 'quizes/quiz.html', {'obj' : quiz})

def quiz_data_view(request, pk):
    quiz = Quiz.objects.get(pk=pk)
    questions = []
    for q in quiz.get_questions():
        answers = []
        for a in q.get_answers():
            answers.append(a.text)
        questions.append({str(q): answers})
    return JsonResponse({
        'data': questions, 
    })


def save_quiz_view(request, pk):
    #print(request.POST)
    questions = []
    data = request.POST
    data_ = dict(data.lists())


    data_.pop('csrfmiddlewaretoken')

    for k in data_.keys():
        print('key', k)
        question = Question.objects.get(text=k)
        questions.append(question)
    print(questions)


    user = request.user
    quiz = Quiz.objects.get(pk = pk)


    results = []
    correct_answer = None
    win = False

    for q in questions:
        a_selected = request.POST.get(q.text)
        print('selected', a_selected)

        if a_selected != "":
            question_answers = Answer.objects.filter(question = q)
            for a in question_answers:
                if a_selected == a.text:
                    if a.correct:
                        win = True
                        correct_answer = a.text
                else:
                    if a.correct :
                        correct_answer = a.text

            results.append({str(q): {'correct_answer' : correct_answer, 'answered' : a_selected  }})

        else:
            results.append({str(q): 'not answerd'})

    Result.objects.create(quiz = quiz, user = user, status = win)

    if win :
        return JsonResponse({'Bonne Reponse' : True, 'results': results})
    
    else:
        return JsonResponse({'Bonne Reponse' : False, 'results': results})

    

   # return JsonResponse({'text': 'works'})
