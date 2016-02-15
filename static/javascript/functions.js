
//global variables
var cw,ch;
var loaded = false;
var spy = ScrollSpy();


//initial events, and general event binding
jQuery(document).ready(function($) {
	
	$('#backtotop').click(function(event) {
	  	event.preventDefault();
		$('body,html').animate({scrollTop:0},2000);
	});

	$(".jump").click(function(e){
		e.preventDefault();
		var href = $(this).attr("href");
		href = href.toLowerCase();
		scrollLink(href);	
	});

	$(".menu-toggle").click(function(e){
		e.preventDefault();
		cycleMenu();
	});

	$('.menu-nav-toggle').click(function(event) {
	  	event.preventDefault();
	  	menuNavToggle($(this));
	});	

	$('#blanket').click(function(event) {
	  	event.preventDefault();
	  	cycleMenu();
	});

	$('#deck-slick').slick({
		centerMode: true,
		arrows: true,
		// dots: true,
		focusOnSelect: true,
		centerPadding: '250px',
		slidesToShow: 1,
		responsive: [
		    {
		      breakpoint: 1024,
		      settings: {
		        arrows: true,
		        centerMode: true,
		        centerPadding: '90px',
		        slidesToShow: 1
		      }
		    },
		    {
		      breakpoint: 768,
		      settings: {
		        arrows: true,
		        dots: true,
		        centerMode: true,
		        centerPadding: '10px',
		        slidesToShow: 1
		      }
		    }
		  ]	
	});

});//end document.ready


$(window).scroll(function() { 
	
	window.requestAnimationFrame(headerSpy);
	window.requestAnimationFrame(navSpy);
	window.requestAnimationFrame(spy.run);	
	//window.requestAnimationFrame(parallax);

});//end window.scroll


/** ----------- MENU AND HEADER --------------------------------- */


function headerSpy(){

	var headerHeight = $('#header-olin').height() + 3;	


	if($(window).scrollTop() >= headerHeight){
		if($('body').hasClass('header-before')){
			$('body').removeClass('header-before').addClass('header-after');
			$('#header-rwtl').removeClass('asbolute').addClass('fixed');
		}	
	}	
	else{
		if($('body').hasClass('header-after')){
			$('body').removeClass('header-after').addClass('header-before');
			$('#header-rwtl').removeClass('fixed').addClass('absolute');
		}	
	}

	if($('.body-individual').length){
		var scrollTarget = ($('.individual-description').offset().top) - 43;

		if($(window).scrollTop() >= scrollTarget){
			if($('body').hasClass('header-white')){
				$('body').removeClass('header-white').addClass('header-dark');
			}	
		}	
		else{
			if($('body').hasClass('header-dark')){
				$('body').removeClass('header-dark').addClass('header-white');
			}	
		}
	}

}

function navSpy(){

	if($('.filter-nav').length){

		var headerHeight = $('#header-olin').height();
		var nav = $('.filter-nav');
		var navFix = $('#nav-fix');
		var navScrollTop = ($('#nav').offset().top) - headerHeight;				

		if(($(window).scrollTop() >= navScrollTop) && nav.hasClass('static') ) {
			console.log(navScrollTop);
			nav.removeClass('static').addClass('fixed');
			//navFix.removeClass('off').addClass('on');	
		}	
		else if(($(window).scrollTop() < navScrollTop) && nav.hasClass('fixed') ){
			nav.removeClass('fixed').addClass('static');
			//navFix.removeClass('on').addClass('off');			
		}

	}

}



function cycleMenu() {

	if ( $('menu').hasClass( 'open' ) ) {

		$('menu').removeClass( 'open' ).addClass('closed');
		$('body').removeClass( 'menu-open' ).addClass('menu-closed');
		$('#blanket').removeClass( 'on' ).addClass('off');
		$('body').css({overflow: 'scroll'});

	} else {

		$('menu').removeClass( 'closed' ).addClass('open');
		$('body').removeClass( 'menu-closed' ).addClass('menu-open');	
		$('#blanket').removeClass( 'off' ).addClass('on');			
		$('body').css({overflow: 'hidden'});

	}
}


function menuNavToggle(_link){
	var sibling = $(_link).next();
	var link = _link;

	if($(sibling).hasClass('closed')){
		$(sibling).removeClass('closed').addClass('open');
	  	$( sibling ).slideDown();
	  	$(link).addClass('opened');
	}
	else{
		$(sibling).removeClass('open').addClass('closed');
	  	$( sibling ).slideUp();		
	  	$(link).removeClass('opened');
	}
}

//animate jump links
function scrollLink(destination,speed){
	if(!speed){
		speed = 1500;
	}
	$('html,body').animate({
		scrollTop: $(destination).offset().top - 80
	},speed);
}

function parallax(){

	pBody = $('body').scrollTop();
	console.log('pBody = ' + pBody);
	
	pNumTemp = $('.number').css('bottom');
	console.log('pNumTemp = ' + pNumTemp);
	
	pNum = pBody/6;
	console.log('pNum = ' + pNum);
	
	
	$('.title').css('left',pNum);
	$('.subtitle').css('left',-pNum);
	$('.section-title').css('left',pNum);

}




