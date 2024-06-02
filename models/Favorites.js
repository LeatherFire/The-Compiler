import mongoose from "mongoose";

const FavoritesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  codes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Code'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.models.Favorites || mongoose.model('Favorites', FavoritesSchema);
