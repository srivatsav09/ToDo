from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    created = serializers.ReadOnlyField()
    datecompleted = serializers.ReadOnlyField()

    class Meta:
        model = Todo
        fields = ['id', 'title', 'memo', 'created',
                  'datecompleted', 'important', 'reminder_date', 'reminder_time']


class TodoCompleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id']
        read_only_fields = ['id', 'title', 'memo',
                            'created', 'datecompleted', 'important']
