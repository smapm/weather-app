console.log('client side js loaded');

const input = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const search = document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    p1.textContent = 'loading ...';
    p2.textContent = '';
    fetch(`http://localhost:3000/weather?address=${input.value}`).then(res => {
        res.json().then((data) => {
            if (data.error) {
                p1.textContent = data.error
            } else {
                p1.textContent = data.location;
                p2.textContent = data.forecast;
            }
        })
    });
})