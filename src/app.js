const path = require('path');
const hbs = require('hbs');
const express = require('express');
const app = express();
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocoding');

app.listen(3000, () => {
    console.log('server up and running!');
});

const rootdir = path.join(__dirname, '../public');
const templatedir = path.join(__dirname, '../templates/views');
const partialsdir = path.join(__dirname, '../templates/partials');


app.set('view engine', 'hbs')
app.set('views', templatedir)
hbs.registerPartials(partialsdir)

app.use(express.static(rootdir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sarath'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sarath'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sarath'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "location must be provided" })
    }
    let address = req.query.address;
    geocode(address, (error, locationInfo) => {
        if (error) {
            return res.send({ error });
        }
        const { latitude, longitude, location } = locationInfo;
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location,
                forecast: data
            })
        });
    });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found',
        name: 'Sarath'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not found'
    })
})

