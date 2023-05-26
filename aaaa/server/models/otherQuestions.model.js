const mongoose = require('mongoose')

const OtherQuestionsSchema = new mongoose.Schema({
    firstName: {
        type: String, required: true
    },
    phoneNumber: {
        type: String, required: true
    },
    question: {
        type: String, required: true
    }
});
const OtherQuestions = mongoose.model("OtherQuestions", OtherQuestionsSchema, "otherQuestions");
module.exports =  OtherQuestions