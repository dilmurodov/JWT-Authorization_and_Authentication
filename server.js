const app = require('./app')
const mongoose = require("mongoose")

const port = process.env.PORT;
const db = process.env.MONGOOSE_LINK;

mongoose.connect(db, {

})
.then(res => console.log("Successfully DB connected!"))
.catch(err => console.log(err.message))

app.listen(port, '127.0.0.1', err => {
    err ? console.log(err.message) : console.log("Listening on", port)
})