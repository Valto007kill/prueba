from django.shortcuts import render

def recorder_view(request):
    return render(request, 'recorder.html')

# Create your views here.
