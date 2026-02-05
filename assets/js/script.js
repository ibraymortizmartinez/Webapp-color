// Referencias al DOM
const redRange = document.getElementById('redRange');
const redInput = document.getElementById('redInput');
const badgeRed = document.getElementById('badgeRed'); // Nuevo Badge visual

const greenRange = document.getElementById('greenRange');
const greenInput = document.getElementById('greenInput');
const badgeGreen = document.getElementById('badgeGreen'); // Nuevo Badge visual

const blueRange = document.getElementById('blueRange');
const blueInput = document.getElementById('blueInput');
const badgeBlue = document.getElementById('badgeBlue'); // Nuevo Badge visual

const colorDisplay = document.getElementById('colorDisplay');
const hexOutput = document.getElementById('hexOutput');
const colorPicker = document.getElementById('colorPicker');

// --- Funciones de Conversión ---

const componentToHex = (c) => {
    const hex = parseInt(c).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

// --- Función Principal de Actualización ---

const updateColor = () => {
    const r = redRange.value;
    const g = greenRange.value;
    const b = blueRange.value;

    const colorString = `rgb(${r}, ${g}, ${b})`;
    const hexString = rgbToHex(r, g, b);

    // 1. Actualizar cuadro de color
    colorDisplay.style.backgroundColor = colorString;
    
    // 2. Actualizar Textos HEX
    hexOutput.value = hexString.toUpperCase();
    
    // 3. Actualizar Picker visual
    colorPicker.value = hexString;

    // 4. Actualizar Badges (Etiquetas pequeñas encima de los sliders)
    badgeRed.innerText = r;
    badgeGreen.innerText = g;
    badgeBlue.innerText = b;
}

// --- Sincronización Inputs <-> Sliders ---

const syncInputs = (element1, element2) => {
    let val = parseInt(element1.value);
    if (isNaN(val) || val < 0) val = 0;
    if (val > 255) val = 255;

    element1.value = val;
    element2.value = val;
    updateColor();
}

// --- Actualizar desde Picker ---

const updateFromPicker = () => {
    const rgb = hexToRgb(colorPicker.value);

    redRange.value = rgb.r;
    redInput.value = rgb.r;
    
    greenRange.value = rgb.g;
    greenInput.value = rgb.g;
    
    blueRange.value = rgb.b;
    blueInput.value = rgb.b;

    updateColor();
}

// --- Event Listeners ---

// Rojo
redRange.addEventListener('input', () => syncInputs(redRange, redInput));
redInput.addEventListener('input', () => syncInputs(redInput, redRange));

// Verde
greenRange.addEventListener('input', () => syncInputs(greenRange, greenInput));
greenInput.addEventListener('input', () => syncInputs(greenInput, greenRange));

// Azul
blueRange.addEventListener('input', () => syncInputs(blueRange, blueInput));
blueInput.addEventListener('input', () => syncInputs(blueInput, blueRange));

// Picker
colorPicker.addEventListener('input', updateFromPicker);

// Inicializar
updateColor();