'use strict';

if ($('.image-gallery').length) {
	$('.image-gallery').magnificPopup({
	delegate: 'a',
	type: 'image',
		gallery: {
			enabled: true,
			preload: [0, 1],
			arrowMarkup: '<button title=\'%title%\' type=\'button\' class=\'mfp-arrow mfp-arrow-%dir%\'></button>',
			navigateByImgClick: true,
			tPrev: 'Previous (Left arrow key)',
			tNext: 'Next (Right arrow key)',
			tCounter: '<span class="mfp-counter">%curr% of %total%</span>',
		},
		mainClass: 'mfp-img-mobile',
	});
}

function toggleMobileNavigation() {
	$('.page-header nav ul').toggle();
}


function bindEventHandlers() {
	$('.page-header .hamburger').on('click', toggleMobileNavigation);
}


$(document).ready(function(){
	bindEventHandlers();
});
