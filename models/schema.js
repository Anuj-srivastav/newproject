

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ganguly',{useNewUrlParser: true, useUnifiedTopology: true});

const NoteSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    file:String
}, 
{
    collection:'design'
});

module.exports = mongoose.model('design', NoteSchema);