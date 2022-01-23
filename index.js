const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { urlencoded } = require('body-parser');

const productRouter = require('./routers/product.js');
const categoryRouter = require('./routers/category.js');
const userRouter = require('./routers/user');
const orderRouter = require('./routers/order');


const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.use('/', productRouter);
app.use('/', categoryRouter);
app.use('/', userRouter);
app.use('/', orderRouter);

app.get('/test', (req, res) => {
  res.json(req.query.id);
})

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
})