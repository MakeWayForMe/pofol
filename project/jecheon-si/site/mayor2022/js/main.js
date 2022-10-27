
'use strict';

try {
	//제이쿼리가 있으면
	this.jQuery = this.jQuery || undefined;

	//제이쿼리가 있으면
	if(jQuery) {
		//$ 중복방지
		(function($) {
			//태그객체
			var $window = $(window);
			$(function() {

				//여기서부터 코드 작성해주세요

				//비주얼 슬라이드
				var $visualSlide = $('.visual_slide .slide_list');
				$visualSlide.slick({
					autoplay : true,
					dots:false,
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					prevArrow : $('.visual_slide .slide_control .prev'),
					nextArrow : $('.visual_slide .slide_control .next'),
					pauseOnDotsHover : true,
					swipe:false,
					draggable:false,
					//추가 기능
					autoArrow : $('.visual_slide .countbox .auto'),
					isRunOnLowIE : false,
					pauseOnArrowClick : true,
					pauseOnDirectionKeyPush : true,
					pauseOnSwipe : true,
					pauseOnDotsClick : true,
					fade : true,
					speed : 2000,
					zIndex : 5,
					pauseText : '정지',
					playText : '재생',
					total : $('.visual_slide .countbox .total'),
					current : $('.visual_slide .countbox .current'),
					customState : function(state) {
						if(state.current < 10) {
							state.current = '0' + state.current;
						}
						if(state.total < 10) {
							state.total = '0' + state.total;
						}
						return state;
					},
					responsive: [
					{
						breakpoint: 1001,
						settings: {
						swipe:true,
						draggable:true
						}
					}]
				});

				//카드 슬라이드
				var $cardSlide = $('.card_slide .slide_list');
				var cardSlickOption = {
					autoplay : false,
					dots:false,
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: false,
					prevArrow : $('.card_slide .slide_control .prev'),
					nextArrow : $('.card_slide .slide_control .next'),
					pauseOnDotsHover : true,
					swipe:false,
					draggable:false,
					//추가 기능
					autoArrow : $('.card_slide .countbox .auto'),
					isRunOnLowIE : false,
					pauseOnArrowClick : true,
					pauseOnDirectionKeyPush : true,
					pauseOnSwipe : true,
					pauseOnDotsClick : true,
					pauseText : '정지',
					playText : '재생',
					variableWidth : true,
					responsive: [
						{
							breakpoint: 1401,
							settings: {
								slidesToShow: 2,
							}
						},
						{
							breakpoint: 1001,
							settings: "unslick"
						}
					]
				};
				$cardSlide.slick(cardSlickOption);

				//카드 sly
				var slyOptions = {
					scrollSource: null,
					horizontal: 1,
					itemNav: 'basic',
					smart: 1,
					activateMiddle: false,
					activateOn: 'click',
					mouseDragging: 1,
					touchDragging: 1,
					releaseSwing: 1,
					startAt: 0,
					scrollBar: $('.rowgroup3 .scrollbar'),
					scrollBy: 0,
					speed: 400,
					elasticBounds: 1,
					easing: 'easeOutExpo',
					dragHandle: 1,
					dynamicHandle: 1,
					clickBar: 1,
					minHandleSize: 124,
				};
				$('.card_slide').sly(slyOptions);

				//언론 슬라이드
				var $newsSlide = $('.news_slide .slide_list');
				$newsSlide.slick({
					autoplay : false,
					dots:true,
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: false,
					prevArrow : $('.news_slide .slide_control .prev'),
					nextArrow : $('.news_slide .slide_control .next'),
					pauseOnDotsHover : true,
					swipe:false,
					draggable:false,
					//추가 기능
					autoArrow : $('.slidebox .slide_control .auto'),
					isRunOnLowIE : false,
					pauseOnArrowClick : true,
					pauseOnDirectionKeyPush : true,
					pauseOnSwipe : true,
					pauseOnDotsClick : true,
					pauseText : '정지',
					playText : '재생',
					rows : 3,
					slidesPerRow : 1, //여러줄 일 때 한줄의 몇개 출력
					// variableWidth:true,
					responsive: [
					{
					breakpoint: 1001,
					settings: {
						swipe:true,
						draggable:true,
					}
					}]
				});

				//언론 버튼 활성화
				$(document).on('click','.news_slide .textbox', function(e) {
					if(window.innerWidth > 1000) {
						if($(this).attr('title') === '닫힘') {
							e.preventDefault();
							var $thisParent = $(this).parent(),
								$slideRows = $(this).parents('.slick-rows'),
								slideIndex = $(this).parents('.slick-slide').attr('data-slick-index'),
								slideRowsIndex = $slideRows.index();
							$('.news_slide .slide_item').removeClass('active');
							$thisParent.addClass('active');
							$('.imgcon .imgbox').eq((3 * slideIndex) + slideRowsIndex).addClass('active').siblings().removeClass('active');
							$('.news_slide .slide_item .textbox').attr('title', '닫힘').eq(3 * slideIndex + slideRowsIndex).attr('title','열림');
						}
					}
				});

				//슬라이드 페이지 넘기면 맨 위 항목 활성화
				$newsSlide.on('beforeChange', function(event, slick, currentSlide, nextSlide){
					$('.news_slide .slide_item').removeClass('active');
					$('.news_slide .slick-slide').eq(nextSlide).children('.slick-rows').eq(0).children('.slide_item').addClass('active');
					$('.news_slide .slide_item .textbox').attr('title', '닫힘').eq(nextSlide * 3).attr('title','열림');
					$('.imgcon .imgbox').eq(nextSlide * 3).addClass('active').siblings().removeClass('active');
				});


				$window.on('screen:wide screen:web', function (event) {
					$('.card_slide').sly(false);
					$cardSlide.not('.slick-initialized').slick(cardSlickOption);


				});
				$window.on('screen:tablet screen:phone', function (event) {
					$window.resize(function () {
						$('.card_slide').sly('reload');
					});
					$cardSlide.on("destroy", function (event, slick) { // slick 이벤트 제거 되고 난 후 콜백으로 실행(겹침 방지)
						$('.card_slide').sly(slyOptions);
					})
				});
			});
		})(jQuery);
	}
}catch(e) {
	console.error(e);
}