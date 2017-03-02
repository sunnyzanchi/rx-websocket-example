const express = require('express');
const app = express();
const path = require('path');
const generateData = require('./generateData');

const expressWs = require('express-ws')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.ws('/', function(ws, req){

  function sendData(){
    // Generate random data for two possibilites, 'a' or 'b'
    var data = generateData(['a', 'b']);
    data = JSON.stringify(data);
    ws.send(data);
  }

  /* Send data every 500ms when connection opens */
  const repeat = setInterval(sendData, 500);

  ws.on('close', function(){
    clearInterval(repeat);
  })
});

app.listen(3000);
