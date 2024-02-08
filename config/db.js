const mongoose = require("mongoose")
require("dotenv").config({ path: ".env" })

mongoose.set("strictQuery", false);

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO);
        console.log("DB Connected")
    } catch (e) {
        console.log("error",e)
    }
}

module.exports = dbConnection

