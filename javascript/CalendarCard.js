const mainDisplay = document.getElementById("main-display");
const sub1 = document.getElementById("sub-display-1");
const sub2 = document.getElementById("sub-display-2");
const sub3 = document.getElementById("sub-display-3");

const labelMain = document.getElementById("label-main");
const labelSub1 = document.getElementById("label-sub1");
const labelSub2 = document.getElementById("label-sub2");

const btnView = document.getElementById("btn-view");
const btnColor = document.getElementById("btn-color");
const displayArea = document.getElementById("displayArea");
const brightnessSlider = document.getElementById("brightness-slider");

const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const allMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

let mode = "CALENDAR";
let colorIndex = 0;
const themes = ["", "theme-green", "theme-teal", "theme-red"]; 

function updateData() {
    const now = new Date();

    if (mode === "CALENDAR") {
        const dateNum = (now.getDate() < 10 ? "0" : "") + now.getDate();
        
        mainDisplay.innerHTML = dateNum;
        sub1.innerHTML = weekDays[now.getDay()];
        sub2.innerHTML = allMonths[now.getMonth()];
        sub3.innerHTML = now.getFullYear();

        labelMain.innerText = "DATE_MOD";
        labelSub1.innerText = "DAY_CYCLE";
        labelSub2.innerText = "MNTH_SEL";

    } else {
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        const ampm = now.getHours() >= 12 ? "PM" : "AM";

        mainDisplay.innerHTML = `${hrs}:${mins}`;
        sub1.innerHTML = secs;
        sub2.innerHTML = ampm;
        sub3.innerHTML = now.getFullYear(); 
        labelMain.innerText = "TIME_SYS";
        labelSub1.innerText = "SEC_TICK";
        labelSub2.innerText = "MERIDIAN";
    }
}

function triggerGlitch() {
    displayArea.classList.remove("glitch-active");
    void displayArea.offsetWidth; 
    displayArea.classList.add("glitch-active");
}

btnView.addEventListener("click", () => {
    triggerGlitch();
    mode = mode === "CALENDAR" ? "CLOCK" : "CALENDAR";
    updateData();
});

btnColor.addEventListener("click", () => {
    colorIndex = (colorIndex + 1) % themes.length;
    
    document.body.classList.remove("theme-green", "theme-teal", "theme-red");
    
    if (themes[colorIndex]) {
        document.body.classList.add(themes[colorIndex]);
    }
});

brightnessSlider.addEventListener("input", (e) => {
    document.documentElement.style.setProperty('--brightness', e.target.value);
});

updateData();