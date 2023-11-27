from django.shortcuts import render
from rest_framework import generics, permissions, mixins, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from .models import Todo
from django.utils import timezone
from .serializers import TodoSerializer, TodoCompleteSerializer

# Create your views here.


class TodoListCreate(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TodoRetrieveDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def delete(self, request, *args, **kwargs):
        Todo = Todo.objects.filter(pk=kwargs['pk'], Todoer=self.request.user)
        if Todo.exists():
            return self.destroy(request, *args, **kwargs)
        else:
            raise ValidationError("This isnt your Todo blud ")


class TodoCompleteList(generics.ListAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]


class TodosFinished(generics.ListAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user=user, datecompleted__isnull=False).order_by('-datecompleted')


class TodoSearchView(generics.ListAPIView):
    serializer_class = TodoSerializer

    def get_queryset(self):
        search_query = self.request.query_params.get('search', None)
        if search_query is not None:
            return Todo.objects.filter(title__icontains=search_query)
        return Todo.objects.all()


class TodoComplete(generics.UpdateAPIView):
    serializer_class = TodoCompleteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Todo.objects.filter(user=user)

    def perform_update(self, serializer):
        serializer.instance.datecompleted = timezone.now()
        serializer.save()


class BulkDeleteView(generics.GenericAPIView):
    serializer_class = TodoCompleteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        ids = request.data.get('id', [])
        existing_tasks = Todo.objects.filter(id__in=ids)
        if not existing_tasks.exists():
            return Response({'error': 'No matching tasks found'}, status=status.HTTP_404_NOT_FOUND)

        # Delete tasks
        existing_tasks.delete()


class BulkCompleteView(generics.GenericAPIView):
    serializer_class = TodoCompleteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        ids = request.data.get('id', [])
        existing_tasks = Todo.objects.filter(id__in=ids)
        if not existing_tasks.exists():
            return Response({'error': 'No matching tasks found'}, status=status.HTTP_404_NOT_FOUND)

        # Mark tasks as completed and store the time completed
        current_time = timezone.now()
        existing_tasks.update(completed=True, time_completed=current_time)

        return Response(status=status.HTTP_200_OK)
