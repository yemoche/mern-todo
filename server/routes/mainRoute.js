const authRoutes = require('../routes/authRoute/index')


const routes = app => {
    app.use("/api/v1/auth", authRoutes)
    app.use("/api/v1/todos", authRoutes)
  }

module.exports = routes