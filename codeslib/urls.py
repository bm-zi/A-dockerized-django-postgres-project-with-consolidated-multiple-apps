from django.urls import path
from .views import ( 
    codeslib_home_view,
    codeslib_home_all_view,
    title_source_view, 
    add_new_code_view,
    delete_code_view,
    modify_form_view,
    modify_code_view,
    search_by_category_view,
    save_source_view,
    search_codes_view,
    search_code_bydate_view,
    change_favorite_view,
    filter_by_language_view,
)


urlpatterns = [
    path('codeslib/', codeslib_home_view, name='codeslib_home_view'),
    path('codeslib/all', codeslib_home_all_view, name='codeslib_home_all_view'),
    path('codeslib/title-source/', title_source_view),
    path('codeslib/new-code', add_new_code_view, name='add_new_code_view'),
    path('codeslib/delete-code/', delete_code_view, name='delete_code_view'),
    path('codeslib/modify-form/<select_title>/', modify_form_view, name='modify_form_view'),
    path('codeslib/modify-code', modify_code_view, name='modify_code_view'),
    path('codeslib/search-by-categories/', search_by_category_view, name='search_by_category_view'),
    path('codeslib/save/', save_source_view, name='save_source_view'),
    path('codeslib/search-codes/', search_codes_view, name='search_codes_view'),
    path('codeslib/search-bydate/', search_code_bydate_view, name='search_code_bydate_view'),
    path('codeslib/change-fav', change_favorite_view, name='change_favorite_view'),
    path('codeslib/filter-by-language/', filter_by_language_view, name='filter_by_language_view')
]
