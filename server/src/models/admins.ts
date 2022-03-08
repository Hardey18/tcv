import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
// import config from 'config'

const adminSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
    }
})

adminSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, 'secret');
    return token;
}

const Admin = mongoose.model('Admin', adminSchema);


function validateUser(admin: any) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  });

  return schema.validate(admin)
}

export { Admin, validateUser }