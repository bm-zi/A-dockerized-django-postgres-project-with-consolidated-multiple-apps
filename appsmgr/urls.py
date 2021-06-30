from django.urls import path
from .views import home_view
from jf.views import jf_home_view
from bkup.views import bkup_home_view
from codeslib.views import codeslib_home_view

urlpatterns = [
    path('', home_view, name="home_view"),
    path('jf/', jf_home_view, name='job_searching_view'),
    path('bkup/', bkup_home_view, name='bkup_home_view'),
    path('codeslib/', codeslib_home_view, name='codeslib_home_view'),
]
