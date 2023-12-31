const DEFAULT_SIZE = 16;


let gridSize = DEFAULT_SIZE;
let gridMode = true;
let eraserMode = false;
let gridColor = "black";
const eraserColor = "white";


let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

const grid = document.getElementById('grid');
const gridbtn = document.getElementById('gridbtn');
const eraserbtn = document.getElementById('eraserbtn');
const clearbtn = document.getElementById('clearbtn');
const colorPicker = document.getElementById('colorPicker');
const sizeSlider = document.getElementById('sizeSlider');
const gridDimension = document.getElementById('gridDimension');




gridbtn.addEventListener('click', toggleGridGap);
clearbtn.addEventListener('click',resetGrid);
eraserbtn.addEventListener('click', eraserToggle);
colorPicker.addEventListener('input', setGridColor);
sizeSlider.addEventListener('click', updateGridSize);


function toggleGridGap() {
    if (gridMode){
        grid.style.gridGap = "1px"; 
        grid.style.border = "1px solid black"; 
        gridbtn.classList.add('btn-on')
        gridMode =false;
    }
    else {
        grid.style.gridGap = "0px";
        grid.style.border = "0px"; 
        gridbtn.classList.remove('btn-on')
        gridMode = true;
    }
}

function resetGrid(){
    grid.innerHTML = '';
    setUpGrid(gridSize);
}

function eraserToggle() {
    switch (eraserMode) {
        case false:
            eraserMode = true;
            eraserbtn.classList.add('btn-on')
            break;
        case true:
            eraserMode = false;
            eraserbtn.classList.remove('btn-on')

            break;
    }
}

function setGridColor(e) {
    const color = e.target.value;
    gridColor = color;
}

function updateGridSize(e){
    console.log(e.type);
    gridSize = e.target.value;
    updateGridDimension(gridSize);
    resetGrid();
}


function updateGridDimension(size){
    gridDimension.innerHTML = `${size} x ${size}`;
}

function setUpGrid(num) {
    grid.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${num}, 1fr)`;

    for (let i = 0; i < num*num; i++){
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener("mousedown", changeGridColor);
        gridElement.addEventListener("mouseover", changeGridColor);
        grid.appendChild(gridElement);
    }
}

function changeGridColor(e) {
    if (e.type === "mouseover" & mouseDown === false) return;

    switch (eraserMode){
        case true:
            e.target.style.backgroundColor = eraserColor;
            break;
        case false:
            e.target.style.backgroundColor = gridColor;
            break;
    }
}

setUpGrid(gridSize);


