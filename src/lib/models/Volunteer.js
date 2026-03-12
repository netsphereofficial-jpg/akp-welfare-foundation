import mongoose from 'mongoose';

const VolunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  skills: [{ type: String }],
  availability: { type: String, enum: ['weekdays', 'weekends', 'both', 'flexible'], required: true },
  message: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'active'], default: 'pending' },
}, { timestamps: true });

export default mongoose.models.Volunteer || mongoose.model('Volunteer', VolunteerSchema);
