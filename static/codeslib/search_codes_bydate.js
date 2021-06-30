$(document).ready(function() {


    $('#seach-bydate-form').on('submit', function(event) {

		$.ajax({
			data : {
				days : $('#days-str').val(),
			},
			type : 'GET',
			url : '/codeslib/search-bydate'
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