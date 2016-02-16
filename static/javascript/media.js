

var media = Media();


//once the sizing function is complete, get the media fetch process rolling
$(document).one('dom-is-sized', function() {

	setTimeout(function(){
		$('.loading').addClass('loaded');
		spy.initialize($('.target-initial'),$('.block'),40);
		media.initialize();
	 }, 1000);	

});




function modalMarkup( type, id ) {
	return [
		'<div class="modal off modal-', type,
		'" id="modal-', type,
		'-', id,
		'" data-type="', type,
		'" data-id="', id,
		'" ><h2 class="p3">', type,
		' id="', id,
		'"</h2></div>'
	].join('');
}

function Media(){

	//link markup structure
	//<a href="#" class="media-link" data-target="modal={{type}}-{{id}}" data-target-type="{{type}}" data-target-id="{{id}}">Link to {{type}} id="{{id}}"</a>
	var link1 = '<a href="#" class="media-link" data-target="#modal-';
	var link2 = '-';
	var link3 = '" data-target-type="'
	var link4 = '" data-target-id="';
	var link5 = '">Link to ';
	var link6 = ' id="'
	var link7 = '"</a>';

	var modalContainer = $('#media');

	//find all the p tags with a media shortcode in them to construct our array of objects
	var shortcodes = $( ".wysiwyg p:contains('[[')" );

	var count = shortcodes.length;
	console.log('count = ' + count);

	var media = [count];

	function initialize(){
	 
		scrape();

	}


	function scrape(){

		//console.log(shortcodes);

		//remove all p tags with a media shortcode in them, and store the type and ID in an array
		shortcodes.each(function(i){

			var shortcode = $(this).html();
			var id = shortcode.match(/\d+/)[0];
			var type;

			str = shortcode.toLowerCase();

			switch (str) {
			  case (str.match(/gallery/) || {}).input:
			    type = 'gallery';
			    break;
			  case (str.match(/slider/) || {}).input:
			    type = 'slider';
			    break;
			  default:
			    console.log("no type match");
			    break;
			}		


			//build a link based off our desired markup structure(see top of file)
			var link = link1 + type + link2 + id + link3 + type + link4 + id + link5 + type + link6 + id + link7;

			//replace the shortcode with our link
			$(this).replaceWith(link);			

			//build a modal off our desired markup structure(see top of file)
			//var modal = modal1 + type + modal2 + type + modal3 + id + modal4 + type + modal5 + id + modal6 + type + modal7 + id + modal8; 
			var modalId = '#modal-' + type + '-' + id;

			var modal = modalMarkup( type, id );

			//insert the modal into the appropriate container
			modalContainer.append(modal);	
			
			media[i] = {
				shortcode : shortcode,
				type : 'gallery',
				id : id,
				modal : $(modalId)
			};

			//console.log('shortcode = ' + media[i].shortcode);
			//console.log('type = ' + media[i].type)
			//console.log('id = ' + media[i].id);	
			//console.log(media[i].modal);
			//console.log('-----');						

		});



		cleanup();


	}	


	function get(){



	}


	function parse(){



	}


	function render(){

		//create modal items


		//create links


	}


	function cleanup(){

		$('.media-link').click(function(event){
			event.preventDefault();
			var target = $(this).data('target');
			modalToggle(target);
		});

		$('.modal').click(function(event){
			event.preventDefault();
			modalClose();
		});


	}


	//Q: can i put in a 'property' that stores the data so i can reference it later? like how many objects of each type, their ID, a jquery object with them etc?
	//return an object with the methods within the function. is it best practice to include all of these? 
	return{
		initialize : initialize,
		scrape : scrape,
		get : get,
		parse : parse,
		render : render,
		cleanup : cleanup		
	}


}




function modalToggle(_target,swap){	
	
	//console.log('modalToggle');
	var modalTarget = _target;

	if($('body').hasClass('modal-closed')){
			
		//console.log('modal closed, applying classes for modalToggle');
		
		$(modalTarget).removeClass('off');
		$(modalTarget).addClass('on');
		$('body').removeClass('modal-off');
		$('body').addClass('modal-on');
	}else{}		

}

function modalClose(){
	
	//console.log('closemodal');
	
	if($('body').hasClass('modal-on')){
		
		//console.log('modal on, applying classes for closeModal');
		
		$('.modal').removeClass('on');
		$('.modal').addClass('off');
		$('body').removeClass('modal-on');
		$('body').addClass('modal-off');
	}
	else{}

}


