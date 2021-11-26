import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: Object, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    size: { type: String, required: true },
    dimensions: { type: String, required: true },
    materials: { type: String },
  },
  {
    timestamps: true,
  }
);

productSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
