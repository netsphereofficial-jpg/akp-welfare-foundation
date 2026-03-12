import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Volunteer from '@/lib/models/Volunteer';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, city, skills, availability } = data;

    if (!name || !email || !phone || !city || !availability) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();
    await Volunteer.create({ name, email, phone, city, skills, availability, message: data.message });

    return NextResponse.json({ success: true, message: 'Volunteer application submitted' });
  } catch (error) {
    console.error('Volunteer submission error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    return NextResponse.json(volunteers);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
