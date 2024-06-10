//240404 김진솔


//시계
const flipTimerDiv = (num,index,time,type) => {
    let html = '';
    for(var i=0;i<=num;i++) {
        html += `<div class="flip-timer-piece ${time+index}_${type} flip-timer-piece-${type}">${i}</div>`;
    }
    return html;
}
const flipTimer = function(id) {
    let timerTarget = document.querySelector(id);
    timerTarget.innerHTML = `<div id="flip-timer">
        <div class="flip-timer-box flip-timer-box-hr">
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper hr_half_upper">
                    ${flipTimerDiv(2,1,'hr','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower hr_half_lower">
                    ${flipTimerDiv(2,1,'hr','lower')}
                </div>
            </div>
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper hr_half_upper">
                    ${flipTimerDiv(9,2,'hr','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower hr_half_lower">
                    ${flipTimerDiv(9,2,'hr','lower')}
                </div>
            </div>
        </div>
        <div class="flip-timer-box flip-timer-box-min">
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper min_half_upper">
                    ${flipTimerDiv(5,1,'min','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower min_half_lower">
                    ${flipTimerDiv(5,1,'min','lower')}
                </div>
            </div>
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper min_half_upper">
                    ${flipTimerDiv(9,2,'min','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower min_half_lower">
                    ${flipTimerDiv(9,2,'min','lower')}
                </div>
            </div>
        </div>
        <div class="flip-timer-box flip-timer-box-sec">
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper sec_half_upper">
                    ${flipTimerDiv(5,1,'sec','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower sec_half_lower">
                    ${flipTimerDiv(5,1,'sec','lower')}
                </div>
            </div>
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper sec_half_upper">
                    ${flipTimerDiv(9,2,'sec','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower sec_half_lower">
                    ${flipTimerDiv(9,2,'sec','lower')}
                </div>
            </div>
        </div>
    </div>`;

    let hr1Upper = timerTarget.querySelectorAll('.hr1_upper'),
        hr1Lower = timerTarget.querySelectorAll('.hr1_lower'),
        hr2Upper = timerTarget.querySelectorAll('.hr2_upper'),
        hr2Lower = timerTarget.querySelectorAll('.hr2_lower'),
        min1Upper = timerTarget.querySelectorAll('.min1_upper'),
        min1Lower = timerTarget.querySelectorAll('.min1_lower'),
        min2Upper = timerTarget.querySelectorAll('.min2_upper'),
        min2Lower = timerTarget.querySelectorAll('.min2_lower'),
        sec1Upper = timerTarget.querySelectorAll('.sec1_upper'),
        sec1Lower = timerTarget.querySelectorAll('.sec1_lower'),
        sec2Upper = timerTarget.querySelectorAll('.sec2_upper'),
        sec2Lower = timerTarget.querySelectorAll('.sec2_lower');

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

//카운트다운
const flipCounterDiv = (num,index,time,type) => {
    let ele = [],
        html = '';
    for(var i=0;i<=num;i++) {
        ele.push(`<div class="flip-timer-piece ${time+index}_${type} flip-timer-piece-${type}">${i}</div>`);
    }
    ele.reverse();
    for(var j=0;j<=num;j++) {
        html += ele[j];
    }

    return html;
}
const flipCounter = function(id, target) {
    let conterTarget = document.querySelector(id),
        targetTime = new Date(target);
    conterTarget.innerHTML = `<div id="flip-timer">
        <div class="flip-timer-box flip-timer-box-day">
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper day_half_upper">
                    ${flipCounterDiv(9,1,'day','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower day_half_lower">
                    ${flipCounterDiv(9,1,'day','lower')}
                </div>
            </div>
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper day_half_upper">
                    ${flipCounterDiv(9,2,'day','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower day_half_lower">
                    ${flipCounterDiv(9,2,'day','lower')}
                </div>
            </div>
        </div>
        <div class="flip-timer-box flip-timer-box-hr">
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper hr_half_upper">
                    ${flipCounterDiv(2,1,'hr','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower hr_half_lower">
                    ${flipCounterDiv(2,1,'hr','lower')}
                </div>
            </div>
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper hr_half_upper">
                    ${flipCounterDiv(9,2,'hr','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower hr_half_lower">
                    ${flipCounterDiv(9,2,'hr','lower')}
                </div>
            </div>
        </div>
        <div class="flip-timer-box flip-timer-box-min">
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper min_half_upper">
                    ${flipCounterDiv(5,1,'min','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower min_half_lower">
                    ${flipCounterDiv(5,1,'min','lower')}
                </div>
            </div>
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper min_half_upper">
                    ${flipCounterDiv(9,2,'min','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower min_half_lower">
                    ${flipCounterDiv(9,2,'min','lower')}
                </div>
            </div>
        </div>
        <div class="flip-timer-box flip-timer-box-sec">
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper sec_half_upper">
                    ${flipCounterDiv(5,1,'sec','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower sec_half_lower">
                    ${flipCounterDiv(5,1,'sec','lower')}
                </div>
            </div>
            <div class="flip-timer-num">
                <div class="flip-timer-half flip-timer-half-upper sec_half_upper">
                    ${flipCounterDiv(9,2,'sec','upper')}
                </div>
                <div class="flip-timer-half flip-timer-half-lower sec_half_lower">
                    ${flipCounterDiv(9,2,'sec','lower')}
                </div>
            </div>
        </div>
    </div>`;

    let day1Upper = conterTarget.querySelectorAll('.day1_upper'),
        day1Lower = conterTarget.querySelectorAll('.day1_lower'),
        day2Upper = conterTarget.querySelectorAll('.day2_upper'),
        day2Lower = conterTarget.querySelectorAll('.day2_lower'),
        hr1Upper = conterTarget.querySelectorAll('.hr1_upper'),
        hr1Lower = conterTarget.querySelectorAll('.hr1_lower'),
        hr2Upper = conterTarget.querySelectorAll('.hr2_upper'),
        hr2Lower = conterTarget.querySelectorAll('.hr2_lower'),
        min1Upper = conterTarget.querySelectorAll('.min1_upper'),
        min1Lower = conterTarget.querySelectorAll('.min1_lower'),
        min2Upper = conterTarget.querySelectorAll('.min2_upper'),
        min2Lower = conterTarget.querySelectorAll('.min2_lower'),
        sec1Upper = conterTarget.querySelectorAll('.sec1_upper'),
        sec1Lower = conterTarget.querySelectorAll('.sec1_lower'),
        sec2Upper = conterTarget.querySelectorAll('.sec2_upper'),
        sec2Lower = conterTarget.querySelectorAll('.sec2_lower');

    let nowTime = new Date();

    if(nowTime < targetTime) {
        let gapTime = targetTime.getTime() - nowTime.getTime(),
            gapDay = Math.floor(gapTime/1000/60/60/24),
            gapHr = Math.floor(gapTime/1000/60/60) - (gapDay*24),
            gapMin = Math.floor(gapTime/1000/60) - (gapHr*60) - (gapDay*60*24),
            gapSec = Math.floor(gapTime/1000) - (gapMin*60) - (gapHr*60*60) - (gapDay*60*60*24),
            day1 = Math.floor(gapDay/10),
            day2 = gapDay % 10,
            hr1 = Math.floor(gapHr/10),
            hr2 = gapHr % 10,
            min1 = Math.floor(gapMin/10),
            min2 = gapMin % 10,
            sec1 = Math.floor(gapSec/10),
            sec2 = gapSec % 10;

        let prevDay, prevHr, prevMin, prevSec;

        const flipTimerTik = function(arr, time, txt) {
            arr.forEach((v,i) => {
                if(arr[0].className.includes('upper')) {
                    arr[i].className = `flip-timer-piece flip-timer-piece-upper ${txt}_upper`;
                } else {
                    arr[i].className = `flip-timer-piece flip-timer-piece-lower ${txt}_lower`;
                }
            });

            let timeSet = arr.length - time - 1;

            arr[timeSet].classList.add('flip-timer-piece-active');
            if(timeSet == arr.length-1) {
                arr[timeSet - 1].classList.add('flip-timer-piece-prev');
                arr[0].classList.add('flip-timer-piece-next');
            } else if(timeSet == 0) {
                arr[arr.length-1].classList.add('flip-timer-piece-prev');
                arr[timeSet + 1].classList.add('flip-timer-piece-next');
            } else {
                arr[timeSet - 1].classList.add('flip-timer-piece-prev');
                arr[timeSet + 1].classList.add('flip-timer-piece-next');
            }
        }

        const filpCount = function() {
            nowTime = new Date();
            gapTime = targetTime.getTime() - nowTime.getTime();
            gapDay = Math.floor(gapTime/1000/60/60/24);
            gapHr = Math.floor(gapTime/1000/60/60) - (gapDay*24);
            gapMin = Math.floor(gapTime/1000/60) - (gapHr*60) - (gapDay*60*24);
            gapSec = Math.floor(gapTime/1000) - (gapMin*60) - (gapHr*60*60) - (gapDay*60*60*24);

            if(prevDay != gapDay) {
                day1 = Math.floor(gapDay/10);
                day2 = gapDay % 10;
                flipTimerTik(day1Upper, day1, 'day1');
                flipTimerTik(day1Lower, day1, 'day1');
                flipTimerTik(day2Upper, day2, 'day2');
                flipTimerTik(day2Lower, day2, 'day2');
                prevDay = gapDay;
            }

            if(prevHr != gapHr) {
                hr1 = Math.floor(gapHr/10);
                hr2 = gapHr % 10;
                flipTimerTik(hr1Upper, hr1, 'hr1');
                flipTimerTik(hr1Lower, hr1, 'hr1');
                flipTimerTik(hr2Upper, hr2, 'hr2');
                flipTimerTik(hr2Lower, hr2, 'hr2');
                prevHr = gapHr;
            }

            if(prevMin != gapMin) {
                min1 = Math.floor(gapMin/10);
                min2 = gapMin % 10;
                flipTimerTik(min1Upper, min1, 'min1');
                flipTimerTik(min1Lower, min1, 'min1');
                flipTimerTik(min2Upper, min2, 'min2');
                flipTimerTik(min2Lower, min2, 'min2');
                prevMin = gapMin;
            }

            sec1 = Math.floor(gapSec/10);
            sec2 = gapSec % 10;
            if(prevSec != sec1) {
                flipTimerTik(sec1Upper, sec1, 'sec1');
                flipTimerTik(sec1Lower, sec1, 'sec1');
                prevSec = sec1;
            }
            flipTimerTik(sec2Upper, sec2, 'sec2');
            flipTimerTik(sec2Lower, sec2, 'sec2');
        }
        filpCount();

        const countInterval = setInterval(() => {
            filpCount();
            if(gapTime < 1000) clearInterval(countInterval);
        },1000);
    } else {
        conterTarget.querySelectorAll('.flip-timer-piece:last-child').forEach((v,i) => {v.classList.add('flip-timer-piece-active');})
    }
}