const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { urlencoded } = require('body-parser');
const isAuthenticated = require('./middlewares/authMiddleware');

const productRouter = require('./routers/product.js');
const categoryRouter = require('./routers/category.js');
const userRouter = require('./routers/user');
const orderRouter = require('./routers/order');
const authRouter = require('./routers/auth');
const ImageRouter = require('./routers/image.route.js');

const { notFound, errorHandler } = require('./middlewares/errorMiddleware.js');


const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send("Hello World");
});

app.use('/', authRouter);
app.use('/', productRouter);
app.use('/', categoryRouter);
app.use('/', userRouter);
app.use('/', orderRouter);
app.use('/', ImageRouter)

app.get('/test', (req, res) => {
  res.json(req.query.id);
})

app.listen(port, () => {
  console.log(`App is listening on http://localhost:${port}`);
})