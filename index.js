// index.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const OSMOSIS_API_URL = 'https://osmosis-rpc.polkachu.com/';  // Or use .env to manage

app.post('/deploy-token', async (req, res) => {
    const { name, symbol, supply } = req.body;
    try {
        const response = await axios.post(`${OSMOSIS_API_URL}/tokenfactory/tokens`, {
            denom: symbol,
            amount: supply,
            name: name,
        });
        res.status(200).json({ status: 'success', data: response.data });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

app.listen(3001, () => console.log('Server running on port 3001'));
