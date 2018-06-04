const express = require('express');
const cors = require('cors');
const generateData = require('./generateData');

const app = express();
require('express-ws')(app);

app.use(cors());

app.ws('/', (ws, req) => {
  const sendData = () => {
    // Generate random data for two possibilites, 'a' or 'b'
    const data = generateData(['a', 'b']);
    ws.send(JSON.stringify(data));
  };

  // Send data every 500ms when connection opens
  const repeat = setInterval(sendData, 500);

  ws.on('close', () => {
    clearInterval(repeat);
  });
});

app.listen(8000);
