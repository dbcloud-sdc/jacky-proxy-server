require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');
const port = 3000;

app.use(morgan('dev'));
app.use('/scripts',express.static(path.resolve(__dirname, 'node_modules')))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/song/:songID',express.static(path.join(__dirname, 'public')));
app.use('/api/song/:songID/description', proxy({
  target: 'http://localhost:8081'
}));


app.listen(port, () => {
  console.log(`server running at port ${port}`);
});