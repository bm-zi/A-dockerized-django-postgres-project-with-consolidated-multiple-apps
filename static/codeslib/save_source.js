$(document).ready(function(){

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

}

//     $('#operation-items').on('change', function(event){

//         var sel = $('#operation-items').find(":selected").text();
//         if ( sel === 'save and close' )
//             var code_title = $('#code-items').find(":selected").text();
//             var code_source = $('textarea#text-body-selected').val();

//             const csrftoken = getCookie('csrftoken');
//             target_url = "/codeslib/save-source/"
        
//             $.ajax({  
//                 url: target_url,
//                 type: "POST",
//                 data : JSON.stringify({ 'code_title': code_title, 'code_source': code_source, }),
//                 headers: { 'X-CSRFToken': csrftoken },
//                 success: function (response) {},
//                 error: function (data) {}
//             })

//             .done(function(data) {
//                 if (data.error) {
//                     $('#errorAlert').text(data.error).show();
//                 }
//                 else {};
//                 })
//     });


// });

