const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public'); //__dirname is the current directory
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
//express will serve the assets from the publicPath directory and then the server will run them

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
}); // Match all unmatched routes(that is why we use *) to index.html

app.listen(port, () => {
  console.log('Server is up!');
});//This will start up the server
