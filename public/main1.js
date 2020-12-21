(function () {
	
	'use strict';

	
	var owlCarousel = function(){
            
		var owl2 = $('.owl-carousel-fullwidth');
		owl2.owlCarousel({
                        
                        stagePadding:135,
			items: 5,
			loop: false,
                        dots:false,
			margin: 10,
                       responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:1
	        },
	        1000:{
	            items:3
	        }
	    	}
		
				
		});
	};
        	$(function(){
		owlCarousel();		
	});        
}());