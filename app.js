const params = new URLSearchParams(window.location.search);
const entityId = params.get('entity_id');

fetch(`https://twin-app.netlify.app/.netlify/functions/proxy?entity_id=${entityId}`)
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

