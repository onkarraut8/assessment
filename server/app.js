// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION
    /* res.send('HEllo World'); */
    /* res.sendStatus(200); */
    console.log("Request Back");
    try {
        console.log("Request Back");
         const { stockSymbol, date } = req.body;
         console.log(stockSymbol+" "+date);
        // Implement the logic to fetch stock data from the Polygon API
        const apiKey = 'Polygon API_key';
        const apiUrl = `https://api.polygon.io/v1/openclose/${stockSymbol}/${date}?apiKey=${apiKey}`;
        const response = axios.get(apiUrl);
        // Extract the required fields from the response
        const { open, high, low, close, volume } = response.data; 
         /*  const open=33; const close=33; const high=33; const low=33; const volume=3354524525;  */
        res.json({ open, high, low, close, volume }).status(200);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ error: 'Error fetching stock data' });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));