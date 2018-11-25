require('dotenv').config();
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('API Server is live!');
});
//
// const server = http.createServer(app);
//
// server.listen(port, () => console.log('API Server is live'));
