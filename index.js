const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const  router = require('./routers/product.js');
const { urlencoded } = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.use('/', router);

app.get('/test', (req, res) => {
  res.json(req.query.id);
})

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
})