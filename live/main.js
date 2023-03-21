// Javascript for Cyphlens

$(document).ready(function(){
	goHome();
	goContactUs();
});

function goHome(){
	$("img#menu_logo").on("click", function(event){
		window.location.pathname = "live/index.html";
	});
}

function goContactUs(){
	$("button.contact_us").on("click", function(event){
		window.location.pathname = "live/contact.html";
	});
	handleForm();
}

function handleForm(){
	$("#contact_form").submit(function(event){
		event.preventDefault(); //prevent default action 
		//$("#send_btn").html('<i class="fas fa-circle-notch fa-sm fa-spin"></i>&nbsp;&nbsp;Send');
		$("#send_btn").css("background-color", "#535353");
		$("#send_btn").prop("disabled", true);
		var post_url = $(this).attr("action"); //get form action url
		var form_data = $(this).serialize(); //Encode form elements for submission
		$.post( post_url, form_data, function( response ) {
			$("input[name=firstname]").val( "" );
			$("input[name=lastname]").val( "" );
			$("input[name=email]").val( "" );
			$("input[name=company]").val( "" );
			$("input[name=website]").val( "" );
			$("select[name=country_dropdown]").prop('selectedIndex', 0);
			$("#form_result").html( '<i class="fa-solid fa-circle-check fa-fw" style="color: #1e1c97;"></i>&nbsp;Sent. Thank you!' );
			$("#send_btn").html("Submit");
			$("#send_btn").prop("disabled", false);
			$("#send_btn").css("background-color", "#333333");
		}).fail(function(){
			$("#form_result").html( '<i class="fa-solid fa-circle-exclamation fa-fw" style="color: #AE595B;"></i>&nbsp;Error. Please try again.' );
			$("#send_btn").html("Submit");
			$("#send_btn").prop("disabled", false);
			$("#send_btn").css("background-color", "#333333");
		});
	});
}


