import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import schemaOptions from './schemaOptions.js'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: Object,
    required: true,
  },
}, schemaOptions);

// Custom method to generate authToken
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { username: this.username, id: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
    return token;
};

const user = mongoose.model('User', userSchema);

export default user;
