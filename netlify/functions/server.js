const axios = require('axios');

exports.handler = async function(event, context) {
    try {
        const body = JSON.parse(event.body);
        console.log('Received request:', body);

        const response = await axios.post('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Api-Key AQVNxR6zGEOE6NwZxLzAg__WTaw2R788WOjcY1Dk'
            }
        });

        console.log('Response from Yandex API:', response.data);
        return {
            statusCode: 200,
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        console.error('Error occurred:', error);

        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
            return {
                statusCode: error.response.status,
                body: JSON.stringify(error.response.data)
            };
        } else if (error.request) {
            console.error('Request data:', error.request);
            return {
                statusCode: 500,
                body: 'No response received from Yandex API'
            };
        } else {
            console.error('Error message:', error.message);
            return {
                statusCode: 500,
                body: error.message
            };
        }
    }
};
