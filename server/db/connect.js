const mongoose = require("mongoose")

let dbConnection = undefined

const connectDB = (url) =>{
    const result = mongoose.connect(url)
    dbConnection = mongoose.connection
    return result
}



module.exports = {connectDB, dbConnection}