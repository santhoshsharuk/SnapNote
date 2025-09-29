const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const penSize = document.getElementById('penSize');
const penColor = document.getElementById('penColor');
const drawToggle = document.getElementById('drawToggle');
const note = document.getElementById('note');
const clearDrawBtn = document.getElementById('clearDrawBtn');
const downloadBtn = document.getElementById('downloadBtn');

let drawing = false;
let lastX = 0, lastY = 0;
let baseImage = new Image();

// resize canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 150 - 50; // toolbar + note
  if (baseImage.src) ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
}
window.addEventListener('resize', resizeCanvas);

// get captured image from storage
chrome.storage.local.get('captureImage', (result) => {
  if (result.captureImage) {
    baseImage.src = result.captureImage;
    baseImage.onload = () => {
      resizeCanvas();
      // Remove from storage if you want
      chrome.storage.local.remove('captureImage');
    };
  } else {
    alert('No captured image found.');
  }
});

// drawing handlers
function startDrawing(e) {
  if (!drawToggle.checked) return;
  drawing = true;
  const rect = canvas.getBoundingClientRect();
  lastX = e.clientX - rect.left;
  lastY = e.clientY - rect.top;
}
function stopDrawing() { drawing = false; }
function draw(e) {
  if (!drawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  ctx.strokeStyle = penColor.value;
  ctx.lineWidth = penSize.value;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
  lastX = x; lastY = y;
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
window.addEventListener('mouseup', stopDrawing);

// clear drawings
clearDrawBtn.addEventListener('click', () => {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
});

// download image + note
downloadBtn.addEventListener('click', () => {
  const out = document.createElement('canvas');
  const noteHeight = 150;
  out.width = canvas.width;
  out.height = canvas.height + noteHeight;
  const outCtx = out.getContext('2d');

  outCtx.fillStyle = '#fff';
  outCtx.fillRect(0,0,out.width,out.height);
  outCtx.drawImage(canvas, 0, 0);

  outCtx.fillStyle = '#fff';
  outCtx.fillRect(0, canvas.height, out.width, noteHeight);
  outCtx.fillStyle = '#000';
  outCtx.font = '14px Arial';
  const lines = note.value.split('\n');
  let y = canvas.height + 20;
  for (const line of lines) {
    outCtx.fillText(line, 10, y);
    y += 18;
  }

  out.toBlob(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'annotated_capture.png';
    a.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
});
