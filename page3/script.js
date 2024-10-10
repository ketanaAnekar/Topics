// Get DOM elements
const canvas = document.getElementById('stickerCanvas');
const ctx = canvas.getContext('2d');
const shapeSelect = document.getElementById('shapeSelect');
const shapeSizeSlider = document.getElementById('shapeSizeSlider');
const borderThicknessSlider = document.getElementById('borderThicknessSlider');
const fillColorPicker = document.getElementById('fillColorPicker');
const borderColorPicker = document.getElementById('borderColorPicker');
const patternSelect = document.getElementById('patternSelect');
const patternColorPicker = document.getElementById('patternColorPicker');
const textInput = document.getElementById('textInput');
const textSizeSlider = document.getElementById('textSizeSlider');
const fontSelect = document.getElementById('fontSelect');
const textColorPicker = document.getElementById('textColorPicker');
const glowSlider = document.getElementById('glowSlider');
const glitchSlider = document.getElementById('glitchSlider');
const backgroundColorPicker = document.getElementById('backgroundColorPicker');
const saveButton = document.getElementById('saveButton');

// Draw sticker
function drawSticker() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas background
    ctx.fillStyle = backgroundColorPicker.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set glow effect
    ctx.shadowColor = 'white';
    ctx.shadowBlur = glowSlider.value;

    // Set shape properties
    ctx.lineWidth = borderThicknessSlider.value;
    ctx.strokeStyle = borderColorPicker.value;
    ctx.fillStyle = fillColorPicker.value;

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    const shapeSize = shapeSizeSlider.value;

    // Draw shape
    if (shapeSelect.value === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, shapeSize / 2, 0, 2 * Math.PI);
        ctx.closePath();
    } else if (shapeSelect.value === 'square') {
        ctx.beginPath();
        ctx.rect(-shapeSize / 2, -shapeSize / 2, shapeSize, shapeSize);
        ctx.closePath();
    } else if (shapeSelect.value === 'triangle') {
        ctx.beginPath();
        ctx.moveTo(0, -shapeSize / 2);
        ctx.lineTo(shapeSize / 2, shapeSize / 2);
        ctx.lineTo(-shapeSize / 2, shapeSize / 2);
        ctx.closePath();
    }

    ctx.fill();
    ctx.stroke();

    // Apply pattern
    applyPattern(shapeSize);

    // Apply glitch effect
    applyGlitchEffect();

    ctx.restore();

    // Draw text
    ctx.font = `${textSizeSlider.value}px ${fontSelect.value}`;
    ctx.fillStyle = textColorPicker.value;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(textInput.value, canvas.width / 2, canvas.height / 2);
}

// Apply pattern
function applyPattern(size) {
    const patternColor = patternColorPicker.value;
    ctx.fillStyle = patternColor;

    if (patternSelect.value === 'stripes') {
        for (let i = -size / 2; i < size / 2; i += 20) {
            ctx.fillRect(i, -size / 2, 10, size);
        }
    } else if (patternSelect.value === 'dots') {
        for (let i = -size / 2; i < size / 2; i += 20) {
            for (let j = -size / 2; j < size / 2; j += 20) {
                ctx.beginPath();
                ctx.arc(i, j, 5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    } else if (patternSelect.value === 'grid') {
        for (let i = -size / 2; i < size / 2; i += 20) {
            ctx.fillRect(i, -size / 2, 5, size);
            ctx.fillRect(-size / 2, i, size, 5);
        }
    }
}

// Apply glitch effect
function applyGlitchEffect() {
    if (glitchSlider.value > 0) {
        const glitchAmount = glitchSlider.value;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Randomly alter pixel values
        for (let i = 0; i < imageData.data.length; i += 4 * glitchAmount) {
            const pixelIndex = i + Math.floor(Math.random() * 4);
            imageData.data[pixelIndex] = 255;
        }

        ctx.putImageData(imageData, 0, 0);
    }
}

// Save sticker
function saveSticker() {
    const link = document.createElement('a');
    link.download = 'sticker.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Event listeners
shapeSelect.addEventListener('change', drawSticker);
shapeSizeSlider.addEventListener('input', drawSticker);
borderThicknessSlider.addEventListener('input', drawSticker);
fillColorPicker.addEventListener('input', drawSticker);
borderColorPicker.addEventListener('input', drawSticker);
patternSelect.addEventListener('change', drawSticker);
patternColorPicker.addEventListener('input', drawSticker);
textInput.addEventListener('input', drawSticker);
textSizeSlider.addEventListener('input', drawSticker);
fontSelect.addEventListener('change', drawSticker);
textColorPicker.addEventListener('input', drawSticker);
glowSlider.addEventListener('input', drawSticker);
glitchSlider.addEventListener('input', drawSticker);
backgroundColorPicker.addEventListener('input', drawSticker);
saveButton.addEventListener('click', saveSticker);

// Initial drawing
drawSticker();

const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('click', () => {
    if (sidebar.style.right === '0px') {
        sidebar.style.right = '-300px'; // Close the sidebar
        menuBtn.textContent = 'EXPLORE?'; // Change button text back to "EXPLORE?"
    } else {
        sidebar.style.right = '0px'; // Open the sidebar
        menuBtn.textContent = 'X'; // Change button text to "X" to indicate closing
    }
});

