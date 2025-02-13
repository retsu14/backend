const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGOURI)
        console.log("MongoDB connected")
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

module.exports = connectDb