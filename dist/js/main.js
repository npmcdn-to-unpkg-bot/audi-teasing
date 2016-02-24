//=================================================//
//AUDI TEASING TUNISIE 
//POWRED BY : ACCESS TO EBUSINESS (www.access.tn)
//DEVELOPER AND INTEGRATOR BY MED ZIED BOUHEJBA
//================================================//



/********************************/
//LOADER JS	
/********************************/
//$('.loader-inner').hide().loaders();



/********************************/
//PARALAX
/********************************/
$(document).ready(function() {
	if($(window).width()>991){
	/*	$('#fullpage').fullpage({
			anchors: ['Map', 'Gallery', 'Options'],
			navigation: false,
			navigationPosition: 'right',
			navigationTooltips: ['Accueil', 'Suivre les progrès', 'Nouveautés'],
			responsiveWidth: 900,
			scrollOverflow: true

		});*/
	}
});

/********************************/
//COUNT DOWN
/********************************/
$('#clock .count').countdown('2016/03/10', function(event) {
	$(this).html(event.strftime('<span> %D </span> <span>%H </span> <span> %M</span> <span>  %S</span>'));
});

$('#clock-2 .count').countdown('2016/03/10', function(event) {
	$(this).html(event.strftime('<span> %D </span> <span>%H </span> <span> %M</span> <span>  %S</span>'));
});


/********************************/
//OWL CAROUSEL
/********************************/
if($(window).width()>991){
	 $("#owl").owlCarousel({
	 
	      navigation : false, // Show next and prev buttons
	      slideSpeed : 300,
	      paginationSpeed : 400,
	      singleItem:true,
	      pagination : false

	});
	$(".btn-gallery").click(function(e){
		e.preventDefault();
		$("#owl").trigger('owl.next');
	});
	$(".btn-progres").click(function(e){
		e.preventDefault();
		$("#owl").trigger('owl.prev');
	});
}
var owl = $('#owl-gallery');
owl.owlCarousel({
      navigation : false, // Show next and prev buttons
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem:true,
      pagination : false
});
/********************************/
//LIGHTBOX
/********************************/
$(function(){
	var $gallery = $('.gallery a:not(.video)').simpleLightbox();
});



/********************************/
//ANIMATE WOW 
/********************************/
function animateDiv(className, animation, time, start) {
	$(className).each(function() {
	    var index = $(this).index();
	    $(this).addClass('wow ' + animation).attr('data-wow-delay', start + time * index + 's');
	});
}
animateDiv('#scene *', 'jello', 0.05, 0);
animateDiv('#clock-2', 'fadeInRight', 0.05, 0);
animateDiv('h2', 'fadeInLeft', 0.05, 0);
animateDiv('h3', 'lightSpeedIn', 0.05, 0);
animateDiv('.car', 'zoomIn', 0.05, 0);
animateDiv('#clock', 'fadeInDown', 0.05, 0);

new WOW().init();


/********************************/
//MODAL
/********************************/
$('.modal-call, .loader').on('click', function (e) {
	e.preventDefault();
	var id = $(this).attr('data-id');
	var modal = $(this).attr('data-modal');
	$('#'+id).modal('show');
	$('#section2 img').addClass('blur');
});

$('.modal').on('hidden.bs.modal', function (e) {
  	$('#section2 img').removeClass('blur');
});

$('form').on('submit', function(e){
	e.preventDefault();
	var el = $(this).find('input');
	if(el.val()==""){

	}
	else {
		var data = {};
		data['mail']  = el.val();
		$('form').hide();
		$.ajax({
            url: 'controllers/submit.php',
            type: 'POST',
            data: data,
            dataType: 'text',
            success: function(response) {
            	console.log(response);
				if(response){
					$('#form').html('').html("<p>Votre mail a été enregistré avec succès</p>");
				} 
				else {
					$('#form').html('').html("<p>Votre mail n'a pas été enregistré </p>");
				}           	
            },
            fail: function(response) {
            	$('#form').html('').html("<p>Votre mail n'a pas été enregistré </p>");
            }
        });
	}
});
/*******BG LOAD*******/
//LOADING
$(document).ready(function(){
	$('body').imagesLoaded( function() {
		$('#loader').fadeOut();
	});
});