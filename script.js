const historyList = document.getElementById('history-list');

function simulateFlow() {
    const velocity = parseFloat(document.getElementById('velocity').value);
    const viscosity = parseFloat(document.getElementById('viscosity').value);
    const diameter = parseFloat(document.getElementById('diameter').value);

    if (isNaN(velocity) || isNaN(viscosity) || isNaN(diameter) || velocity <= 0 || viscosity <= 0 || diameter <= 0) {
        alert('Harap masukkan nilai yang valid dan lebih besar dari nol!');
        return;
    }

    const reynoldsNumber = (velocity * diameter) / viscosity;
    const canvas = document.getElementById('flowCanvas');
    const context = canvas.getContext('2d');

    // Bersihkan canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar aliran
    context.fillStyle = '#0078d4';
    const centerY = canvas.height / 2;
    const flowHeight = Math.min(canvas.height, Math.max(20, reynoldsNumber / 10));

    for (let i = 0; i < canvas.width; i += 20) {
        const waveHeight = flowHeight * Math.sin((i / canvas.width) * 2 * Math.PI);
        context.fillRect(i, centerY - waveHeight / 2, 10, waveHeight);
    }

    // Tampilkan Reynolds Number
    context.fillStyle = '#000';
    context.font = '16px Arial';
    context.fillText(`Reynolds Number: ${reynoldsNumber.toFixed(2)}`, 20, 30);

    // Tampilkan jenis aliran
    const flowType = reynoldsNumber < 2000 ? 'Laminar Flow' : reynoldsNumber < 4000 ? 'Transitional Flow' : 'Turbulent Flow';
    context.fillText(`Flow Type: ${flowType}`, 20, 50);

    // Tampilkan penjelasan
    const explanationDiv = document.getElementById('explanation');
    explanationDiv.style.display = 'block';
    explanationDiv.innerHTML = `
        <h3>Penjelasan Hasil:</h3>
        <p>Bilangan Reynolds: <strong>${reynoldsNumber.toFixed(2)}</strong></p>
        <p>Jenis Aliran: <strong>${flowType}</strong></p>
    `;

    // Simpan ke riwayat
    const historyItem = document.createElement('li');
    historyItem.textContent = `Kecepatan: ${velocity} m/s, Viskositas: ${viscosity} Pa.s, Diameter: ${diameter} m, Reynolds Number: ${reynoldsNumber.toFixed(2)}, Tipe Aliran: ${flowType}`;
    historyList.appendChild(historyItem);
}
