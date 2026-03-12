import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { amount, name, email, phone, message, isMonthly } = await request.json();

    if (!amount || amount < 1 || !name || !email) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const amountInPaise = Math.round(amount * 100);

    // Use Razorpay if keys are configured, otherwise use mock order
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      const { default: getRazorpay } = await import('@/lib/razorpay');
      const order = await getRazorpay().orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `donation_${Date.now()}`,
      });

      return NextResponse.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      });
    }

    // Mock order for testing without Razorpay keys
    return NextResponse.json({
      orderId: `mock_order_${Date.now()}`,
      amount: amountInPaise,
      currency: 'INR',
      mock: true,
    });
  } catch (error) {
    console.error('Create order error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
