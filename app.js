const express = require("express")
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require("morgan")
const UserRouter = require("./routes/userRoutes")
const CookieParser = require("cookie-parser")
const ErorrMiddleware = require("./middleware/error-middleware")

dotenv.config({path: ".env"})

const app = express();

// Middlewares

app.use(morgan("dev"))
app.use(express.json())
app.use(cors())
app.use(CookieParser())



// Router

app.use('/api/v1', UserRouter)
app.use(ErorrMiddleware)

module.exports = app;