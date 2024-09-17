const canvas = document.getElementById('writingPad');
const ctx = canvas.getContext('2d');

// Resize canvas dynamically based on screen size
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.6;
    ctx.fillStyle = "#fff"; // White background for writing
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Initial canvas setup
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let isDrawing = false;

// Start drawing
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

// Draw on canvas
canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = '#000'; // Drawing with black color
    ctx.lineWidth = 3;
    ctx.stroke();
});

// Stop drawing
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    ctx.closePath();
});

// Stop drawing when mouse leaves canvas
canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
    ctx.closePath();
});

// Clear the canvas
document.getElementById('clearPad').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff"; // Reset canvas background to white
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Save canvas as an image
document.getElementById('saveImage').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'writing_pad_image.png';
    link.click();
});
