import Joi from 'joi';
import mongoose from 'mongoose';

const Events = mongoose.model('Events', new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 50,
    unique: true
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
  },
  category: {
      type: String,
      required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
      },
    isVirtual: {
        type: Boolean,
        required: true,
        default: false
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}))

function validateEvents(event: any) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(5).max(50).required(),
        category: Joi.string().required(),
        address: Joi.string().min(5).max(50).required(),
    });
    return schema.validate(event)
}

export { Events, validateEvents }