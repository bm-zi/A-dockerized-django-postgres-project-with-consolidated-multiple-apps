from django.shortcuts import render, redirect


import subprocess
from subprocess import check_output
import os
import signal
from os.path import expanduser



home_dir = expanduser("~")

# Create your views here.


def home_view(request):
    return render(request, 'pages/home.html')


def bkup_home_view(request):
    return redirect(request, 'bkup/bkup_home.html')


def job_searching_view(request):
    return redirect(request, 'jf/jf_home.html')


def codeslib_home_view(request):
   return redirect(request, 'codeslib/')


def website_view(request):
    website = os.path.join(home_dir, "bin", "website")
    check_output([website]).decode('utf-8')
    return redirect(request, home_view)


def basicscripts_view(request):
    basicscripts = os.path.join(home_dir, "bin", "webbs")
    check_output([basicscripts]).decode('utf-8')
    return render(request, home_view)
