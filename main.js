function init(){
	loadHomepage();
	goHomeEvent();
	goAboutEvent();
	goPartialEncEvent();
	goMutual2faEvent();
	goPersonalEvent();
	doNothingEvent();
}

function doNothingEvent(){
	$('#solnav,#devnav').click(function(event){
		event.preventDefault();
	});
}

function loadHomepage(){
	document.title = "Cyphlens | Home";
	$('#homenav').addClass("active");
	$('#content').load('home.html', function(){
		// Cards in the homepage
		$('#home_pencrypt').click(function(){
			$('#pencrypt').trigger("click");
		});
		$('#home_m2fa').click(function(){
			$('#m2fa').trigger("click");
		});
		$('#home_personal').click(function(){
			$('#personal').trigger("click");
		});
		$('#nav_btntrial,#btntrial').click(function(){
			$("#bform_result").html( "&nbsp;" );
			$('#b_form_title').text("Request Trial");
			$('input[name="name"]').val("trial");
			$('#b_form').slideDown();
		});
		$('#nav_btnsales').click(function(){
			$("#bform_result").html( "&nbsp;" );
			$('#b_form_title').text("Sales Question");
			$('input[name="name"]').val("sales");
			$('#b_form').slideDown();
		});
		handleAccordion();
		handleBottomForm();
		window.scrollTo(0,0);
	}).hide().fadeIn();
}

function unselectEntry(){
	$("#topmenu>a.active").removeClass("active");
	$("#topmenu>div.active").removeClass("active");
	$(".dropdown-content a").removeClass("activ");
}

function goHomeEvent(){
	$('#homenav').click(function(){
		let isCurrent = $('#homenav').hasClass("active");
		if (!isCurrent){
			unselectEntry();
			$('#homenav').click(loadHomepage());
		}
	});
}

function goAboutEvent(){
	$('#aboutnav').click(function() {
		let isCurrent = $('#aboutnav').hasClass("active");
		if (!isCurrent){
			unselectEntry();
			document.title = "Cyphlens | Contacts";
			$('#aboutnav').addClass("active");
			$('#content').load('contacts.html', function(){
				$('#sales_link').click(function(){
					$("#bform_result").html( "&nbsp;" );
					$('#b_form_title').text("Sales Question");
					$('input[name="name"]').val("sales");
					$('#b_form').slideDown();
				});
				$('#support_link').click(function(){
					$("#bform_result").html( "&nbsp;" );
					$('#b_form_title').text("Report A Problem");
					$('input[name="name"]').val("support");
					$('#b_form').slideDown();
				});
				handleForm();
				window.scrollTo(0,0);
			}).hide().fadeIn();
		}
	});
}

function goPartialEncEvent(){
	$('#pencrypt').click(function() {
		unselectEntry();
		document.title = "Cyphlens | Partial Encryption";
		$('#dropdown1').addClass("active");
		$('#pencrypt').addClass("activ");
		$('#content').load('partial_encryption.html', function(){
			window.scrollTo(0,0);
		}).hide().fadeIn();
	});
}

function goMutual2faEvent(){
	$('#m2fa').click(function() {
		unselectEntry();
		document.title = "Cyphlens | Mutual 2FA";
		$('#dropdown1').addClass("active");
		$('#m2fa').addClass("activ");
		$('#content').load('mutual2fa.html', function(){
			window.scrollTo(0,0);
		}).hide().fadeIn();
	});
}

function goPersonalEvent(){
	$('#personal').click(function() {
		unselectEntry();
		document.title = "Cyphlens | Personal Privacy";
		$('#dropdown1').addClass("active");
		$('#personal').addClass("activ");
		$('#content').load('personal_security.html', function(){
			window.scrollTo(0,0);
		}).hide().fadeIn();
	});
}

function handleForm(){
	$("#contact_form").submit(function(event){
		event.preventDefault(); //prevent default action 
		//$("#send_btn").html('<i class="fas fa-circle-notch fa-sm fa-spin"></i>&nbsp;&nbsp;Send');
		$("#send_btn").css("background-color", "#424242");
		$("#send_btn").prop("disabled", true);
		var post_url = $(this).attr("action"); //get form action url
		var form_data = $(this).serialize(); //Encode form elements for submission
		$.post( post_url, form_data, function( response ) {
			$("#email").val( "" );
			$("#description").val( "" );
			$("#form_result").html( '<i class="fas fa-check-circle fa-fw" style="color: #779A61;"></i>&nbsp;Sent. Thank you!' );
			$("#send_btn").html("Send");
			$("#send_btn").prop("disabled", false);
			$("#send_btn").css("background-color", "#1D1D1D");
		}).fail(function(){
			$("#email").val( "" );
			$("#description").val( "" );
			$("#form_result").html( '<i class="fas fa-exclamation-circle fa-fw" style="color: #AE595B;"></i>&nbsp;Error. Please try again.' );
			$("#send_btn").html("Send");
			$("#send_btn").prop("disabled", false);
			$("#send_btn").css("background-color", "#1D1D1D");
		});
	});
}

function handleBottomForm(){
	$("#bottom_form").submit(function(event){
		event.preventDefault(); //prevent default action 
		//$("#send_btn").html('<i class="fas fa-circle-notch fa-sm fa-spin"></i>&nbsp;&nbsp;Send');
		$("#bsend_btn").css("background-color", "#424242");
		$("#bsend_btn").prop("disabled", true);
		var post_url = $(this).attr("action"); //get form action url
		var form_data = $(this).serialize(); //Encode form elements for submission
		$.post( post_url, form_data, function( response ) {
			$("#bemail").val( "" );
			$("#bdescription").val( "" );
			$("#bform_result").html( '<i class="fas fa-check-circle fa-fw" style="color: #779A61;"></i>&nbsp;Sent. Thank you!' );
			$("#bsend_btn").html("Send");
			$("#bsend_btn").prop("disabled", false);
			$("#bsend_btn").css("background-color", "#1D1D1D");
		}).fail(function(){
			$("#bemail").val( "" );
			$("#bdescription").val( "" );
			$("#bform_result").html( '<i class="fas fa-exclamation-circle fa-fw" style="color: #AE595B;"></i>&nbsp;Error. Please try again.' );
			$("#bsend_btn").html("Send");
			$("#bsend_btn").prop("disabled", false);
			$("#bsend_btn").css("background-color", "#1D1D1D");
		});
	});
}

/*** ACCORDION ***/
function handleAccordion(){
	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function() {
			this.classList.toggle("active");
			var panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			} 
		});
	}
}

/*** COOKIE WARNING ***/

// Cookie Compliancy BEGIN
function GetCookie(name) {
  var arg=name+"=";
  var alen=arg.length;
  var clen=document.cookie.length;
  var i=0;
  while (i<clen) {
	var j=i+alen;
	if (document.cookie.substring(i,j)==arg)
	  return "here";
	i=document.cookie.indexOf(" ",i)+1;
	if (i==0) break;
  }
  return null;
}
function testFirstCookie(){
	var offset = new Date().getTimezoneOffset();
	//if ((offset >= -180) && (offset <= 0)) { // European time zones
		var visit=GetCookie("cookieCompliancyAccepted");
		if (visit==null){
		   $("#myCookieConsent").fadeIn(400);	// Show warning
	   } else {
			// Already accepted
	   }		
	//}
}
$(document).ready(function(){
    $("#cookieButton").click(function(){
		console.log('Understood');
		var expire=new Date();
		expire=new Date(expire.getTime()+7776000000);
		document.cookie="cookieCompliancyAccepted=here; expires="+expire+";path=/";
        $("#myCookieConsent").hide(400);
    });
	testFirstCookie();
});
// Cookie Compliancy END

