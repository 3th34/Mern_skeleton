import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String },
  description: { type: String },
  quantity: { type: Number },
  price: { type: Number },
  category: { type: String },
  sku: { type: String, default: '' },
  global_sku: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const ecommerce = mongoose.model('ecommerce', productSchema);

export default ecommerce;
