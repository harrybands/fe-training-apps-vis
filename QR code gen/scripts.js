const qr = new QRious({
    element: document.getElementById('qr-code'),
    size: 250,
    value: ''
});

const errorMsg = document.getElementById('error');
const input = document.getElementById('text-input');
const showBtn = document.getElementById('show-btn');
const qrCanvas = document.getElementById('qr-code');

showBtn.addEventListener('click', () => {
    qr.value = input.value;
    if (input.value.trim() !== '') {
        qrCanvas.style.display = 'block';
        errorMsg.style.display = 'none';
    } else {
        qrCanvas.style.display = 'none';
        errorMsg.textContent = 'Vui lòng nhập nội dung để tạo QR code';
        errorMsg.style.display = 'block';
    }
});

// Ẩn QR code khi thay đổi input
input.addEventListener('input', () => {
    qrCanvas.style.display = 'none';
});