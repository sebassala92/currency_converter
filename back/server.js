require('dotenv').config();
const { default: axios } = require('axios');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const currencyApiBaseURL = process.env.CURRENCY_API_BASE_URL;
const accessKey = process.env.CURRENCY_API_ACCESS_KEY;
const secretKey = process.env.ACCESS_TOKEN_SECRET;

const app = express();

app.use(express.json());
app.use(cors({
    origin:'*'
}))

const invalidatedTokens = [];

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if ( (!token) || (invalidatedTokens.includes(token)) ) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const user = jwt.verify(token, secretKey);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

// Login route
app.post('/login', (req, res) => {
    const email = req.body.email;
    const token = jwt.sign({ email }, secretKey);
    res.json({ token })
});

// Logout route
app.delete('/logout', invalidateToken, (req, res) => {
    res.json({ message: 'Loggedout succesfully' });
});

// Currency symbols
app.get('/currency/symbols', authenticateToken, async (req, res) => {
    const symbols = await getCurrancySymbols();
    res.json(symbols);
})

// Retrieve currencies
app.get('/currency/currency-rates', authenticateToken, async (req, res) => {
    const currencyRates = await getCurrencyRates('EUR');
    res.json({ currencyRates })
})

// Validate token
app.get('/validate-token', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if ( (!token) || (invalidatedTokens.includes(token)) ) {
        return res.status(401).json({ isTokenValid: false });
    }
    try {
        const user = jwt.verify(token, secretKey);
        return res.json({isTokenValid: true})
    } catch (error) {
        return res.status(401).json({ isTokenValid: false });
    }
})


// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


function invalidateToken(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    invalidatedTokens.push(token);
    next();
}

async function getCurrancySymbols() {
    try {
        const response = await axios.get(`${currencyApiBaseURL}symbols?access_key=${accessKey}`);
        const data = await response.data;
        return data;
    } catch (error) {
        return error;
    }
}

async function getCurrencyRates(baseCurrency) {
    try {
        const response = await axios.get(`${currencyApiBaseURL}latest?access_key=${accessKey}`);
        const data = await response.data;
        return data.rates;
    } catch (error) {
        return error;
    }
}