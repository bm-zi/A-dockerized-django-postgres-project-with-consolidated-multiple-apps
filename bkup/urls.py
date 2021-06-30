from django.urls import path
from .views import bkup_home_view, dirs_selected_view, dirs_view, result_view


urlpatterns = [
    path('bkup', bkup_home_view, name="bkup_home_view"),
    path('bkup/dirs_selected', dirs_selected_view, name='dirs_selected_view'),
    path('bkup/dirs', dirs_view, name='dirs_view'),
    path('bkup/result', result_view, name='result_view'),
]
