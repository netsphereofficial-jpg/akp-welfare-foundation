import mongoose from 'mongoose';

const ProgramSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  image: { type: String },
  stats: { type: mongoose.Schema.Types.Mixed },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Program || mongoose.model('Program', ProgramSchema);
