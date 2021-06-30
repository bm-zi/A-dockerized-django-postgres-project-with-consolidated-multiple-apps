from django.http.response import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse

# Create your views here.


# system backup - flask application

import os
import os.path
from pathlib import Path
# from IPython import embed   # embed()
import datetime
import zipfile

homedir = os.path.expanduser('~')
zip_dir = '/tmp/allzips'


def backupToZip(folder):
    zipname = os.path.basename(folder) + '.zip'
    zipFilename = os.path.join(zip_dir, zipname)

    allstrs = []
    # print('Creating %s...' % (zipFilename))
    str1 = 'Creating %s...' % (zipFilename)
    allstrs.append(str1.strip())
    backupZip = zipfile.ZipFile(zipFilename, 'w')

    filePaths = []

    for root, directories, files in os.walk(folder):
        for filename in files:
            filePath = os.path.join(root, filename)
            if not os.path.islink(filePath):
                filePaths.append(filePath)

    str2list = []
    for f in filePaths:
        # print('Adding ' + str(f) + ' in ' + str(zipFilename))
        str2 = 'Adding ' + str(f) + ' in ' + str(zipFilename)
        allstrs.append(str2.strip())
        backupZip.write(f)

    backupZip.close()
    # print('Done.')
    str3 = 'Done.'
    allstrs.append(str3.strip())
    return allstrs


def get_sub_dirs(a_directory_path):
    d = a_directory_path
    # return [o for o in os.listdir(d) if os.path.isdir(os.path.join(d,o)) and not o.startswith('.')]
    return [os.path.join(d, o) for o in os.listdir(d) if os.path.isdir(os.path.join(d, o)) and not o.startswith('.')]


def modified_1_day(base_dir, dirs_list):
    result_dir_list = []
    compare_date = datetime.datetime.today() - datetime.timedelta(hours=24)

    for di in dirs_list:
        d = os.path.join(base_dir, di)
        create_dt = os.stat(d).st_mtime
        created_date = datetime.datetime.fromtimestamp(create_dt)
        if created_date > compare_date:
            result_dir_list.append(d)

    return result_dir_list


def modified_7_day(base_dir, dirs_list):
    result_dir_list = []
    compare_date = datetime.datetime.today() - datetime.timedelta(hours=168)

    for di in dirs_list:
        d = os.path.join(base_dir, di)
        create_dt = os.stat(d).st_ctime
        created_date = datetime.datetime.fromtimestamp(create_dt)
        if created_date > compare_date:
            result_dir_list.append(d)

    return result_dir_list


def modified_14_day(base_dir, dirs_list):
    result_dir_list = []
    compare_date = datetime.datetime.today() - datetime.timedelta(hours=336)

    for di in dirs_list:
        d = os.path.join(base_dir, di)
        create_dt = os.stat(d).st_mtime
        created_date = datetime.datetime.fromtimestamp(create_dt)
        if created_date > compare_date:
            result_dir_list.append(d)

    return result_dir_list


def modified_30_day(base_dir, dirs_list):
    result_dir_list = []
    compare_date = datetime.datetime.today() - datetime.timedelta(hours=672)

    for di in dirs_list:
        d = os.path.join(base_dir, di)
        create_dt = os.stat(d).st_mtime
        created_date = datetime.datetime.fromtimestamp(create_dt)
        if created_date > compare_date:
            result_dir_list.append(d)

    return result_dir_list


# @app.route("/")
def bkup_home_view(request):
    backuplog = get_sub_dirs(homedir)
    return render(request, 'bkup/bkup_home.html', context={'backuplog': backuplog, 'homedir': homedir})


# @app.route("/dirs", methods=['GET', 'POST'])
def dirs_view(request):

    home_dir = str(Path.home())
    if request.method == 'POST':

        dir_name = request.POST.get('dirname')
        if not dir_name:
            dir_name = home_dir

        time_option = request.POST.get('timeoption')

        if os.path.isdir(os.path.join(home_dir, dir_name)):
            sub_dirs = get_sub_dirs(dir_name)

            if time_option == 'time modified':
                return render(request, 'bkup/dirs.html', context={'sub_dirs': sub_dirs, 'home_dir': home_dir})

            elif time_option == 'in last 24 hrs':
                sub_dirs = modified_1_day(dir_name, sub_dirs)
                return render(request, 'bkup/dirs.html', context={'sub_dirs': sub_dirs, 'home_dir': home_dir})

            elif time_option == 'in last week':
                sub_dirs = modified_7_day(dir_name, sub_dirs)
                return render(request, 'bkup/dirs.html', context={'sub_dirs': sub_dirs, 'home_dir': home_dir})

            elif time_option == 'in last 2 weeks':
                sub_dirs = modified_14_day(dir_name, sub_dirs)
                return render(request, 'bkup/dirs.html', context={'sub_dirs': sub_dirs, 'home_dir': home_dir})

            elif time_option == 'in last month':
                sub_dirs = modified_30_day(dir_name, sub_dirs)
                return render(request, 'bkup/dirs.html', context={'sub_dirs': sub_dirs, 'home_dir': home_dir})

        else:
            msg = 'Directory \"' + dir_name + '\" does not exists'
            # flash(msg)
            sub_dirs = get_sub_dirs(home_dir)
            return render(request, 'bkup/dirs.html', context={'sub_dirs': sub_dirs, 'home_dir': home_dir})
    else:
        home_dir = str(Path.home())
        sub_dirs = get_sub_dirs(home_dir)
        return render(request, 'bkup/dirs.html', context={'sub_dirs': sub_dirs, 'home_dir': home_dir})


# @app.route('/dirs_selected', methods=['POST'])
def dirs_selected_view(request):

    if request.method == 'POST':
        dirs_selected = request.POST.getlist('dirs')
        return render(request, 'bkup/dirs_selected.html', context={'dirs_selected': dirs_selected})


# @app.route('/result', methods=['GET', 'POST'])
def result_view(request):
    subdirs = request.POST.getlist('subdirs')

    if not os.path.isdir(zip_dir):
        os.makedirs(zip_dir)

    if request.method == 'POST':
        for elem in subdirs:
            reportlist = backupToZip(elem)
        ziplist = os.listdir(zip_dir)
        return render(request, 'bkup/result.html', context={'subdirs': subdirs, 'ziplist': ziplist, 'reportlist': reportlist})
