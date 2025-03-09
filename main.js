let section = document.querySelector("section");
let headSneck = document.querySelector(".head");
let food = document.querySelector(".food");
let titlePoints = document.querySelector(".title-points");
let bodyParts = [];

let body = document.createElement("div");
body.classList.add("body");
bodyParts.push(body); // i want show first div

let stateSneckWalk = [];

let contentGameOver = `
    <section class="sec-game-over">
        <h2>Game over</h2>
        <div>
            <h3>Your food => <span class="playerFood">34</span> </h3>
        </div>
        <button class="btnAgain">Again</button>
        <h3> If it doesn't work , try reloading </h3>
    </section>
`
// ======= //
let styleSection = window.getComputedStyle(section);
let rowsSection = +styleSection.getPropertyValue("grid-template-rows").split(" ").length;  // the getPropertyValue( ) return string value
let columnsSection = styleSection.getPropertyValue("grid-template-columns").split(" ").length;
// ======= //
let styleHead = window.getComputedStyle(headSneck);
let locationHeadRow = +styleHead.getPropertyValue("grid-row-start");
let locationHeadColumn = +styleHead.getPropertyValue("grid-column-start");
// ======= //
let styleFood = window.getComputedStyle(food);
// ======= //
let keyList = ["w" , "s" , "d" , "a" , "W" , "S" , "D" , "A" , "ص" , "س" , "ي" , "ش"];
let checkKey = "";
let clearTheInterval;
let countPoint = 0;
// =================================== //
window.addEventListener("keydown" , function(e){
    for (let i = 0; i < keyList.length; i++) {
        if(e.key == keyList[i] && e.key != checkKey){
            walkSneck( keyList[i] );
        }
    }
})

function walkSneck(theKey){

    clearInterval(clearTheInterval);
    checkKey = theKey;

    clearTheInterval = setInterval(() => {
        if (theKey == "w" || theKey == "W"  || theKey == "ص") {
            headSneck.style.gridRowStart = --locationHeadRow;
        }
        else if(theKey == "s" || theKey == "S"  || theKey == "س"){
            headSneck.style.gridRowStart = ++locationHeadRow;
        }
        else if(theKey == "d" || theKey == "D"  || theKey == "ي"){
            headSneck.style.gridColumnStart = ++locationHeadColumn;
        }
        else if(theKey == "a" || theKey == "A"  || theKey == "ش"){
            headSneck.style.gridColumnStart = --locationHeadColumn;
        }
        gemeOver();
        randomFood();
        moveBody();
    }, 70);
}

function gemeOver(){
    if (locationHeadRow == 1 || locationHeadRow == rowsSection + 1  
        || locationHeadColumn == 0 || locationHeadColumn == columnsSection + 1) {
            section.innerHTML = contentGameOver;
            getElement();
    }
}

function getElement(){
    let playerFood = document.querySelector(".playerFood");
    let btnAgain = document.querySelector(".btnAgain");
    playerFood.innerHTML = countPoint;
    btnAgain.onclick = function(){
        location.reload();
    }
}

function randomFood() {

    let locationFoodRow = +styleFood.getPropertyValue("grid-row-start");
    let locationFoodColumn = +styleFood.getPropertyValue("grid-column-start");

    if (locationHeadRow == locationFoodRow && 
        locationHeadColumn == locationFoodColumn) {

        locationFoodRow = Math.floor(Math.random() * rowsSection);
        locationFoodColumn = Math.floor(Math.random() * columnsSection);


        if (locationFoodRow == 1 || locationFoodRow == 0 ) {
            locationFoodRow = 2;
        }

        food.style.gridRowStart = locationFoodRow;
        food.style.gridColumnStart = locationFoodColumn;
        bodySneck();

        countPoint++;
        titlePoints.innerHTML = countPoint;
    }
}

function bodySneck() {
    let body = document.createElement("div");
    body.classList.add("body");
    bodyParts.push(body);
    section.appendChild(body);
}

function moveBody(){
    let obj = {row:locationHeadRow  , column:locationHeadColumn };
    stateSneckWalk.unshift(obj);

    for (let i = 0; i < bodyParts.length; i++) {
        bodyParts[i].style.gridRowStart = stateSneckWalk[i].row;
        bodyParts[i].style.gridColumnStart = stateSneckWalk[i].column;
    }
}

window.addEventListener("contextmenu" , function(e){
    e.preventDefault()
});

window.addEventListener("keydown", function(e){
    if (e.key == "F12") {
        e.preventDefault()
    }
});