const markerSvg = `<svg viewBox="0 0 1000 1000">
        <circle cx="499.5" cy="352.5" r="227.5"/>
        <path d="M868.5,371c0,200.9-256.1,430.3-368.5,629.1C387.6,801.3,131.5,571.5,131.5,371 C131.5-123.9,868.5-123.9,868.5,371L868.5,371z M500,145.3c-114.2,0-206.8,92.6-206.8,206.8c0,114.2,92.6,206.8,206.8,206.8 c114.2,0,206.8-92.6,206.8-206.8C706.8,237.9,614.2,145.3,500,145.3z"/>
    </svg>`;

////지구 렌더링 시작
const gData = [];

$.ajax({
    type: 'GET',
    url: '/data/yuhancare/inc/json/globe.json',
    dataType: 'json',
    async: false,
    success: function(data) {
        for(var i=1;i<=Object.keys(data).length;i++) {
            gData.push(data[i]);
        }
    }
});

let nowLat = 37.534261,
    nowLng = 126.985467,
    nowAltitude = window.innerWidth > 1000 ? 1.5 : 2,
    canvasHeight = window.innerWidth > 1000 ? 1600 : window.innerHeight/1.3,
    minusLat = window.innerWidth > 1000 ? 11 : 0,
    pcminus = window.innerWidth > 1000 ? 15 : 0,
    winInner = window.innerWidth > 2000 ? 2000 : window.innerWidth;

const colorInterpolator = t => `rgba(255,255,255,${Math.sqrt(1-t)})`;

const world = Globe({animateIn: false}).width(winInner).height(canvasHeight).backgroundColor('#111').showAtmosphere(true)
    .htmlElementsData(gData)
    .htmlElement(d => {
        const el = document.createElement('div');
        el.innerHTML = markerSvg;
        el.classList.add('globe_pin');

        const popConts = `
            <i class="ring_deco"></i>
            <div class="spot_name">${d.name}</div>
            <div class="pin_pop">
                <div class="pop_inner">
                    <div class="imgbox">
                        <img src="${d.img}" alt="${d.name}">
                    </div>
                    <div class="gd_name">${d.name}</div>
                    <div class="origin">원산지 : ${d.location}</div>
                    <p class="text">${d.text}</p>
                    <a href="${d.link}" class="link_btn">자세히 보기</a>
                </div>
                <button type="button" class="close_btn">팝업닫기</button>
            </div>`;

        $(el).attr('data-no',d.no).append(popConts);
        $(el).find('svg').on('click',function() {
            $(this).parent().addClass('active').siblings('.globe_pin').removeClass('active');
            nowLat = d.lat;
            nowLng = d.lng;
            world.pointOfView({lat:nowLat-minusLat, lng:nowLng, altitude:1},500);
            world.controls().autoRotate = false;
        });
        return el;
    })
    .globeImageUrl('/data/yuhancare/inc/img/value/globeImage1.jpg')
    .bumpImageUrl('/data/yuhancare/inc/img/value/globeImage2.png')
    (document.getElementById('globeViz'));

world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.25;
world.controls().enableZoom = window.innerWidth > 1000 ? false : true;
world.pointOfView({lat:nowLat-minusLat-pcminus, lng:nowLng, altitude:nowAltitude},500);

//지형질감
const globeMaterial = world.globeMaterial();
globeMaterial.bumpScale = 10;

//광원
new THREE.TextureLoader().load('/data/yuhancare/inc/img/value/globeImage3.png', texture => {
    globeMaterial.specularMap = texture;
    globeMaterial.specular = new THREE.Color('grey');
    globeMaterial.shininess = 15;
});

//캔버스 너비조절
window.addEventListener('resize',function() {
    winInner = window.innerWidth > 2000 ? 2000 : window.innerWidth
    nowAltitude = window.innerWidth > 1000 ? 1.5 : 2;
    world.width(winInner);
});
////지구 렌더링 끝

$(function() {
    //셀렉트 여닫기
    $('.tracker_btnbox .fake_open').on('click',function() {
        if($(this).attr('title') === '열기') {
            $(this).attr('title','닫기');
            $('.tracker_btnbox .fake_select').stop(true).slideDown(250);
        } else {
            $(this).attr('title','열기');
            $('.tracker_btnbox .fake_select').stop(true).slideUp(250);
        }
    });

    //셀렉트 트래킹
    $('.tracker_btnbox .fake_select button').on('click', function() {
        var thisData = gData[$(this).parent().index()];
        nowLat = thisData.lat;
        nowLng = thisData.lng;
        world.controls().autoRotate = false;
        world.pointOfView({lat:nowLat-minusLat, lng:nowLng, altitude:1},500);

        $('.tracker_btnbox .fake_open').attr('title','열기');
        $('.tracker_btnbox .fake_select').slideUp(250);
        $('.globe_pin').removeClass('active');
        setTimeout(function() {
            $('.globe_pin[data-no="'+ thisData.no +'"]').addClass('active');
        },500);
    });

    $(document).on('click','.pin_pop .close_btn', function() {
        $(this).parents('.globe_pin').removeClass('active');
        world.controls().autoRotate = true;
        world.pointOfView({lat:nowLat-minusLat-pcminus, lng:nowLng, altitude:nowAltitude},500);
    });

    $('.zoom1').on('click',function() {
        if(nowAltitude > 0.4) {
            nowAltitude -= 0.3;
            world.pointOfView({lat:nowLat-minusLat, lng:nowLng, altitude:nowAltitude},500);
        }
    });

    $('.zoom2').on('click',function() {
        if(nowAltitude < 2) {
            nowAltitude += 0.3;
            world.pointOfView({lat:nowLat-minusLat, lng:nowLng, altitude:nowAltitude},500);
        }
    });
});

