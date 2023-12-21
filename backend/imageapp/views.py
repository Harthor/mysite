from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status 
from .forms import ImageForm
from .serializers import ImageSerializer

class ImageUploadView(APIView):

    def post(self, request, *args, **kwargs):
        form = ImageForm(request.POST, request.FILES)

        if form.is_valid():
            image_instance = form.save()
            serializer = ImageSerializer(image_instance)

            return Response({'imageUrl' : serializer.data['image']}, status = status.HTTP_201_CREATED)
        else:
            return Response({'error' : 'Invalid Form'}, status = status.HTTP_400_BAD_REQUEST)