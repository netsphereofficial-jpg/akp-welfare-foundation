import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  orderId: { type: String, required: true },
  paymentId: { type: String },
  signature: { type: String },
  status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
  isMonthly: { type: Boolean, default: false },
  message: { type: String },
}, { timestamps: true });

export default mongoose.models.Donation || mongoose.model('Donation', DonationSchema);
