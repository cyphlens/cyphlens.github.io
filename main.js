// Javascript for Cyphlens

$(document).ready(function(){
	goHome();
	goContactUs();

	// Mobile
	goHomeMob();
	clickHamburger();
	clickHamburgerItem("#products_dropdown_mob", "#products_list_mob");
	clickHamburgerItem("#developers_dropdown_mob", "#developers_list_mob");
});

function goHome(){
	$("img#menu_logo").on("click", function(event){
		window.location.pathname = "index.html";
	});
}

function goContactUs(){
	$("button.contact_us").on("click", function(event){
		window.location.pathname = "contact.html";
	});
	handleForm();
}

function handleForm(){
	$("#contact_form").on("change",'#country_dropdown',function(){
    	$("#country_dropdown").removeClass('is_placeholder');
    });

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

/* Mobile */

function goHomeMob(){
	$("img#menu_logo_mob").on("click", function(event){
		window.location.pathname = "index.html";
	});
}

function clickHamburger(){
	$("#ham_btn").on("click", function(event){
		var state = $(this).attr('data-state');
		if (state == "closed") {
			$(this).attr('data-state', "open");
			$(this).attr('aria-expanded', "true");
			$("#ham_btn>div#ham").addClass("hamburger_open");
			$("#ham_btn>div#ham").attr('aria-expanded', "true")
			$("#ham_btn>div#ham>div#ham_top").addClass("hamburger_top_open");
			$("#ham_btn>div#ham>div#ham_bottom").addClass("hamburger_bottom_open");
			// Open menu
			$("#menu_wrap_mob").css('display', "block");
			$("#menu_wrap_mob").attr('data-state', "open");
		} else {
			$(this).attr('data-state', "closed");
			$(this).attr('aria-expanded', "false");
			$("#ham_btn>div#ham").removeClass("hamburger_open");
			$("#ham_btn>div#ham").attr('aria-expanded', "false")
			$("#ham_btn>div#ham>div#ham_top").removeClass("hamburger_top_open");
			$("#ham_btn>div#ham>div#ham_bottom").removeClass("hamburger_bottom_open");
			// Close menu
			$("#menu_wrap_mob").css('display', "none");
			$("#menu_wrap_mob").attr('data-state', "closed");
			// Close submenus
			closeHamburgerItem("#products_dropdown_mob", "#products_list_mob");
			closeHamburgerItem("#developers_dropdown_mob", "#developers_list_mob");
		}
	});
}

function clickHamburgerItem(itemID, subItemID){
	$(itemID).on("click", function(event){
		var state = $(itemID + ">div").attr('data-state');
		if (state == "closed"){
			$(itemID + ">div").attr('data-state', "open");
			$(itemID + ">div>h3").attr('data-state', "open");
			$(itemID + ">div>h3>button").attr('data-state', "open");
			$(itemID + ">div>h3>button").attr('aria-expanded', "true");
			$(itemID + ">div>div#products_list_mob").attr('data-state', "open");
			$(itemID + ">div>div" + subItemID).removeAttr('hidden');
		} else {
			$(itemID + ">div").attr('data-state', "closed");
			$(itemID + ">div>h3").attr('data-state', "closed");
			$(itemID + ">div>h3>button").attr('data-state', "closed");
			$(itemID + ">div>h3>button").attr('aria-expanded', "false");
			$(itemID + ">div>div#products_list_mob").attr('data-state', "closed");
			$(itemID + ">div>div" + subItemID).attr('hidden','');
		}
	});
}

function closeHamburgerItem(itemID, subItemID){
	var state = $(itemID + ">div").attr('data-state');
	if (state == "open"){
		$(itemID + ">div").attr('data-state', "closed");
		$(itemID + ">div>h3").attr('data-state', "closed");
		$(itemID + ">div>h3>button").attr('data-state', "closed");
		$(itemID + ">div>h3>button").attr('aria-expanded', "false");
		$(itemID + ">div>div#products_list_mob").attr('data-state', "closed");
		$(itemID + ">div>div" + subItemID).attr('hidden','');
	}
}


