(function($) {
	$.fn.rotateSlider = function(options) {
		var settings = $.extend({}, $.fn.rotateSlider.defaults, options);

        return this.each( function() {
			var keyvisual = this;
            var sliderTimer = null;
            
            /* If Slideshow is true, call clickNext() recursively */
			if(settings.slideshow == true) {
				sliderTimer = setInterval(function(){
					slideShow(keyvisual, settings);
				}, settings.slideshowTimer);
			}
			
			/* Place the last slide to the very front and hide it out of the window */
			$(keyvisual).find('li:first').before($(keyvisual).find('li:last'));
			$(keyvisual).find('ul').css({'left' : '-100%'});
			
			/* touch swipe set up */
			$(keyvisual).touchwipe({
				 wipeLeft: function() { clearInterval(sliderTimer);  clickNext(keyvisual, settings); },
				 wipeRight: function() { clearInterval(sliderTimer); clickPrev(keyvisual, settings); },
				 min_move_x: 20,
				 min_move_y: 20,
				 preventDefaultEvents: true
			});
			
			/* action while clicking on the indicator */
			$(settings.indicatorListId).find('li').each(function(){
				$(this).on('click.rotateSlider', function(){
					clearInterval(sliderTimer);
					var clickedIndex = $(settings.indicatorListId).find('li').index(this);
					var activeIndex = $(settings.indicatorListId).find('li.active').index();
					var targetId = $(this).data('id');
					var targetPosition = ($(targetId).offset().left - $(window).scrollLeft())/$(window).width();
                    var currentPosition = ($(keyvisual).find('ul').offset().left - $(window).scrollLeft())/$(window).width();
					var indexDifference = clickedIndex - activeIndex;
					var listNum = $(keyvisual).find('ul li').size();
					if(indexDifference > 0) {
						if(targetPosition < 0) {
							for (var i=0; i<listNum-1; i++) {
								if(i<listNum-2) {
									clickNext(keyvisual, settings);
								} else {
									clickNext(keyvisual, settings);
								}
							}
						} else {
							for (var i=0 ; i < indexDifference; i++) {
								if(i < indexDifference-1) {
									clickNext(keyvisual, settings);
								} else {
									clickNext(keyvisual, settings);
								}
							}
						}
					} else if (indexDifference < 0){
						var abDifference = Math.abs(indexDifference);
						for (var i=0 ; i < abDifference; i++) {
							if(i < abDifference-1) {
								clickPrev(keyvisual, settings);
							} else {
								clickPrev(keyvisual, settings);
							}
						}
					}
				});
			});
        });
    };
	
	/* plugin default variables */
	$.fn.rotateSlider.defaults = {
		slideshowTimer : 5000, //The time on slide goes to another slide while slideshow is true
        slideshow    : true,// If using automatic slideshow or not
		indicatorListId: '#slider_dot_indicator',// id of the indicator container
		duration: 500 //Transition of slides after click on the indicator
	};

/* 	play slideshow */
	function slideShow(elem, settings){
		clickNext(elem, settings);
	}
	
/* 	Go to next slide function */
	function clickNext(elem, settings){
		var duration = settings.duration;
		if(duration != 0) {
			$(elem).find('ul').animate({'left' : '-200%'}, duration, function () {
	            $(elem).find('li:last').after($(elem).find('li:first')); 
	            $(elem).find('ul').css({'left' : '-100%'});
	            if( $(settings.indicatorListId).find('li').last().hasClass('active')) {
		            var activeElem = $(settings.indicatorListId).find('li.active');
		            $(activeElem).removeClass('active');
		            $(settings.indicatorListId).find('li').first().addClass('active');
	            } else { 
	            	$(settings.indicatorListId).find('li.active').next().addClass('active');
					$(settings.indicatorListId).find('li.active').first().removeClass('active');
				}
	        });
	   } else {
		   $(elem).find('li:last').after($(elem).find('li:first')); 
	            if(  $(settings.indicatorListId).find('li').last().hasClass('active')) {
	            var activeElem = $(settings.indicatorListId).find('li.active');
	            $(activeElem).removeClass('active');
	            $(settings.indicatorListId).find('li').first().addClass('active');
            } else { 
            	$(settings.indicatorListId).find('li.active').next().addClass('active');
				$(settings.indicatorListId).find('li.active').first().removeClass('active');
			}
	   }
	}
	
	
/* 	Go to previous slide */
	function clickPrev(elem, settings) {
		var duration = settings.duration;
		
		if(duration != 0) {
			$(elem).find('ul').animate({'left' : '0%'}, duration,function(){
	            $(elem).find('li:first').before($(elem).find('li:last'));
	            $(elem).find('ul').css({'left' : '-100%'});
	            if( $(settings.indicatorListId).find('li.active').is(':first-of-type')) {
		            var activeElem = $(settings.indicatorListId).find('li.active');
		            $(activeElem).removeClass('active');
		            $(settings.indicatorListId).find('li').last().addClass('active');
	            } else {
	            	$(settings.indicatorListId).find('li.active').prev().addClass('active');
	            	$(settings.indicatorListId).find('li.active').last().removeClass('active');
				}
	        });
		} else {
			$(elem).find('li:first').before($(elem).find('li:last'));
            if( $(settings.indicatorListId).find('li.active').is(':first-of-type')) {
	            var activeElem = $(settings.indicatorListId).find('li.active');
	            $(activeElem).removeClass('active');
	            $(settings.indicatorListId).find('li').last().addClass('active');
            } else {
            	$(settings.indicatorListId).find('li.active').prev().addClass('active');
            	$(settings.indicatorListId).find('li.active').last().removeClass('active');
			}
		}
	}
	
}(jQuery));