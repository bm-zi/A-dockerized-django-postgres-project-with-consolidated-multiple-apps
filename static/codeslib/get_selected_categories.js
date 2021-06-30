function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];

        if (opt.selected) {
        result.push(opt.value || opt.text);
        }
    }
    return result;
}


function selectedCategoriesHandler() {

    var el = document.getElementsByName('category-items')[0];
    // alert(getSelectValues(el));
    var categories_selected = getSelectValues(el);
    

    const url = '/codeslib/search-by-categories/';
    const method = "POST";
    const data = JSON.stringify({ 'categories_selected': categories_selected, });
    const xhr = new XMLHttpRequest();
    const csrftoken = getCookie('csrftoken');
    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.onload = function () {

        // console.log(xhr.responseText)
        var data = xhr.responseText;
        var jsonResponse = JSON.parse(data);
        // console.log(jsonResponse.codes_filtered_by_categories)
        
        options = jsonResponse.codes_filtered_by_categories
        var code_items_elem = document.getElementById('code-items');

        var length = code_items_elem.options.length;
        for (i = length-1; i >= 0; i--) {
            code_items_elem.options[i] = null;
        }

        for(var i = 0; i < options.length; i++) {
            var opt = options[i];
            
            var el = document.createElement("option")
            el.text = opt;
            el.value = opt;
        
            code_items_elem.appendChild(el);
        }
    }
    xhr.send(data)
    return
    
};

