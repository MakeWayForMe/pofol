//240404 김진솔

const flipDiv = (num,index,time,type) => {
    let html = '';
    for(var i=0;i<=num;i++) {
        html += `<div class="flip-timer-piece ${time+index}_${type} flip-timer-piece-${type}">${i}</div>`
    }
    return html;
}
const flipTimer = function(id) {
    document.querySelector(id).innerHTML = `<div id="flip-timer">
        <div class="flip-timer-box flip-timer-box-hr">
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper hr_half_upper">
                    ${flipDiv(2,1,'hr','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower hr_half_lower">
                    ${flipDiv(2,1,'hr','lower')}
                </div>
            </div>
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper hr_half_upper">
                    ${flipDiv(9,2,'hr','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower hr_half_lower">
                    ${flipDiv(9,2,'hr','lower')}
                </div>
            </div>
        </div>
        <div class="flip-timer-box flip-timer-box-min">
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper min_half_upper">
                    ${flipDiv(5,1,'min','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower min_half_lower">
                    ${flipDiv(5,1,'min','lower')}
                </div>
            </div>
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper min_half_upper">
                    ${flipDiv(9,2,'min','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower min_half_lower">
                    ${flipDiv(9,2,'min','lower')}
                </div>
            </div>
        </div>
        <div class="flip-timer-box flip-timer-box-sec">
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper sec_half_upper">
                    ${flipDiv(5,1,'sec','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower sec_half_lower">
                    ${flipDiv(5,1,'sec','lower')}
                </div>
            </div>
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper sec_half_upper">
                    ${flipDiv(9,2,'sec','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower sec_half_lower">
                    ${flipDiv(9,2,'sec','lower')}
                </div>
            </div>
        </div>
    </div>`;
}

window.onload = () => {
    let hr1Upper = document.querySelectorAll('.hr1_upper'),
        hr1Lower = document.querySelectorAll('.hr1_lower'),
        hr2Upper = document.querySelectorAll('.hr2_upper'),
        hr2Lower = document.querySelectorAll('.hr2_lower'),
        min1Upper = document.querySelectorAll('.min1_upper'),
        min1Lower = document.querySelectorAll('.min1_lower'),
        min2Upper = document.querySelectorAll('.min2_upper'),
        min2Lower = document.querySelectorAll('.min2_lower'),
        sec1Upper = document.querySelectorAll('.sec1_upper'),
        sec1Lower = document.querySelectorAll('.sec1_lower'),
        sec2Upper = document.querySelectorAll('.sec2_upper'),
        sec2Lower = document.querySelectorAll('.sec2_lower');

    let nowTime = new Date(),
        nowHr = nowTime.getHours(),
        nowMin = nowTime.getMinutes(),
        nowSec = nowTime.getSeconds(),
        hr1 = Math.floor(nowHr/10),
        hr2 = nowHr % 10,
        min1 = Math.floor(nowMin/10),
        min2 = nowMin % 10,
        sec1 = Math.floor(nowSec/10),
        sec2 = nowSec % 10;

    let prevHr, prevMin, prevSec;

    const flipTimerTik = function(arr, time, txt) {
        arr.forEach((v,i) => {
            if(arr[0].className.includes('upper')) {
                arr[i].className = `flip-timer-piece flip-timer-piece-upper ${txt}_upper`;
            } else {
                arr[i].className = `flip-timer-piece flip-timer-piece-lower ${txt}_lower`;
            }
        });

        arr[time].classList.add('flip-timer-piece-active');
        if(time == arr.length-1) {
            arr[time - 1].classList.add('flip-timer-piece-prev');
            arr[0].classList.add('flip-timer-piece-next');
        } else if(time == 0) {
            arr[arr.length-1].classList.add('flip-timer-piece-prev');
            arr[time + 1].classList.add('flip-timer-piece-next');
        } else {
            arr[time - 1].classList.add('flip-timer-piece-prev');
            arr[time + 1].classList.add('flip-timer-piece-next');
        }
    }

    const filpCount = function() {
        nowTime = new Date();
        nowHr = nowTime.getHours();
        nowMin = nowTime.getMinutes();
        nowSec = nowTime.getSeconds();

        if(prevHr != nowHr) {
            hr1 = Math.floor(nowHr/10);
            hr2 = nowHr % 10;
            flipTimerTik(hr1Upper, hr1, 'hr1');
            flipTimerTik(hr1Lower, hr1, 'hr1');
            flipTimerTik(hr2Upper, hr2, 'hr2');
            flipTimerTik(hr2Lower, hr2, 'hr2');
            prevHr = nowHr;
        }

        if(prevMin != nowMin) {
            min1 = Math.floor(nowMin/10);
            min2 = nowMin % 10;
            flipTimerTik(min1Upper, min1, 'min1');
            flipTimerTik(min1Lower, min1, 'min1');
            flipTimerTik(min2Upper, min2, 'min2');
            flipTimerTik(min2Lower, min2, 'min2');
            prevMin = nowMin;
        }

        sec1 = Math.floor(nowSec/10);
        sec2 = nowSec % 10;
        if(prevSec != sec1) {
            flipTimerTik(sec1Upper, sec1, 'sec1');
            flipTimerTik(sec1Lower, sec1, 'sec1');
            prevSec = sec1;
        }
        flipTimerTik(sec2Upper, sec2, 'sec2');
        flipTimerTik(sec2Lower, sec2, 'sec2');
    }
    filpCount();

    setInterval(() => {
        filpCount();
    },1000);
}
