import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { orderId, paymentId, signature } = await request.json();

    // Verify signature
    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Update DB if MongoDB is configured
    if (process.env.MONGODB_URI) {
      const { default: connectDB } = await import('@/lib/mongodb');
      const { default: Donation } = await import('@/lib/models/Donation');
      await connectDB();
      await Donation.findOneAndUpdate(
        { orderId },
        { paymentId, signature, status: 'paid' }
      );
    }

    return NextResponse.json({ success: true, message: 'Payment verified' });
  } catch (error) {
    console.error('Verify payment error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
