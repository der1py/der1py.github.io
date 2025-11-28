const counterEl = document.getElementById('counter');
let value = Number(localStorage.getItem('counterValue')) || 0;
counterEl.textContent = value;

function update() {
    counterEl.textContent = value;
    localStorage.setItem('counterValue', value);
}

document.getElementById('plus3').addEventListener('click', () => {
    value += 3;
    update();
});

document.getElementById('plus5').addEventListener('click', () => {
    value += 5;
    update();
});

document.getElementById('minus3').addEventListener('click', () => {
    value -= 3;
    update();
});

document.getElementById('minus5').addEventListener('click', () => {
    value -= 5;
    update();
});

document.getElementById('reset').addEventListener('click', () => {
    if (confirm("Are you sure you want to reset the counter?")) {
        value = 0;
        update();
    }
});
