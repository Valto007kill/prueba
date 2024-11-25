from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
import os

def recorder(request):
    return render(request, "audio_recorder/recorder.html")

def guardar_audio(request):
    if request.method == "POST" and request.FILES.get("audio_file"):
        audio_file = request.FILES["audio_file"]
        # Guardar el archivo en el directorio MEDIA_ROOT/audio/grabaciones
        save_path = os.path.join(settings.MEDIA_ROOT, "audio/grabaciones", audio_file.name)
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        with open(save_path, "wb") as f:
            for chunk in audio_file.chunks():
                f.write(chunk)
        return JsonResponse({"message": "Audio guardado correctamente"})
    return JsonResponse({"error": "No se envió archivo"}, status=400)