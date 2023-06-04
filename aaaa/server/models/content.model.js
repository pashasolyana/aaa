const mongoose = require('mongoose')

const ContentSchema = new mongoose.Schema({
    header: {
        type: String, required: true
    },
    body: {
        type: String, required: true
    }
});

const Content = mongoose.model("Content", ContentSchema, "content");
module.exports = Content

