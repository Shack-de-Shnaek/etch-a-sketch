const container = document.querySelector('.cell-container');
const sizeSlider = document.querySelector('#grid-size-slider');
const sizeLabel = document.querySelector('#grid-size-value');
const colorSelector = document.querySelector('#color-selector');

let eraseOn = false;
let rainbowOn = false;
let hue = 1;

sizeSlider.oninput = function () {
    sizeLabel.innerHTML = `${this.value} x ${this.value}`;
}

sizeSlider.onmouseup = function () {
    generateCells();
}

const generateCells = () => {
    container.innerHTML = '';
    container.style['grid-template-columns'] = `repeat(${sizeSlider.value}, auto)`;
    container.style['grid-template-rows'] = `repeat(${sizeSlider.value}, auto)`;
    for (let x = 0; x < sizeSlider.value; x++) {
        for (let y = 0; y < sizeSlider.value; y++) {
            let element = document.createElement('div');
            element.classList.add('cell');
            element.setAttribute('id', `cell-${y+1}-${x+1}`);
            element.onmouseover = () => paintCell(element);
            container.appendChild(element);
        }
    }
    console.log('cells generated');
}

const paintCell = (element) => {
    if (eraseOn) element.style['background-color'] = '#ffffff';
    else if (rainbowOn) {
        element.style['background-color'] = `hsl(${hue}, 100%, 50%)`;
        if (hue+2 < 360) hue += 2;
        else hue = 1;
    }
    else element.style['background-color'] = colorSelector.value;
}

document.querySelector('#erase-button').onclick = function() {
    if (eraseOn) {
        this.style['background-color'] = '#2f2f2f';
        eraseOn = false;
    }
    else {
        this.style['background-color'] = '#3d98ff';
        eraseOn = true;
    }
    console.log(`eraser ${eraseOn}`);
}

document.querySelector('#rainbow-button').onclick = function() {
    if (rainbowOn) {
        this.style['background-color'] = '#2f2f2f';
        rainbowOn = false;
    }
    else {
        this.style['background-color'] = '#3d98ff';
        rainbowOn = true;
    }
    console.log(`rainbow ${rainbowOn}`);
}