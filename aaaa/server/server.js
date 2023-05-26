const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json())

mongoose.connect("mongodb://127.0.0.1:27017/lublino").then(() => {
      try{
            console.log('mongodb connected')
      }catch(e){
            console.log(`truble in connecting to db: ${e}`)
      }
})

app.listen(PORT, 'localhost', () => {
      console.log('server listening localhost', PORT);
});

require('./routes/basic.routes')(app);
require('./routes/otherQuestions.routes')(app);
require('./routes/questions.routes')(app);
module.exports.app = app;