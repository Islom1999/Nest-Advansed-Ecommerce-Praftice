import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
    ower: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    totalPrice: String,
    products: [
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