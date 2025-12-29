from django.shortcuts import render
from rest_framework import generics, permissions, mixins, status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from .models import Todo
from django.utils import timezone
from .serializers import TodoSerializer, TodoCompleteSerializer

# Create your views here.


class TodoListCreate(generics.ListCreateAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class TodoRetrieveDestroy(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)


class TodoCompleteList(generics.ListAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user, datecompleted__isnull=True).order_by('-created')


class TodosFinished(generics.ListAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user, datecompleted__isnull=False).order_by('-datecompleted')


class TodoSearchView(generics.ListAPIView):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        search_query = self.request.query_params.get('search', None)
        user_todos = Todo.objects.filter(user=self.request.user)
        if search_query is not None:
            return user_todos.filter(title__icontains=search_query)
        return user_todos


class TodoComplete(generics.UpdateAPIView):
    serializer_class = TodoCompleteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Todo.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        serializer.instance.datecompleted = timezone.now()
        serializer.save()


class BulkDeleteView(generics.GenericAPIView):
    serializer_class = TodoCompleteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        ids = request.data.get('id', [])
        existing_tasks = Todo.objects.filter(id__in=ids, user=self.request.user)
        if not existing_tasks.exists():
            return Response({'error': 'No matching tasks found'}, status=status.HTTP_404_NOT_FOUND)

        # Delete tasks
        existing_tasks.delete()

        return Response({'message': 'Tasks deleted successfully'}, status=status.HTTP_200_OK)


class BulkCompleteView(generics.GenericAPIView):
    serializer_class = TodoCompleteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        ids = request.data.get('id', [])
        existing_tasks = Todo.objects.filter(id__in=ids, user=self.request.user)
        if not existing_tasks.exists():
            return Response({'error': 'No matching tasks found'}, status=status.HTTP_404_NOT_FOUND)

        # Mark tasks as completed and store the time completed
        current_time = timezone.now()
        existing_tasks.update(datecompleted=current_time)

        return Response(status=status.HTTP_200_OK)
