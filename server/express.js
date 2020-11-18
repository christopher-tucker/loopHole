const express = require('express');
const model = require('./model.js');
const app = express();
const port = 3000;
const configFile = process.env.CONF || '../dev.config.json';
const config = require(configFile);


// middleware
app.use(express.json());
app.use(express.static(__dirname + '/../client/public'));

app.listen(port, () => console.log(`loopHole server listening at http://localhost:${port}`));

app.get('/session/:id', async (req, res) => {
  let { id } = req.params;
  console.log('/session/:id hit endpoint hit with: ', id);
  let result = await model.getSession(id)
    .catch((err) => {
      console.log("error from /:id : ", err);
      res.status(500).send(err)
    });
  console.log('about to return to client: ', result);
  res.status(200).json(result);
});

app.post('/session', async (req, res) => {
  let sessionData = req.body;
  console.log('sessionData in POST /session endpoint: ', sessionData);
  let result = await model.createSession(sessionData)
    .catch((err) => {
      res.status(500).send(err);
    });
  console.log('about to send response to client: ', result);
  res.status(200).send(result);
});

app.put('/session', async (req, res) => {
  let sessionData = req.body;
  console.log('sessionData in PUT /session endpoint: ', sessionData);
  let result = await model.updateSession(sessionData)
    .catch((err) => {
      res.status(500).send(err);
    });
  res.status(200).send(result);
});

app.delete('/session/:id', async (req, res) => {
  let { id } = req.params;
  console.log('endpoint /session/:id hit with id: ', id);
  let result = await model.deleteSession(id)
    .catch((err) => {
      res.status(500).send(err);
    });
  res.status(200).send(result);
});


