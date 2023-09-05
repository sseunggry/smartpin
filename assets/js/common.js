let windowW = 0,
	windowH = 0;

/* common */
$(function(){
	// window width
	windowW = $(window).outerWidth();
	windowH = $(window).outerHeight();
	$(window).resize(function(){
		windowW = $(window).outerWidth();
		windowH = $(window).outerHeight();
	});


	let noticeSwiper = "";
	noticeSwiper = new Swiper(".notice-swiper", {
		direction: "vertical",
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		loop: true
	});

	$(document).on("click", ".data-list li a", function(){
		$li = $(this).parents("li");

		$li.siblings().removeClass("active");
		$li.addClass("active");
	});

	selectClickFn();

	// datepicker
	$(".datepicker").each(function(){
		$(this).datepicker({
			dateFormat: "yy-mm-dd",
			prevText: "이전 달",
			nextText: "다음 달",
			monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
			monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
			dayNames: ["일", "월", "화", "수", "목", "금", "토"],
			dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
			dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
			showMonthAfterYear: true,
			yearSuffix: "년"
		});
	});
});

function profileEventFn(){
	let $menu = $(".mypage-menu");
    
	if( !$menu.hasClass("active") ) {
		$(window).bind("click", menuEventFn);
		$menu.addClass("active");
	} else {
		$(window).unbind("click", menuEventFn);
		$menu.removeClass("active");
	}
}

function menuEventFn(event){    
	if( $(event.target).hasClass("user-name") ){
		return false;
	}

	if( $(event.target).parents(".mypage-menu").length <= 0 && !$(event.target).hasClass("mypage-menu") ){
		$(".mypage-menu").removeClass("active");
		$(window).unbind("click", menuEventFn);
	} 
}

function mobileMenuEventFn(){
	let $menu = $(".mob-util");

	if( !$menu.hasClass("active") ) {
		$menu.addClass("active");
		$menu.find(".respon-con").stop().slideDown(400);
	} else {
		$menu.removeClass("active");
		$menu.find(".respon-con").stop().slideUp(400);
	}
}

let timer;
function fullPageEventFn(){
	clearTimeout(timer);
    
	let $warp = $(".wrap");

	if( !$warp.hasClass("fullPage") ) {
		$warp.addClass("fullPage");
        
		if( windowW <= 640 ) {
			$(".full-txt").text("전체보기 모드롤 실행합니다");
		} else {
			$(".full-txt").text("전체보기 모드를 취소합니다");    
		}
    
	} else {
		$warp.removeClass("fullPage");

		if( windowW <= 640 ) {
			$(".full-txt").text("전체보기 모드를 취소합니다");    
		} else {
			$(".full-txt").text("전체보기 모드롤 실행합니다");
		}
	}

	if( windowW <= 640 ) {
		$(".full-txt").stop().show();

		timer = setTimeout(function(){
			$(".full-txt").stop().fadeOut();
		}, 700);
	}

}

function popLayoutHeightFn(obj){
	let popH = obj.find(".inner").outerHeight();
	console.log(popH, windowH);
	if( popH >= windowH ) {
		obj.addClass("fixed");
	} else {
		obj.removeClass("fixed");
	}
}

function popupOpenFn(id){
	$("body").addClass("popView");

	$("#"+id).stop().show();
	popLayoutHeightFn($("#"+id));
}

function popupCloseFn(){
	$(".popup-wrap").stop().hide();
	$("body").removeClass("popView");
}

function selectClickFn(){
	$(".inp-select .select").on("click", function(){
		let $select = $(this).closest(".inp-select");

		if(!$select.hasClass("on")){
			$select.addClass("on");
		} else{
			$select.removeClass("on");
		}
	});

	$(".inp-select .list li").on("click", function(){
		let $select = $(this).parents(".inp-select");
		let $optionValue = $(this).text();

		$select.removeClass("on");
		$select.find(".selected-value").text($optionValue);
	});
}