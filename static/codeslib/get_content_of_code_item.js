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


function selectedCodeItemHandler() {
    var selected_code_item = document.getElementById('select-title');
    var text_body_selected = document.getElementById('textarea-source')
    var title_str = selected_code_item.options[selected_code_item.selectedIndex].text;
    var code_info_selected = document.getElementById('textarea-codeinfo')

    const url = '/codeslib/item-source/';
    const method = "POST";
    const data = JSON.stringify({ "title_str": title_str, });
    const xhr = new XMLHttpRequest();
    const csrftoken = getCookie('csrftoken');
    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.onload = function () {
        // xhr receieves json data as server response, that needs to be get as text, 
        // then from the data object (JavaScript object) received we set the value in 
        // text area element.
        var data = xhr.responseText;
        var jsonResponse = JSON.parse(data);
        text_body_selected.innerHTML = jsonResponse.source;
        code_info_selected.innerHTML = jsonResponse.code_info;
    }
    xhr.send(data)
    return
};

var selected_code_item = document.getElementById('code-items');
if (selected_code_item != 'NaN' && selected_code_item != null && selected_code_item != '') {
    selected_code_item.addEventListener('onchange', selectedCodeItemHandler)
}