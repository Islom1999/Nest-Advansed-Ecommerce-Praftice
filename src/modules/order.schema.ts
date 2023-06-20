import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    totalPrice: String,
    product: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number
        }
    ]
}, {
    timestamps: true,
})