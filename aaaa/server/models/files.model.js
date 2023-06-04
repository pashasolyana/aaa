const mongoose = require('mongoose')

const FilesSchema = new mongoose.Schema({
    path: {
        type: String, required: true
    },
    name: {
        type: String, required: true
    }
});

const Files = mongoose.model("Files", FilesSchema, "files");
module.exports = Files