import mongoose from 'mongoose';

// Define the Category schema
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, maxlength: 100 },
  description: { type: String, default: "", maxlength: 500 }
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
