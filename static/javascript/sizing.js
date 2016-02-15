var ww, wh;

(function( $ ) {
	function recalculate() {
		for ( var selector in actionmap ) {
			var els = $(selector);
			if ( els.length > 0 ) {
				ww = $(window).width();
				wh = $(window).height();
				orientation();
				actionmap[ selector ].callback( 
					actionmap[ selector ].target, els
				); 
			}	
		}	

		$(document).trigger('dom-is-sized');

	}


	function collapseSubLists(){
		$('.sub-list.closed').slideUp();
		$('.sub-list.closed').removeClass('open').addClass('closed');
	}	

	var actionmap = 
	{ 
		'.height-five': {callback:height_strict, target: 0.05},
		'.height-ten': {callback:height_strict, target: 0.1},
		'.height-one-quarter': {callback:height, target: 0.25},
		'.height-third': {callback:height_strict, target: 0.33},
		'.height-forty': {callback:height, target: 0.45},
		'.height-half': {callback:height_strict, target: 0.5},
		'.three-quarter': {callback: height_strict, target: 0.75},
		'.height-half': {callback: height, target: 0.5},
		'.height-ninety': {callback: height_strict, target: 0.9},
		'.height-eighty': {callback: height_strict, target: 0.8},
		'.height-seventy': {callback: height_strict, target: 0.7},	
		'.height-full': {callback: height_strict, target: 1.01},
		'.height-video': {callback:landing_part, target: .563},
		'.height-video-full': {callback:landing_full, target: 1.01}		
	};

	$( document ).ready( function() {
		$(window).on('resize', recalculate);
		collapseSubLists();
		recalculate();
		orientation();
	});
	
	
})( jQuery );

function orientation(){

	$('.block-background video').each(function(i, obj) {
		ph = $(this).parent().height();  
		pw = $(this).parent().width();  
		proportion = ph/pw
		if(proportion > .5625){
			$(this).addClass('height-inherit');
		}
		else if(proportion <= .5625){
			$(this).removeClass('height-inherit');
		}
	});

}


function height( target, selector ) { 
	selector.css({ 'min-height': wh * target }); 
}

function height_strict( target, selector ) { 
	selector.css({ 'height': wh * target }); 
}

function width( target, selector ) { 
	selector.css({ 'width': ww * target }); 
}

function equal_height( target, selector ) {
	selector.css({'height': selector.width() });
}

function equal_width( target, selector ) {
	selector.css({'width': selector.height() });
}

function landing_full( target, selector){
	h = wh * target;
	selector.css({'height': h});
}

function landing_part( target, selector){
	h = ww * target;
	selector.css({'height': h});
}


