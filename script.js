const uploadImage = document.getElementById('uploadImage');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const backgroundColor = document.getElementById('backgroundColor');
const downloadImage = document.getElementById('downloadImage');

let img = new Image();

// Function to draw image on canvas
function drawImageWithBackground(color) {
    // Set background color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the uploaded image
    const aspectRatio = img.width / img.height;
    let drawWidth = canvas.width;
    let drawHeight = canvas.width / aspectRatio;

    if (drawHeight > canvas.height) {
        drawHeight = canvas.height;
        drawWidth = canvas.height * aspectRatio;
    }

    const offsetX = (canvas.width - drawWidth) / 2;
    const offsetY = (canvas.height - drawHeight) / 2;

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

// Handle image upload
uploadImage.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
});

// Redraw image with background color when it loads
img.onload = () => {
    drawImageWithBackground(backgroundColor.value);
};

// Update canvas background color
backgroundColor.addEventListener('input', (event) => {
    drawImageWithBackground(event.target.value);
});

// Download the image
downloadImage.addEventListener('click', () => {
    downloadImage.href = canvas.toDataURL('image/png');
});