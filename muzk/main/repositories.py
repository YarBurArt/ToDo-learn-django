"""to interact with models, for separating concerns"""
from django.db.models.query import QuerySet
from .models import ToDo

class ToDoRepository:
    def get_all(self) -> QuerySet:
        """ret all ToDo objects, for displaying a list of tasks"""
        return ToDo.objects.all()

    def create(self, title: str) -> ToDo:
        """new ToDo with the given title and current timestamp, for adding tasks"""
        todo = ToDo(title=title, date_created=timezone.now())
        todo.save()
        return todo

    def update(self, todo: ToDo) -> ToDo:
        """toggles the is_complete field of the given ToDo, for marking tasks complete/incomplete"""
        todo.is_complete = not todo.is_complete
        todo.save()
        return todo

    def delete(self, todo: ToDo) -> None:
        """del the given ToDo, for removing tasks from the to-do list"""
        todo.delete()
