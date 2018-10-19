import mongoose from 'mongoose'

const mseeagesSchema = mongoose.Schema({
    name: String,
    msg: String,
    time: Number,
});
module.exports = mongoose.model('message', mseeagesSchema)