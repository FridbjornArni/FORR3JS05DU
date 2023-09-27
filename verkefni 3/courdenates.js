let coordinates = new Set();

function getRandomCoordinate() {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    return `${x},${y}`;
}

function generateUniqueCoordinates(num) {
    while (coordinates.size < num) {
        let newCoord = getRandomCoordinate();
        if (!coordinates.has(newCoord)) {
            coordinates.add(newCoord);
        }
    }
}

function createDots() {
    generateUniqueCoordinates(50);

    coordinates.forEach(coord => {
        let [x, y] = coord.split(',');

        let dot = new Pallet(); // Assuming Pallet is your existing class
        dot.style.position = 'absolute';
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;

        document.body.appendChild(dot);
    });
}

window.onload = createDots;
