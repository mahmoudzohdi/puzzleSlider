(function($, window, document){
	$.fn.puzzleSlider = function(options){

		this.css('overflow', 'hidden');

		options = $.extend({
							state: 'auto',
							slicesX: 6,
							slicesY: 5,
							slicesTime: 3000,
							waitingTime: 4000
						}, options);

		var pluginObj = {
			slider: this,
			sliderWidth: this.outerWidth(),
			sliderHeight: this.outerHeight(),
			slide: this.find('.item'),
			slices: null,
			slicesInner: null,
			current: 0,
			slicesLength: options.slicesX * options.slicesY,
			slicesArray: [],
			sliceWidth: null,
			sliceHeight: null,
			imageSrc: null,
			selectedSlice: null,
			slicePosition: null,
			leftPosition: null,
			topPosition: null,
			slicesTime: options.slicesTime / (options.slicesX * options.slicesY)

				
		};
		

		function sliderInit(){
			
			// slices array
			function slicesArrayFn(){
				for(var i=0; i < pluginObj.slicesLength; i++){
					pluginObj.slicesArray.push(i);
				}
			}slicesArrayFn();

			// initialize plguin DOM
			function initializeDOM(){
				pluginObj.sliceWidth = pluginObj.sliderWidth / options.slicesX;
				pluginObj.sliceHeight = pluginObj.sliderHeight / options.slicesY;
				var slicesNum = options.slicesX * options.slicesY;

				pluginObj.slider.append('<div class="active-slider"></div>');


				for(var i = 1; i <= slicesNum; i++){
					pluginObj.slider.find('.active-slider').css('position', 'relative').append('<span class="slice"><span class="inner-slice"></span></span>');
				}

				pluginObj.slices = pluginObj.slider.find('.active-slider .slice');
				pluginObj.slicesInner = pluginObj.slices.find('.inner-slice');
				pluginObj.slices.width((pluginObj.sliceWidth/ pluginObj.sliderWidth) * 100 + '%').height(pluginObj.sliceHeight);

			}initializeDOM();

			// initialize item image into slices
			function initializeImages(image){
				pluginObj.slices.each(function(index){
					var thisElement = $(this);
					var positionLeft = index * pluginObj.sliceWidth;
					var positionTop = index * pluginObj.sliceHeight;
					pluginObj.slicePosition = thisElement.position();
					var innerThis = thisElement.find('.inner-slice');
					pluginObj.leftPosition = pluginObj.slicePosition.left;
					pluginObj.topPosition = pluginObj.slicePosition.top;
					innerThis.css({
						'background-image': 'url('+image+')',
						'background-size': pluginObj.sliderWidth + 'px '+pluginObj.sliderHeight + 'px',
						'background-position': '-'+pluginObj.leftPosition+'px'+' -'+pluginObj.topPosition+'px',
					});
				});
				pluginObj.slide.hide();
			}

			function SlidesStyle(){
				pluginObj.slices.width((pluginObj.sliceWidth/ pluginObj.sliderWidth) * 100 + '%').height(pluginObj.sliceHeight).css({
					'display': 'inline-block',
					'float': 'left',
					'background-repeat': 'no-repeat'
				});
				pluginObj.slicesInner.css({
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
				pluginObj.slices.find('.inner-slice.active').css({
					'transition': 'none',
					'-webkit-transition': 'none',
					'-moz-transition': 'none',
					'-ms-transition': 'none',
					'opacity': '0.5',
				});
			}

			function removeActiveStyle(){
				pluginObj.slices.find('.inner-slice.active').css({
					'transition': 'opacity 0.5s linear',
					'-webkit-transition': 'opacity 0.5s linear',
					'-moz-transition': 'opacity 0.5s linear',
					'-ms-transition': 'opacity 0.5s linear',
					'opacity': '1',
				});
			}	

			// initialize slider
			function initializeSlider(){
				pluginObj.imageSrc = pluginObj.slide.eq(pluginObj.current).attr('src');
				initializeImages(pluginObj.imageSrc);
			}initializeSlider();

			// sliding Action
			function slidingAction(image, hoverElement){
						var count = 0;
				if(options.state === 'auto'){
					for(var i=0; i < pluginObj.slicesLength; i++){
							pluginObj.selectedSlice = pluginObj.slicesArray[Math.floor(Math.random() * pluginObj.slicesArray.length)];
							runAction(pluginObj.selectedSlice);
							pluginObj.slicesArray.splice(pluginObj.slicesArray.indexOf(pluginObj.selectedSlice), 1);
					}
				}else if(options.state === 'hover'){
					runAction(hoverElement);
				}
				function runAction(sliceIndex){
						setTimeout(function(){
							pluginObj.slices.eq(sliceIndex).find('.inner-slice').addClass('active');
							SlidesActiveStyle();
						}, (pluginObj.slicesTime*i));

						setTimeout(function(){
							pluginObj.slices.eq(sliceIndex).find('.inner-slice');
							removeActiveStyle();
							pluginObj.slices.eq(sliceIndex).find('.inner-slice').css('background-image', 'url('+image+')').removeClass('active');

							if(options.state === 'hover'){
								pluginObj.slices.eq(sliceIndex).find('.inner-slice').parent().addClass('done');
							}

							if(options.state === 'auto'){
								count++;
								if(count === pluginObj.slicesLength){
									slicesArrayFn();
									slidingFn();
								}	
							}
						}, ((pluginObj.slicesTime *i)+ 10));
				}

			}

			function slidingFn(){

				function autoState(){
					setTimeout(function(){
							if(pluginObj.current == (pluginObj.slide.length - 1)){
								pluginObj.current = 0;
							}else{
								pluginObj.current++;
							}
							slidingAction(pluginObj.slide.eq(pluginObj.current).attr('src'));
					}, options.waitingTime);
				}

				function hoverState(){
					pluginObj.current++;
					pluginObj.slices.find('.inner-slice').mouseover(function(){
						if($(this).parents('.slice.done').length === 0){
							var thisElement = $(this);
							slidingAction(pluginObj.slide.eq(pluginObj.current).attr('src'), thisElement.parent().index());
						}
						setTimeout(function(){
							if(pluginObj.slider.find('.slice.done').length === pluginObj.slicesLength){
								setTimeout(checkIfComplete, 50);
							}
						}, 10);

					});
					function checkIfComplete(){
							pluginObj.slices.removeClass('done');
							pluginObj.current++;
							if(pluginObj.current >= pluginObj.slide.length){
								pluginObj.current = 0;
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
				pluginObj.sliderWidth = pluginObj.slider.outerWidth();
				pluginObj.sliderHeight = pluginObj.slider.outerHeight();
				pluginObj.slicesInner.css({
					'background-size': pluginObj.sliderWidth + 'px '+pluginObj.sliderHeight + 'px',
				});
				// initialize item image into slices
				pluginObj.sliceHeight = pluginObj.sliderHeight / options.slicesY;
				pluginObj.slices.height(pluginObj.sliceHeight);
				pluginObj.slices.each(function(index){
					var thisElement = $(this);
					var innerThis = thisElement.find('.inner-slice');
					pluginObj.slicePosition = thisElement.position();
					pluginObj.leftPosition = pluginObj.slicePosition.left;
					pluginObj.topPosition = pluginObj.slicePosition.top;
					innerThis.css({
						'background-position': '-'+pluginObj.leftPosition+'px'+' -'+pluginObj.topPosition+'px',
					});
				});
			}
			$(window).bind('resize', resizing);
		}
		sliderInit();
		
		return this;
	};
}(window.jQuery, window, document));
