console.log('client side js loaded');

const input = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const p3 = document.querySelector('#p3');
const p4 = document.querySelector('#p4');
const p5 = document.querySelector('#p5');
let date = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const search = document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    p1.textContent = 'loading ...';
    p2.textContent = '';
    p3.textContent = '';
    p4.textContent = '';
    p5.textContent = '';
    fetch(`/weather?address=${input.value}`).then(res => {
        res.json().then((data) => {
            if (data.error) {
                p1.textContent = data.error
            } else {
                let newForecast = data.forecast.split('!');
                console.log(newForecast);
                p1.textContent = data.location;
                p2.textContent = newForecast[0];
                p3.textContent = newForecast[1];
                p4.textContent = newForecast[2];
                p5.textContent = `Updated on ${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

            }
        })
    });
})