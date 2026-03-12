import mongoose from 'mongoose';

const GalleryImageSchema = new mongoose.Schema({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  category: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.GalleryImage || mongoose.model('GalleryImage', GalleryImageSchema);
