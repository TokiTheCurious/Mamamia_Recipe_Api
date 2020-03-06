const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Recipe = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: false },
        source: { type: String, required: false },
        originalUrl: { type: String, required: false },
        yield: { type: String, required: false },
        active: { type: String, required: false },
        total: { type: String, required: false },
        image: { type: String, required: false },
        ingredients: { type: String, required: true },
        instructions: { type: String, required: true },
        notes: { type: String, required: false }
    },
    { timestamps: true })

    module.exports = mongoose.model('recipies', Recipe)