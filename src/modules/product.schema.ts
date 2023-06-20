import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
    image: String,
    title: {
        type: 'string',
    },
    description: {
        type: 'string',
    },
    price: {
        type: 'string',
    },
    amount: {
        type: 'number',
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
})