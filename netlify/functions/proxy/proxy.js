const Plotly = require('plotly.js');

exports.handler = async function(event, context) {
    //Ensure this function only runs for POST requests
    if(event.httpMethod !== "POST") {
        return {statusCode: 405, body: "Mthod Not Allowed"};
    }

    //Parse the HSON data sent in the request
    let data;
    try {
        data = JSON.parse(event.body);
    } catch (error) {
        console.log("Error parsing JSON: ", error);
        return {
            statusCode: 400,
            body: JSON.stringify({error: "Bad request body" }),
        };
    }

    //Loop through each array in the data to create a separate series for each Entity ID passed
    let traces = data.map(sensorData => {
        // Extract valued from sensorData
        const entityID = sensorData[0]["entity_id"];
        const friendlyName = sensorData[0]["attributes"]["friendly_name"];
        const xValues = sensorData.slice(1).map(item => new Date(item["last_changed"]));
        const yValues = sensorData.slice(1).map(item => parseFloat(item["state"]));

        return {
            x: xValues,
            y: yValues,
            mode: 'lines',
            name: friendlyName
        };
    });

    var layout = {
        title: 'Twin data viewer',
        xaxis: {
            title: 'Date',
            showgrid: false,
            zeroline: false,
        },
        yaxis: {
            title: 'Measurement',
            showline: false
        },
        showlegend: true
    };

    //Generate the plot

    const figure = {'data': traces, layout: layout};
    const imgOpts = {format: 'png', width: 1000, height: 500};

    //Convert plot to image
    var img = await Plotly.toImage(figure, imgOpts);

    //Return the image in the response
    return {
        statusCode: 200,
        headers: {'Content-Type': 'image/png'},
        body: img.toString('base64'),
        isBase64Encoded: true
    };
};