const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { entity_id } = event.queryStringParameters;

    const response = await fetch(`http://192.168.0.100:8123/api/history/period/2023-07-30?filter_entity_id=${entity_id}&end_time=23-07-30&minimal_response`, {
        header: {'Authorization': `Bearer ${process.env.HA_TOKEN}`}
    });

    if (!response.ok) {
        return {statusCode: response.status, body: response.statusText};
    }

    const data = await response.json();

    return {
        statusCode:200,
        body: JSON.stringify(data),
    };
};
