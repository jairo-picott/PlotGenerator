const params = new URLSearchParams(window.location.search);
const entityId = params.get('entity_id');
const startTime = params.get('start_time');
const endTime = params.get('end_time');

fetch(`https://twin-app.netlify.app/.netlify/functions/proxy?entity_id=${entityId}&start_time=${startTime}&end_time=${endTime}`)
  .then(response => response.json())
  .then(data => {
    const xData = data.map(entry => new Date(entry.last_changed));
    const yData = data.map(entry => parseFloat(entry.state));

    const plotData = [{
      x: xData,
      y: yData,
      type: 'scatter'
    }];

    Plotly.newPlot('plot', plotData);
  });

