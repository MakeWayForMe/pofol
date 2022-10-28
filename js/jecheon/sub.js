

(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
		$screen = $.screen,
        $inArray = $.inArray;

    $(function() {

		//사이드
		var $container = $('#container'),
			$side = $container.find('.side'),
			$sideDepthItem = $side.find('.depth_item'),
			$sideSpy = $side.find('.spy:last');

		$sideDepthItem.on('click.menu', function(event) {
			var $this = $(this),
				$depthText = $this.children('.depth_text'),
				eventTarget = event.target,
				IsActive = $this.is('.active');

			if($depthText.find(eventTarget).length || $depthText[0] === eventTarget) {
				if($this.hasClass('depth1_item')) {
					if($this.hasClass('active')) {
						$html.removeClass('side_open');
					}else{
						$html.addClass('side_open');
					}
				}

				if($this.children('.depth').length) {
					var $Depth = $this.children('.depth'),
						DepthDisplay = $Depth.css('display');
					if(DepthDisplay!=='none'){//하위메뉴가 display:none이 아니면 실행
						if(!IsActive){
							$this.removeClass('active_prev active_next');
							$this.addClass('active').siblings('.depth_item').removeClass('active active_prev active_next');
							$this.prev('.depth_item').addClass('active_prev');
							$this.next('.depth_item').addClass('active_next');
						} else{
							$this.removeClass('active');
							$this.siblings('.depth_item').removeClass('active_prev active_next');
						}
						event.preventDefault();
					}
				}
			}

			event.stopPropagation();
		}).each(function(index, element) {
			var $element = $(element);

			if($element.children('.depth').length) {
				$element.addClass('has');
			}else{
				$element.addClass('solo');
			}
		});

		if($sideSpy.length) {
			$html.addClass('side_open');
			$sideSpy.parents('.depth_item').addClass('active');
			$sideSpy.parents('.depth_item').prev('.depth_item').addClass('active_prev');
			$sideSpy.parents('.depth_item').next('.depth_item').addClass('active_next');
		}

		//pathbox handler
		$('.sub_visual .path_box .list .list_btn').on('click',function() {
			var $this = $(this),
				$thisParent = $this.parent('.list'),
				$thisTitle = $this.attr('title');
			if($thisTitle === '목록열기') {
				$this.attr('title','목록닫기').addClass('active');
			} else {
				$this.attr('title','목록열기').removeClass('active');
			}
			$thisParent.siblings('.list').children('.list_btn').removeClass('active').attr('title','목록열기');
		});

		//sns_share
		$('.sub_visual .sns_share .share_open').on('click', function() {
			$(this).parent().addClass('active');
		});
		$('.sub_visual .share_close').on('click',function() {
			$(this).parents('.sns_share').removeClass('active');
		});

		//여기서부터 코드 작성해주세요



        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);