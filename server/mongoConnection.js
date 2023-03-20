const mongoose = require("mongoose")

const connection = () => {
try {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      const conn = mongoose.connection.on("connected", () => {
        console.log("Database Connected")
      })
    
      return { conn }
} catch (err) {
    console.log(err.message);
  }
 
}

module.exports = connection()
