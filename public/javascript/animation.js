var slides = document.querySelectorAll(".slides");
var buttons = document.querySelectorAll(".navSlide");
var display= document.querySelectorAll(".details");
var slideSwip = function (manual) {
    buttons.forEach((button) => {
        button.classList.remove("active");
    })
    display.forEach((dis)=>{
        dis.classList.remove("reveal");
    })
    slides.forEach((slide) => {
        slide.classList.remove("active");
    })
    slides[manual].classList.add("active");
    buttons[manual].classList.add("active");
    display[manual].classList.add("reveal");
}
buttons.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        slideSwip(i);
    })
})
// comedySlide
var comList;
var comBtnL = document.querySelector("#pre");
var comBtnR = document.querySelector("#nxt");
var change = function () {
    document.getElementById("comedy").append(comList[0]);
};
var changeR = function () {
    document.getElementById("comedy").prepend(comList[comList.length - 1]);
};
comBtnL.addEventListener("click", () => {
    comList = document.querySelectorAll(".comList");
    change();
})
comBtnR.addEventListener("click", () => {
    comList = document.querySelectorAll(".comList");
    changeR();
})
var advList;
var advBtnL = document.querySelector("#preA");
var advBtnR = document.querySelector("#nxtA");
var changeA = function () {
    document.getElementById("adventure").append(advList[0]);
};
var changeRa = function () {
    document.getElementById("adventure").prepend(advList[advList.length - 1]);
};
advBtnL.addEventListener("click", () => {
    advList = document.querySelectorAll(".advList");
    changeA();
})
advBtnR.addEventListener("click", () => {
    advList = document.querySelectorAll(".advList");
    changeRa();
})
var romList;
var romBtnL = document.querySelector("#preR");
var romBtnR = document.querySelector("#nxtR");
var changeRo = function () {
    document.getElementById("romance").append(romList[0]);
};
var changeRr = function () {
    document.getElementById("romance").prepend(romList[romList.length - 1]);
};
romBtnL.addEventListener("click", () => {
    romList = document.querySelectorAll(".romList");
    changeRo();
})
romBtnR.addEventListener("click", () => {
    romList = document.querySelectorAll(".romList");
    changeRr();
})
var horList;
var horBtnL = document.querySelector("#preH");
var horBtnR = document.querySelector("#nxtH");
var changeH = function () {
    document.getElementById("horror").append(horList[0]);
};
var changeRh = function () {
    document.getElementById("horror").prepend(horList[horList.length - 1]);
};
horBtnL.addEventListener("click", () => {
    horList = document.querySelectorAll(".horList");
    changeH();
})
horBtnR.addEventListener("click", () => {
    horList = document.querySelectorAll(".horList");
    changeRh();
})

