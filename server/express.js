const express = require('express');
const model = require('./model.js');
const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(express.static(__dirname + '/../client/public'));

app.listen(port, () => console.log(`loopHole server listening at http://localhost:${port}`));

// app.get('/session', async (req, res) => {
//   let { id } = req.body;
//   console.log('id: ', id);
//   let result = await model.getSession(id)
//     .catch((err) => {
//       res.status(500).send(err);
//     })
//   console.log('result: ', result);
//   res.status(200).json(result);
// });

app.get('/session/:id', async (req, res) => {
  let { id } = req.params;
  let result = await model.getSession(id)
    .catch((err) => {
      console.log("error from /:id : ", err);
      res.status(500).send(err)
    });
  res.status(200).json(result);
});

app.post('/session', async (req, res) => {
  let sessionData = req.body;
  console.log('sessionData in POST /session endpoint: ', sessionData);
  let result = await model.createSession(sessionData)
    .catch((err) => {
      res.status(500).send(err);
    });
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


