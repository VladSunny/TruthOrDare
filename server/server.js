// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/completion', async (req, res) => {
    try {
        console.log('Received request:', req.body);
        const response = await axios.post('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', req.body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Api-Key AQVNxR6zGEOE6NwZxLzAg__WTaw2R788WOjcY1Dk'
            }
        });
        console.log('Response from Yandex API:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error occurred:', error);
        if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request data:', error.request);
            res.status(500).send('No response received from Yandex API');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
            res.status(500).send(error.message);
        }
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
