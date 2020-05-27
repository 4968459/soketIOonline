const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/chatroom', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

let msgSchema = new mongoose.Schema({
  msg: String
})

module.exports = mongoose.model('Msg', msgSchema)