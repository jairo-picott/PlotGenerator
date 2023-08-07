exports.handler = async (event, context) => {

     // Check if event.body is undefined or empty
    if (!event.body || event.body === '') {
    return {
        statusCode: 400,
        body: 'Request body is missing or empty',
    };
    }
    
    // Parse incoming JSON data from request body
    const data = JSON.parse(event.body);
  
    // Generate HTML with Plotly script
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
        </head>
        <body>
          <div id="myDiv"></div>
          <script>
            const data = ${JSON.stringify(data)};
  
            const traces = data.map(item => ({
              x: item.map(point => new Date(point.last_changed)),
              y: item.map(point => point.state),
              mode: 'lines',
              name: item[0].entity_id,
            }));
  
            const layout = {
              title: 'Sensor Data',
            };
  
            Plotly.newPlot('myDiv', traces, layout);
          </script>
        </body>
      </html>
    `;
  
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: html,
    };
  };
  