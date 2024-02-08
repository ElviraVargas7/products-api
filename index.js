const express = require("express")
const dbConnection = require("./config/db")
const cors = require("cors")

const app = express()

dbConnection()

app.use(cors())
app.use(express.json())
app.use("/products", require("./routes/products"))

app.listen(4000, () => {
    console.log("Server running on port 4000")
})