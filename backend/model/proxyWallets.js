const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const proxyWalletSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    amount: {
        type: String,
        require: true
    },
    wallet: {
        type: Object,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    transaction: {
        type: String
    }

}, { timestamps: true });

//change _id ket to id only
proxyWalletSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

proxyWalletSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model("proxyWallets", proxyWalletSchema);