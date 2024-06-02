import mongoose from 'mongoose';

// Define the Code schema
const CodeSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, maxlength: 30 },
    language: { type: String, required: true, maxlength: 30 },
    nickname: { type: String, required: true, maxlength: 30 },
    content: { type: String, required: true }, 
    rating: { type: Number, min: 0, max: 5, default: 0 },
    ratingCount: { type: Number, default: 0 },
    raters: [{ type: String }],
    isPublic: { type: Boolean, default: false },
    viewCount: { type: Number, default: 0 },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    shared_at: { type: Date },
    identifier: { type: String, required: true, unique: true, maxlength: 100 },
    contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    description: { type: String, default: "" },
    photo: { type: String, default: "/uploads/default-code-photo.jpg" }, 
    resources: [{ type: String, required: true }] 
}, { timestamps: true });

export default mongoose.models.Code || mongoose.model('Code', CodeSchema);
