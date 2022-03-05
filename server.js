//using import instead of require because "type":"module" in package.json

import fetch from 'node-fetch'
import { } from 'dotenv/config'
// require('dotenv').config()

import express from 'express'
// const express = require('express')

const app = express()
const port = 3000

app.get('/',  async (req, res) => {
    let city = req.query.city
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.API_KEY}`
    const response =   await fetch(url, {
        method: 'post',
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();

    console.log(data);
    const weather = {
        Country: data.sys.country,
        Tempearture: data.main.temp +"°C",
        Feels: `But it feels like ${data.main.feels_like}°C`,
        Description: data.weather[0].main,
        Humidity: data.main.humidity,
    }
    res.json(weather);
    //http://localhost:3000/?city=
})

app.get('/units/:f',  async (req, res) => {
    let city = req.query.city
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.API_KEY}`
    const response =   await fetch(url, {
        method: 'post',
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();

    // console.log(data);
    const weather = {
        Country: data.sys.country,
        Tempearture: data.main.temp +"°F",
        Feels: `But it feels like ${data.main.feels_like}°F`,
        Description: data.weather[0].main,
        Humidity: data.main.humidity,
    }
    res.json(weather);
    //http://localhost:3000/units/f/?city=
})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})