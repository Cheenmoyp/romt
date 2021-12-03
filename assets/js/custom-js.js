//Sticky Search box
$(document).on("scroll", function(){
	if ($(document).scrollTop() > 400){
		$(".search-con").addClass("shrink");
	} else {
		$(".search-con").removeClass("shrink");
	}
	
});
//Sticky Search bar end

//Nav Menu
$(document).ready(function() {
	// executes when HTML-Document is loaded and DOM is ready
   
   // breakpoint and up  
   $(window).resize(function(){
	   if ($(window).width() >= 980){	
   
		 // when you hover a toggle show its dropdown menu
		 $(".navbar .dropdown-toggle").hover(function () {
			$(this).parent().toggleClass("show");
			$(this).parent().find(".dropdown-menu").toggleClass("show"); 
		  });
   
		   // hide the menu when the mouse leaves the dropdown
		 $( ".navbar .dropdown-menu" ).mouseleave(function() {
		   $(this).removeClass("show");  
		 });
	 
		   // do something here
	   }	
   });  
	 
	 
   
   // document ready  
   });
//Nav Menu End

//Nav Menu

(function($){
	$('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
	  if (!$(this).next().hasClass('show')) {
		$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
	  }
	  var $subMenu = $(this).next(".dropdown-menu");
	  $subMenu.toggleClass('show');

	  $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
		$('.dropdown-submenu .show').removeClass("show");
	  });

	  return false;
	});
})(jQuery)

//Nav Menu End

//AOS animation
AOS.init();
//AOS animation end
//Box Slider
 $(document).ready(function() {
    $("#Destinations").owlCarousel({
        loop: true,
  		margin: 10,
  		nav: true,
  		navText: [ "<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
  		autoplay: true,
  		autoplayHoverPause: true,
  		responsive: {
  		0: {items: 1},
  		600: {items: 2},
  		1000: {items:4}
  		} 
    });
    $("#Testimonial").owlCarousel({
        loop: true,      
  		margin: 10,
  		nav: true,
  		navText: [ "<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
  		autoplay: true,
  		autoplayHoverPause: true,
  		responsive: {
  		0: {items: 1},
  		600: {items: 2}, 
  		1000: {items:2}
  		} 
    }); 
  $("#relatedstay").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      navText: [ "<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
      autoplay: true,
      autoplayHoverPause: true,
      responsive: {
      0: {items: 1},
      600: {items:3},
      1000: {items:5}
      } 
    });
    $("#related-tours").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      navText: [ "<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
      autoplay: true,
      autoplayHoverPause: true,
      responsive: {
      0: {items: 1},
      600: {items:3},
      1000: {items:5}
      } 
    });    

});



//View more View Less End 




//Box Slider End


$(function(){
    $('#myModal').modal({
        show: false
    }).on('hidden.bs.modal', function(){
        $(this).find('video')[0].pause();
    });
});