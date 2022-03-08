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
    required: true
  },
  category: {
      type: String,
      required: true
    },
    date: {
        type: Date,
        required: true,
      },
    isVirtual: {
        type: Boolean,
        required: true,
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
        description: Joi.string().required(),
        category: Joi.string().required(),
        isVirtual: Joi.boolean().required(),
        date: Joi.date().required(),
        address: Joi.string().min(5).max(50).required(),
    });
    return schema.validate(event)
}

export { Events, validateEvents }