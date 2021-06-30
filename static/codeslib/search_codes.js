$(document).ready(function() {


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
				$('#errorAlert').text(data.error).show();
	// 			$('#successAlert').hide();
                console.log('error:', data.error)    
			}
			else {
	// 			$('#successAlert').text(data.name).show();
				$('#errorAlert').hide();
                $('#code-items').find('option').remove().end();
                var arr = data.result;
                for(var i=0; i< arr.length;i++){
                    $('<option/>', { value:arr[i], html: arr[i] }).appendTo('#code-items');
                };
                

			};

		});


        event.preventDefault();
    });
});