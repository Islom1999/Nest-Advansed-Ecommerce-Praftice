import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    username: {
        type: 'string',
    },
    password: {
        type: 'string',
    },
    region: {
        type: 'string',
    },
    district: {
        type: 'string',
    },
}, {
    timestamps: true,
})

UserSchema.pre('save', async function(next: any){
    try {
        if(!this.isModified('password')) {
            return next()
        }
        const hashedPassword = await bcrypt.hash(this['password'], 10)
        this['password'] = hashedPassword
        next()

    } catch (error) {
        return next(error)
    }   
})