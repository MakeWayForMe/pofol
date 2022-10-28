
(function($) {
    'use strict';

    var $window = $(window),
        $document = $(document),
        $html = $('html'),
        $head = $('head'),
        $screen = $.screen,
        $inArray = $.inArray;

    $(function() {
        var $body = $('body'),
            $wrapper = $('#wrapper'),
            $container = $('#container');

        var LayoutType = $body.attr('data-layouttype');
        setTimeout(function(){
            //console.log(mode);
        }, 1);

        var scrollTop = $window.scrollTop(),
            ContainerOffset = $container.offset(),
            wrapperOffset = $wrapper.offset();
        if(LayoutType=='normal'){
            if(scrollTop > wrapperOffset.top) {
                $wrapper.attr('data-nowtop', 'nontop');
            }else{
                $wrapper.attr('data-nowtop', 'top');
            };
        } else if(LayoutType=='visualtype'){
            if(scrollTop > ContainerOffset.top-150) {
                $wrapper.attr('data-nowtop', 'nontop');
            }else{
                $wrapper.attr('data-nowtop', 'top');
            };
        }
        $window.on('scroll', function(event) {
            var scrollTop = $window.scrollTop(),
                ContainerOffset = $container.offset(),
                wrapperOffset = $wrapper.offset(),
                headerIsActive = $wrapper.is('[data-nowtop="top"]');
            if(LayoutType=='normal'){
                if(scrollTop > wrapperOffset.top) {
                    if(headerIsActive){
                        $wrapper.attr('data-nowtop', 'nontop');
                    };
                }else{
                    $wrapper.attr('data-nowtop', 'top');
                };
            } else if(LayoutType=='visualtype'){
                if(scrollTop > ContainerOffset.top-150) {
                    if(headerIsActive){
                        $wrapper.attr('data-nowtop', 'nontop');
                    };
                }else{
                    $wrapper.attr('data-nowtop', 'top');
                };
            }
        });


        //비주얼 슬라이드
        var $visualSlide = $('.visual_slide .slide_list');
        $visualSlide.on('init reInit', function(event, slick, currentSlide, nextSlide) {
            var percent = ((slick.currentSlide + 1) / slick.slideCount) * 100;
            $('.visual_slide .slick-gage .gage-bar').css('height', percent + '%');
        });
        $visualSlide.slick({
            autoplay : true,
            dots:false,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows:false,
            pauseOnHover:false,
            pauseOnDotsHover : false,
            swipe:false,
            draggable:false,
            //추가 기능
            autoArrow : $('.visual_slide .countbox .auto'),
            isRunOnLowIE : false,
            pauseOnArrowClick : true,
            pauseOnDirectionKeyPush : true,
            pauseOnSwipe : true,
            pauseOnDotsClick : true,
            pauseText : '정지',
            playText : '재생',
            total : $('.visual_slide .countbox .total'),
            current : $('.visual_slide .countbox .current'),
            fade:true,
            speed:3000,
            zIndex:3,
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
        $visualSlide.on('beforeChange', function(event, slick, currentSlide, nextSlide){
            var percent = ((nextSlide + 1) / slick.slideCount) * 100;
            $('.visual_slide .slick-gage .gage-bar').css('height', percent + '%');
        });

        //메뉴활성화
        $('.linkbox li').on('mouseover', function() {
            if(window.innerWidth > 1000) {
                $(this).addClass('active').siblings().css('opacity', '0.5');
            }
        }).on('mouseleave', function() {
            if(window.innerWidth > 1000) {
                $(this).removeClass('active').siblings().css('opacity', '1');
            }
        });



        $window.on('screen:tablet screen:phone', function(event) {

        });
    });
})(jQuery);