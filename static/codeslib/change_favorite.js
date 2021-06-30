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

    $('#operation-items').on('click', function(event){
        var sel = $('#operation-items').find(":selected").text();
        if ( sel === 'change favorite' )
            var code_sel = $('#code-items').find(":selected").text();
            const csrftoken = getCookie('csrftoken');
            target_url = "/codeslib/change-fav"
        
            $.ajax({  
                url: target_url,
                type: "POST",
                data : { code_sel: code_sel},
                headers: { 'X-CSRFToken': csrftoken },
                success: function (data) {},
                error: function (data) {}
            })

            .done(function(data) {
                if (data.error) {
                    $('#errorAlert').text(data.error).show();
                }
                else {
        			    window.location = window.location;
                        window.location.href = "/codeslib/"
                    };
                })
    });


});