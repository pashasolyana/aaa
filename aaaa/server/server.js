const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const PORT = 5000;
const app = express();
const bcrypt = require('bcryptjs')
const db = require('./models/index')
const User = db.users
const Files = db.files
app.use(cors());
app.use(bodyParser.json())
const dotenv = require("dotenv");
const path = require('path');
const { verifyToken } = require('./middleware/tokenVerify')
const fileUpload = require('express-fileupload')

dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/lublino").then(() => {
      try{
            console.log('mongodb connected')
      }catch(e){
            console.log(`truble in connecting to db: ${e}`)
      }
})
app.use("/static", express.static(path.join(__dirname, 'files')))
app.listen(PORT, 'localhost', async () => {
      console.log(process.env.PROD)
      if(process.env.PROD){
            await User.create({username : "admin", password : bcrypt.hashSync('qwer', 8)})
      }
      console.log('server listening localhost', PORT);
});

require('./routes/basic.routes')(app);
require('./routes/otherQuestions.routes')(app);
require('./routes/questions.routes')(app);
require('./routes/user.routes')(app)
require('./routes/pvz.routes')(app)
//require('./routes/content.routes')(app)

app.post("/api/upload", [verifyToken, fileUpload({createParentPath : true})], (req,res) => {
      const files = req.files
        Object.keys(files).forEach(key => {
            const filepath = __dirname + '/files/' + files[key].name
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
            })
            Files.create({path: filepath, name : files[key].name}).then(data => {
                  return res.send(data).status(200)
            })
        })

})

app.get('/api/files', async (req,res) => {
      const files = await Files.find({})
      return res.send(files).status(200)
})
module.exports.app = app;