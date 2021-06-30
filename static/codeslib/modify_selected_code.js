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

function selectedModifyHandler() {
    
    var selected_code_item = document.getElementById('code-items');
    var title_str = selected_code_item.options[selected_code_item.selectedIndex].text;
    
    var url = '/codeslib/modify-form/' + title_str + '/';
    const method = "POST";
    const data = JSON.stringify({ 'title_str': title_str, });
    const xhr = new XMLHttpRequest();
    const csrftoken = getCookie('csrftoken');
    xhr.open(method, url)
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xhr.setRequestHeader("X-CSRFToken", csrftoken)
    xhr.onload = function () {
        var response_url = xhr.responseURL;
        window.location.href =  response_url;
    }
    xhr.send(data)
    return
};

