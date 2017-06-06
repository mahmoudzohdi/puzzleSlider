(function($, window, document){
	$.fn.puzzleSlider = function(options){
		// handling if parameters have no value
		var defaults = {
			state: 'auto',
			slicesX: 6,
			slicesY: 5,
			slicesTime: 3000,
			waitingTime: 4000
		};


		options = $.extend(defaults, options);

		// add class to slider
		this.addClass('puzzle-slider').css('overflow', 'hidden');
		
		// variables
		var slider = this;
		var sliderWidth = slider.outerWidth();
		var sliderHeight = slider.outerHeight();
		var slide = slider.find('.item');
		var current = 0;
		var slicesLength = options.slicesX * options.slicesY;
		var slicesArray = [];
		var slices;
		var slicesInner;
		var sliceWidth;
		var sliceHeight;
		var imageSrc;
		var selectedSlice;
		var slicesTime = options.slicesTime / (options.slicesX * options.slicesY);
		var slicePosition;
		var leftPosition;
		var topPosition;

		function sliderInit(){
			
			// slices array
			function slicesArrayFn(){
				for(var i=0; i < slicesLength; i++){
					slicesArray.push(i);
				}
			}slicesArrayFn();

			// initialize plguin DOM
			function initializeDOM(){
				sliceWidth = sliderWidth / options.slicesX;
				sliceHeight = sliderHeight / options.slicesY;
				var slicesNum = options.slicesX * options.slicesY;

				slider.append('<div class="active-slider"></div>');


				for(var i = 1; i <= slicesNum; i++){
					slider.find('.active-slider').css('position', 'relative').append('<span class="slice"><span class="inner-slice"></span></span>');
				}

				slices = slider.find('.active-slider .slice');
				slicesInner = slices.find('.inner-slice');
				slices.width((sliceWidth/ sliderWidth) * 100 + '%').height(sliceHeight);

			}initializeDOM();

			// initialize item image into slices
			function initializeImages(image){
				slices.each(function(index){
					var thisElement = $(this);
					var positionLeft = index * sliceWidth;
					var positionTop = index * sliceHeight;
					slicePosition = thisElement.position();
					var innerThis = thisElement.find('.inner-slice');
					leftPosition = slicePosition.left;
					topPosition = slicePosition.top;
					innerThis.css({
						'background-image': 'url('+image+')',
						'background-size': sliderWidth + 'px '+sliderHeight + 'px',
						'background-position': '-'+leftPosition+'px'+' -'+topPosition+'px',
					});
				});
				slide.hide();
			}

			function SlidesStyle(){
				slices.width((sliceWidth/ sliderWidth) * 100 + '%').height(sliceHeight).css({
					'display': 'inline-block',
					'float': 'left',
					'background-repeat': 'no-repeat'
				});
				slicesInner.css({
					'width': 100 +'%',
					'height': 100 +'%',
					'display': 'block',
					'transition': 'opacity 0.5s linear',
					'-webkit-transition': 'opacity 0.5s linear',
					'-moz-transition': 'opacity 0.5s linear',
					'-ms-transition': 'opacity 0.5s linear',
				});
			}SlidesStyle();

			function SlidesActiveStyle(){
				slices.find('.inner-slice.active').css({
					'transition': 'none',
					'-webkit-transition': 'none',
					'-moz-transition': 'none',
					'-ms-transition': 'none',
					'opacity': '0.5',
				});
			}

			function removeActiveStyle(){
				slices.find('.inner-slice.active').css({
					'transition': 'opacity 0.5s linear',
					'-webkit-transition': 'opacity 0.5s linear',
					'-moz-transition': 'opacity 0.5s linear',
					'-ms-transition': 'opacity 0.5s linear',
					'opacity': '1',
				});
			}	

			// initialize slider
			function initializeSlider(){
				imageSrc = slide.eq(current).attr('src');
				initializeImages(imageSrc);
			}initializeSlider();

			// sliding Action
			function slidingAction(image, hoverElement){
						var count = 0;
				if(options.state === 'auto'){
					for(var i=0; i < slicesLength; i++){
							selectedSlice = slicesArray[Math.floor(Math.random() * slicesArray.length)];
							runAction(selectedSlice);
							slicesArray.splice(slicesArray.indexOf(selectedSlice), 1);
					}
				}else if(options.state === 'hover'){
					runAction(hoverElement);
				}
				function runAction(sliceIndex){
						setTimeout(function(){
							slices.eq(sliceIndex).find('.inner-slice').addClass('active');
							SlidesActiveStyle();
						}, (slicesTime*i));

						setTimeout(function(){
							slices.eq(sliceIndex).find('.inner-slice');
							removeActiveStyle();
							slices.eq(sliceIndex).find('.inner-slice').css('background-image', 'url('+image+')').removeClass('active');

							if(options.state === 'hover'){
								slices.eq(sliceIndex).find('.inner-slice').parent().addClass('done');
							}

							if(options.state === 'auto'){
								count++;
								if(count === slicesLength){
									slicesArrayFn();
									slidingFn();
								}	
							}
						}, ((slicesTime *i)+ 10));
				}

			}

			function slidingFn(){

				function autoState(){
					setTimeout(function(){
							if(current == (slide.length - 1)){
								current = 0;
							}else{
								current++;
							}
							slidingAction(slide.eq(current).attr('src'));
					}, options.waitingTime);
				}

				function hoverState(){
					current++;
					slices.find('.inner-slice').mouseover(function(){
						if($(this).parents('.slice.done').length === 0){
							var thisElement = $(this);
							slidingAction(slide.eq(current).attr('src'), thisElement.parent().index());
						}
						setTimeout(function(){
							if(slider.find('.slice.done').length === slicesLength){
								setTimeout(checkIfComplete, 50);
							}
						}, 10);

					});
					function checkIfComplete(){
							slices.removeClass('done');
							current++;
							if(current >= slide.length){
								current = 0;
							}					
					}
				}


				if(options.state === 'auto'){
					autoState();
				}else if(options.state === 'hover'){
					hoverState();
				}
			}slidingFn();

			function resizing(){
				sliderWidth = slider.outerWidth();
				sliderHeight = slider.outerHeight();
				slicesInner.css({
					'background-size': sliderWidth + 'px '+sliderHeight + 'px',
				});
				// initialize item image into slices
				sliceHeight = sliderHeight / options.slicesY;
				slices.height(sliceHeight);
				slices.each(function(index){
					var thisElement = $(this);
					var innerThis = thisElement.find('.inner-slice');
					slicePosition = thisElement.position();
					leftPosition = slicePosition.left;
					topPosition = slicePosition.top;
					innerThis.css({
						'background-position': '-'+leftPosition+'px'+' -'+topPosition+'px',
					});
				});
			}
			$(window).bind('resize', resizing);
		}
		sliderInit();
		
		return this;
	};
}(window.jQuery, window, document));
