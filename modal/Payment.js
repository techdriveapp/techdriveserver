const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    area: {
        type: String,
        enum: ['city', 'district', 'state'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

// Now, you can create payments like this:
const cityPayment = new Payment({
    area: 'city',
    amount: 1299
});

const districtPayment = new Payment({
    area: 'district',
    amount: 1699
});

const statePayment = new Payment({
    area: 'state',
    amount: 2999
});

// Save payments to the database if needed
