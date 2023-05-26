const mongoose = require('mongoose')

const QuestionsSchema = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    firstName: {
        type: String, required: true
    },
    phoneNumber: {
        type: String, required: true
    },
    orderNumber: {
        type: String, required: true
    },
    recipient : {
        type: String, required: true
    }
});

const Questions = mongoose.model("Questions", QuestionsSchema, "questions");
module.exports = Questions

