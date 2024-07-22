window.onload = () => {

    $(window).scroll(function() {
        var thisTop = $(document).scrollTop();
        if(thisTop > $('section.about').offset().top - $('.nav-container').height()) {
            $('.nav-container').addClass('fixed');
        } else {
            $('.nav-container').removeClass('fixed');
        }
    });

    let $offsetTop1 = $('section.visual').offset().top,
        $offsetTop2 = $('section.about').offset().top,
        $offsetTop3 = $('section.works').offset().top;

    $(window).resize(function() {
        $offsetTop1 = $('section.visual').offset().top;
        $offsetTop2 = $('section.about').offset().top;
        $offsetTop3 = $('section.works').offset().top;
    });

    //탭이동
    $('.nav-container button').on('click', function() {
        var thisIndex = $(this).index();
        if(thisIndex === 0) {
            $('html, body').stop(true).animate({
                scrollTop: $offsetTop1
            }, 600, 'swing');
        } else if(thisIndex === 1) {
            $('html, body').stop(true).animate({
                scrollTop: $offsetTop2
            }, 600, 'swing');
        } else if(thisIndex === 2) {
            $('html, body').stop(true).animate({
                scrollTop: $offsetTop3
            }, 600, 'swing');
        }
    });

    //팝업
    $('.doc').on('click', function() {
        $(this).parent().siblings('.popup').addClass('on');
    });
    $('.close').on('click', function() {
        $(this).parents('.popup').removeClass('on');
    });

    //슬라이드
    var swiper1 = new Swiper(".work1", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });


    particlesJS("bg", {
        "particles": {
            "number": {
                "value": 20,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1.0557003759917487,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 250,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": false,
                    "mode": "push"
                },
                "resize": false
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
}