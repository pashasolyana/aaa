const db = {}
db.questions = require('./questions.model')
db.otherquestions = require('./otherQuestions.model')
db.users = require('./user.model')
db.content = require('./content.model')
db.files = require('./files.model')

module.exports = db;