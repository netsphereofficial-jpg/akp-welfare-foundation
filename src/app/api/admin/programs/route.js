import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Program from '@/lib/models/Program';

export async function GET() {
  try {
    await connectDB();
    const programs = await Program.find().sort({ createdAt: -1 });
    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    await connectDB();
    const program = await Program.create(data);
    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id, ...data } = await request.json();
    await connectDB();
    const program = await Program.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(program);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await connectDB();
    await Program.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
