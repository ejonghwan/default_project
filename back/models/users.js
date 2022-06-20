import mongoose from "mongoose";


const UserSchema = mongoose.Schema({
    id: { type: String, require: true, unique: true, },
    email: { type: String, require: true, unique: true, },
    name: { type: String, require: true, },
    password: { type: String, require: true, },
    token: { type: String, unique: true, }
    
}, {
    timestamps: true,
})


const User = mongoose.model('user', UserSchema)
export default User;