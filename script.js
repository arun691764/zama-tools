function randomKey() {
    let key = Math.random().toString(36).substring(2, 10);
    document.getElementById("secret").value = key;
    generateFlower();
}

function generateFlower() {
    let key = document.getElementById("secret").value;
    if (!key) return;

    let seed = 0;
    for (let i = 0; i < key.length; i++) seed += key.charCodeAt(i);

    let petals = (seed % 12) + 6;
    let hue = seed % 360;

    const canvas = document.getElementById("flowerCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, 400, 400);

    let angleOffset = 0;

    function draw() {
        ctx.clearRect(0, 0, 400, 400);

        let centerX = 200;
        let centerY = 200;
        let radius = 90;

        for (let i = 0; i < petals; i++) {
            let angle = (i * 2 * Math.PI) / petals + angleOffset;
            let x = centerX + Math.cos(angle) * radius;
            let y = centerY + Math.sin(angle) * radius;

            let gradient = ctx.createRadialGradient(x, y, 10, x, y, 40);
            gradient.addColorStop(0, `hsl(${hue}, 80%, 70%)`);
            gradient.addColorStop(1, `hsl(${hue + 50}, 80%, 55%)`);

            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(x, y, 40, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(centerX, centerY, 55, 0, Math.PI * 2);
        ctx.fill();

        angleOffset += 0.01;
        requestAnimationFrame(draw);
    }

    draw();
}
