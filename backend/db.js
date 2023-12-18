const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MongoDB, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
}).then(() => {
    console.log("Mongodb is connected");
}).catch((e) => {
    console.log("Mongodb is not connected");
});