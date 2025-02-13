require("dotenv").config()
const express = require("express")
const connectDb = require("./db/dbConfig")
const app = express()
const port = process.env.PORT || 3000

connectDb()

app.use("/", (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})