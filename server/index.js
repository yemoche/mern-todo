// require("dotenv").config({ path: __dirname + "/.env" })
require("dotenv").config();
const express = require("express")
const routes = require("../server/routes/mainRoute")
const cors = require("cors")
const mongoose = require("mongoose");
const helmet = require('helmet')
// const connection = require("../server/mongoConnection")

// connection()



//Middlewares
const app = express()
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });



//connecting to express server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("Listening on port %d", PORT))

app.get("/", (req, res) => {
  res.status(200).json({message: "Wow everything is working fine!"})
})

//Routes
routes(app)

//route not found error
app.use((err, res, next) => {
  return res.status(400).json({success:false, message: "route not found"})
})