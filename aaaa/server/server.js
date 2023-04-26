const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const PORT = process.env.PORT
const app = express();
dotenv.config({ path: '.env.local' });

app.use(cors());
app.use(bodyParser.json())


app.listen(PORT, 'localhost', () => {
      console.log('server listening localhost', PORT);
});

require('./routes/basic.routes')(app);
module.exports.app = app;