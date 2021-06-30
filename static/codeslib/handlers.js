
function getElements() {
    
    var select_title_elem = document.getElementById('select-title');
    if (!select_title_elem.options[select_title_elem.selectedIndex]){
        // alert('You have to select a code item first!');
        select_title_elem = ''
    }
    else { 
        var select_title = select_title_elem.options[select_title_elem.selectedIndex].text;
    }

    var select_operation_elem = document.getElementById('select-operation');
    var select_operation = select_operation_elem.options[select_operation_elem.selectedIndex].text;

    var textarea_source = document.getElementById('textarea-source');
    // var textarea_source = textarea_source_elem.text;
    
    var textarea_codeinfo = document.getElementById('textarea-codeinfo');
    // var textarea_codeinfo = textarea_codeinfo_elem.text;



    return [ select_title, 
        select_operation,
        textarea_source,
        textarea_codeinfo
    ]

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



function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function setHeader(xhr){
    var csrftoken = getCookie('csrftoken')
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("X-CSRFToken", csrftoken);
}


function codeDisplayHandler() {  

    const select_title = getElements()[0]

    var url = '/codeslib/title-source/';
    var method = "POST";

    var data = JSON.stringify({ select_title : select_title, });
    var xhr = new XMLHttpRequest();
    xhr.open(method, url)
    setHeader(xhr)
    xhr.onload = function() {
        var xhrResponseText = xhr.responseText;
        var jsonResponse = JSON.parse(xhrResponseText);
        textarea_source = getElements()[2]
        textarea_codeinfo = getElements()[3]
        textarea_source.innerHTML = jsonResponse.source;
        textarea_codeinfo.innerHTML = jsonResponse.code_info;
    }
    xhr.send(data)
    return
}



function saveSourceHandler() {
    
    select_title = getElements()[0]
    textarea_source = getElements()[2].value;
    // console.log('textarea_source',textarea_source)
    var url = '/codeslib/save/';
    var data = JSON.stringify({ select_title: select_title, textarea_source: textarea_source});
    var method = "POST";
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    setHeader(xhr)
    xhr.onload = function () {
        window.location.href =  "";
    };
    xhr.send(data)
    return
}



function modifyHandler() {
    select_title = getElements()[0]

    var url = '/codeslib/modify-form/' + select_title + '/';
    var data =  JSON.stringify({ select_title: select_title });
    var method = "POST";
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    setHeader(xhr)
    xhr.onload = function () {
        var response_url = xhr.responseURL;
        window.location.href =  response_url;
    };
    xhr.send(data)
    return
}



function favoriteHandler() {
    select_title = getElements()[0]

    var url = '/codeslib/change-fav';
    var data =  JSON.stringify({ select_title: select_title });
    var method = "POST";
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    setHeader(xhr)
    xhr.onload = function () {
        window.location = window.location;
        window.location.href = "/codeslib/";
    };
    xhr.send(data)
    return
};



function deleteHandler() {
    select_title = getElements()[0]

    var url = '/codeslib/delete-code/';
    var data =  JSON.stringify({ select_title: select_title });
    var method = "POST";
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    setHeader(xhr)
    xhr.onload = function () {
        var data = xhr.responseText;
        var jsonResponse = JSON.parse(data);
        alert(jsonResponse.message);
        window.location = window.location; // F5
    };
    xhr.send(data)
    return
}


function categoryHandler() {
    
    var el = document.getElementsByName('select-category')[0];
    // alert(getSelectValues(el));
    var select_categories = getSelectValues(el);
    

    var url = '/codeslib/search-by-categories/';
    var data = JSON.stringify({ select_categories: select_categories, });
    var method = "POST";
    var xhr = new XMLHttpRequest();
    
    xhr.open(method, url);
    setHeader(xhr)
    xhr.onload = function () {
        
        // console.log(xhr.responseText)
        var data = xhr.responseText;
        var jsonResponse = JSON.parse(data);
        // console.log(jsonResponse)
        
        options = jsonResponse.codes_filtered_by_categories
        var code_items_elem = document.getElementById('select-title');

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
}


function searchHandler() {

    $('#seach-code-form').on('submit', function(event) {
		$.ajax({
			data : {
				q : $('#search-str').val(),
			},
			type : 'GET',
			url : '/codeslib/search-codes'
		})
		.done(function(data) {

			if (data.error) {
				// $('#errorAlert').text(data.error).show();
	// 			$('#successAlert').hide();
                console.log('error:', data.error)    
			}
			else {
	// 			$('#successAlert').text(data.name).show();
				// $('#errorAlert').hide();
                $('#select-title').find('option').remove().end();
                var arr = data.result;
                console.log(arr)
                for(var i=0; i< arr.length;i++){
                    $('<option/>', { value:arr[i], html: arr[i] }).appendChild('#code-items');
                };
                

			};

		});


        // event.preventDefault();
    });
}


function searchByDateHandler() {

    $('#seach-bydate-form').on('submit', function(event) {
		$.ajax({
			data : {
				q : $('#days-str').val(),
			},
			type : 'GET',
			url : '/codeslib/search-bydate/'
		})
		.done(function(data) {

			if (data.error) {
				// $('#errorAlert').text(data.error).show();
	// 			$('#successAlert').hide();
                console.log('error:', data.error)    
			}
			else {
	// 			$('#successAlert').text(data.name).show();
				// $('#errorAlert').hide();
                $('#select-title').find('option').remove().end();
                var arr = data.result;
                console.log(arr)
                for(var i=0; i< arr.length;i++){
                    $('<option/>', { value:arr[i], html: arr[i] }).appendChild('#code-items');
                };
                

			};

		});


        // event.preventDefault();
    });
}

//
function selectMaxHandler(total_no){
    // document.querySelector('#select-title').style.height="100vh";
    el = document.getElementById('select-title');
    el.setAttribute("size", total_no );
}

function selectMinHandler(fav_no){
    el = document.getElementById('select-title');
    el.setAttribute("size", fav_no );
}

function oneRowHandler(){
    el = document.getElementById('select-title');
    el.setAttribute("size", 1 );
}
//


function textareaMaxHandler(){
        document.querySelector('#textarea-source').style.height="100vh";
        // document.querySelector('#textarea-source').style.width="100vw";
}

function textareaMinHandler(){
    // window.location = window.location;
    // document.querySelector('#textarea-source').style.height="23vh";
    document.querySelector('#textarea-source').style.height="initial";
    // document.querySelector('#textarea-source').style.width="58vw";
    document.querySelector('#textarea-source').style.width="inherit";
    // document.querySelector('#textarea-source').style.resize = "inherit"
}

function textareaFullScreen(){
    
    document.querySelector('#textarea-source').style.width= "100vw";
    document.querySelector('#textarea-source').style.height="100vh";
    
}


function downloadCodeHandler(){
    var textareaVal = document.getElementById('textarea-source').value;
    var filename = "output.txt";
    download(textareaVal, filename);

    function download(textareaVal, filename){
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textareaVal));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    window.location = window.location;
}



function languageHandler() {
    var el = document.getElementById('select-language');
    var selected_language = el.options[el.selectedIndex].text;
    // alert(selected_language)

    var url = '/codeslib/filter-by-language/';
    var data = JSON.stringify({selected_language:selected_language,});
    var method = "POST";
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    setHeader(xhr)
    xhr.onload = function () {

        var data_in = xhr.responseText;
        var jsonResponse = JSON.parse(data_in);
        
        options = jsonResponse.codes_filtered_by_language;
        var code_items_elem = document.getElementById('select-title');

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
    };
    xhr.send(data)
    return
}





// if (select_title != 'NaN' && select_title != null && select_title != '') {
//     select_title.addEventListener('onchange', codeDisplayHandler)
// }