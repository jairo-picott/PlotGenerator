const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { entity_id, start_time, end_time } = event.queryStringParameters;

    try {
        const response = await fetch(`http://192.168.0.100:8123/api/history/period/${start_time}?filter_entity_id=${entity_id}&end_time=${end_time}&minimal_response`, {
            headers: {'Authorization': `Bearer ${process.env.HA_TOKEN}`}
        });
    
        if (!response.ok) {
            return {statusCode: response.status, body: response.statusText};
        }
    
        const data = await response.json();
    
        return {
            statusCode:200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            statusCode: 500,
            body: 'Error fetching data'
        };
    }  
};
