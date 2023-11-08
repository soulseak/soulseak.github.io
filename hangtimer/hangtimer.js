"use strict";
class hangtimer {
    duration = 30;
    sets = 3;
    breakTime = 10;
    playAudio = true;
    constructor() {
        let storedDuration = sessionStorage.getItem("duration");
        if (storedDuration) {
            this.duration = parseInt(storedDuration);
        }
        else {
            sessionStorage.setItem("duration", this.duration.toString());
        }
        let storedSets = sessionStorage.getItem("sets");
        if (storedSets) {
            this.sets = parseInt(storedSets);
        }
        else {
            sessionStorage.setItem("sets", this.sets.toString());
        }
        let storedBreakTime = sessionStorage.getItem("breakTime");
        if (storedBreakTime) {
            this.breakTime = parseInt(storedBreakTime);
        }
        else {
            sessionStorage.setItem("breakTime", this.breakTime.toString());
        }
        let storedAudio = sessionStorage.getItem("playAudio");
        if (storedAudio != null) {
            this.playAudio = Boolean(JSON.parse(storedAudio));
        }
        else {
            sessionStorage.setItem("playAudio", this.playAudio.toString());
        }
    }
    setDuration(duration) {
        if (duration > 0) {
            this.duration = duration;
            sessionStorage.setItem("duration", this.duration.toString());
        }
    }
    setSets(sets) {
        if (sets > 0) {
            this.sets = sets;
            sessionStorage.setItem("sets", this.sets.toString());
        }
    }
    setBreakTime(breakTime) {
        if (breakTime > 0) {
            this.breakTime = breakTime;
            sessionStorage.setItem("breakTime", this.breakTime.toString());
        }
    }
    setPlayAudio(playAudio) {
        this.playAudio = playAudio;
        sessionStorage.setItem("playAudio", this.playAudio.toString());
    }
    getPlayAudio() {
        return this.playAudio;
    }
    getDuration() {
        return this.duration;
    }
    getSets() {
        return this.sets;
    }
    getBreakTime() {
        return this.breakTime;
    }
}
let myHangtimer = new hangtimer();
function reset() {
    myHangtimer = new hangtimer();
    let eStartButton = document.getElementById('start-btn');
    let eDuration = document.getElementById('duration');
    let eSets = document.getElementById('sets');
    let eBreak = document.getElementById('break');
    let eAudio = document.getElementById('audio');
    eStartButton.innerHTML = 'Start';
    eDuration.innerHTML = myHangtimer.getDuration().toString();
    eSets.innerHTML = myHangtimer.getSets().toString();
    eBreak.innerHTML = myHangtimer.getBreakTime().toString();
    eAudio.checked = myHangtimer.getPlayAudio();
    setTimerText(0, "Done");
}
function setTimerText(timeLeft, kind) {
    let timerText = document.getElementById('timerText');
    let timerValue = document.getElementById('timerValue');
    timerText.innerHTML = kind;
    timerValue.innerHTML = timeLeft.toString();
    switch (kind) {
        case 'Done':
            document.body.style.backgroundColor = "transparent";
            document.body.style.backgroundImage = 'url("pictures/background.png")';
            break;
        case 'Halten':
            document.body.style.backgroundColor = "DarkGreen";
            document.body.style.backgroundImage = "none";
            break;
        case 'Pause':
            document.body.style.backgroundColor = "GoldenRod";
            document.body.style.backgroundImage = "none";
            break;
    }
}
function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
function setAudio() {
    myHangtimer.setPlayAudio(document.getElementById('audio').checked);
}
function increaseValue(field) {
    switch (field) {
        case 'duration':
            myHangtimer.setDuration(myHangtimer.getDuration() + 1);
            let eDuration = document.getElementById('duration');
            eDuration.innerHTML = myHangtimer.getDuration().toString();
            break;
        case 'sets':
            myHangtimer.setSets(myHangtimer.getSets() + 1);
            let eSets = document.getElementById('sets');
            eSets.innerHTML = myHangtimer.getSets().toString();
            break;
        case 'break':
            myHangtimer.setBreakTime(myHangtimer.getBreakTime() + 1);
            let eBreak = document.getElementById('break');
            eBreak.innerHTML = myHangtimer.getBreakTime().toString();
            break;
    }
}
function decreaseValue(field) {
    switch (field) {
        case 'duration':
            myHangtimer.setDuration(myHangtimer.getDuration() - 1);
            let eDuration = document.getElementById('duration');
            eDuration.innerHTML = myHangtimer.getDuration().toString();
            break;
        case 'sets':
            myHangtimer.setSets(myHangtimer.getSets() - 1);
            let eSets = document.getElementById('sets');
            eSets.innerHTML = myHangtimer.getSets().toString();
            break;
        case 'break':
            myHangtimer.setBreakTime(myHangtimer.getBreakTime() - 1);
            let eBreak = document.getElementById('break');
            eBreak.innerHTML = myHangtimer.getBreakTime().toString();
            break;
    }
}
async function startTimer() {
    let audio_youdidit = new Audio('audio/youdidit.mp3');
    let audio_duck = new Audio('audio/duckquack.mp3');
    let startBtn = document.getElementById('start-btn');
    if (startBtn.innerHTML == 'Start') {
        startBtn.innerHTML = 'Abbrechen';
        var setsLeft = myHangtimer.getSets();
        while (setsLeft > 0) {
            var timeLeft = myHangtimer.getDuration();
            while (timeLeft >= 0) {
                setTimerText(timeLeft, "Halten");
                await delay(1000);
                timeLeft--;
            }
            setsLeft--;
            if (myHangtimer.getPlayAudio() && setsLeft > 0) {
                audio_duck.pause();
                audio_duck.currentTime = 0;
                audio_duck.play();
                await delay(1000);
            }
            timeLeft = myHangtimer.getBreakTime();
            while (timeLeft >= 0 && setsLeft > 0) {
                setTimerText(timeLeft, "Pause");
                await delay(1000);
                timeLeft--;
            }
            if (myHangtimer.getPlayAudio() && setsLeft > 0) {
                audio_duck.pause();
                audio_duck.currentTime = 0;
                audio_duck.play();
                await delay(1000);
            }
        }
        if (myHangtimer.getPlayAudio()) {
            audio_duck.pause();
            audio_duck.currentTime = 0;
            audio_youdidit.pause();
            audio_youdidit.currentTime = 0;
            audio_youdidit.play();
            await delay(1000);
        }
        reset();
    }
    else {
        location.reload();
    }
}
