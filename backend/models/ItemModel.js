const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema(
    {
        //id:{type: Number},
        checked:{type: Boolean},
        todo:{type: String}
    },
    {timestamps: true}
)

module.exports = (mongoose.model("Item",itemSchema))