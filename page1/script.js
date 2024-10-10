let video;
let handpose;
let predictions = [];
let placedStickers = [];
let stickers = [];
let lastGenerated = 0;
let generationInterval = 500;

function preload() {
  stickers.push(loadImage('g.png'));
  stickers.push(loadImage('g2.png'));
  stickers.push(loadImage('g3.png'));
}

function setup() {
  const canvas = createCanvas(640, 480);
  canvas.parent('video-container'); // Attach the canvas to the video container

  video = createCapture({
    video: {
      facingMode: {
        ideal: 'user'
      }
    }
  });

  video.size(width, height);
  video.hide();

  handpose = ml5.handpose(video, modelReady);
  handpose.on('predict', results => {
    predictions = results;
  });

  // Event listener for the sidebar toggle
  document.getElementById('menu-btn').addEventListener('click', () => {
    toggleSidebar();
  });
}

function modelReady() {
  console.log('Handpose model loaded.');
}

function draw() {
  background(255);

  if (video.loadedmetadata) {
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);

    for (let i = 0; i < height; i++) {
      let inter = map(i, 0, height, 0, 1);
      let c = lerpColor(color(255, 255, 0, 100), color(0, 0, 255, 100), inter);
      stroke(c);
      line(0, i, width, i);
    }
    pop();

    drawPlacedStickers();

    if (predictions.length > 0 && millis() - lastGenerated > generationInterval) {
      generateStickers();
      lastGenerated = millis();
    }
  } else {
    console.log('Video metadata not loaded yet.');
  }
}

function generateStickers() {
  let keypoints = predictions[0].landmarks;
  let keypointsToDraw = [4, 8, 12, 16, 20];

  for (let i = 0; i < keypointsToDraw.length; i++) {
    let [x, y] = keypoints[keypointsToDraw[i]];
    let mirroredX = width - x;
    let randomSticker = random(stickers);
    let stickerSize = random(50, 250);

    placedStickers.push({
      x: mirroredX,
      y: y,
      size: stickerSize,
      img: randomSticker
    });
  }
}

function drawPlacedStickers() {
  for (let i = 0; i < placedStickers.length; i++) {
    let sticker = placedStickers[i];
    image(sticker.img, sticker.x, sticker.y, sticker.size, sticker.size);
  }
}

// Sidebar toggle function
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
