const mongoose = require("mongoose")
const server = "mongodb://localhost/recipe"
mongoose
    .connect(server, {useNewUrlParser: true})
    .catch(e =>{
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db