const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const termSchema = new Schema({
    term: {type: String, required: true},
    definition: {type: String, required: true},
    examples: [{type: String, required: true}],
    sources: [{type: String, required: true}]
})

module.exports = mongoose.model('Term', termSchema);