const DEFAULT_SIZE = 16;


let gridSize = DEFAULT_SIZE;
let gridMode = true;
let eraserMode = false;
let gridColor = "black";


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
        grid.style.gridGap = "0px"; 
        gridMode =false;
    }
    else {
        grid.style.gridGap = "1px";
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
            break;
        case true:
            eraserMode = false;
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
    resetGrid();
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

    e.target.style.backgroundColor = gridColor;
    console.log(e.type);
}

setUpGrid(gridSize);

