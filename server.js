require('dotenv/config');
const mongoose = require('mongoose');
const app = require('./app');

// mongoose.connect(process.env.MONGODB_URL)
mongoose.connect("mongodb://localhost:27017/e-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})

    .then(() => {
        console.log("Connected Successfully!!");
    })
    .catch((error) => {
        console.log("Connection Failed!!")
    })

app.listen(process.env.PORT, () => {
    console.log(`The server is running on port ${process.env.PORT}`);
})