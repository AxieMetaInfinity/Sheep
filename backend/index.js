const express = require('express');
const app = express();
const cron = require('node-cron');
const checkWallets = require('./daemon');
require('./db');

app.use(express.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/', require('./routers/getRoute'),);

const port = process.env.PORT || 3000

// check the proxy wallets every 2 mins.
cron.schedule('*/2 * * * *', checkWallets);


app.listen(port, () => {
    console.log(`Server is running at the port ${port}`);
});