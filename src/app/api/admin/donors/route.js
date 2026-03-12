import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Donation from '@/lib/models/Donation';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format');

    await connectDB();

    const donors = await Donation.aggregate([
      { $match: { status: 'paid' } },
      {
        $group: {
          _id: '$email',
          name: { $first: '$name' },
          email: { $first: '$email' },
          phone: { $first: '$phone' },
          totalDonated: { $sum: '$amount' },
          donationCount: { $sum: 1 },
          lastDonation: { $max: '$createdAt' },
        },
      },
      { $sort: { totalDonated: -1 } },
    ]);

    if (format === 'csv') {
      const csv = [
        'Name,Email,Phone,Total Donated,Donation Count,Last Donation',
        ...donors.map(d =>
          `"${d.name}","${d.email}","${d.phone || ''}",${d.totalDonated},${d.donationCount},"${new Date(d.lastDonation).toLocaleDateString()}"`
        ),
      ].join('\n');

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=donors.csv',
        },
      });
    }

    return NextResponse.json(donors);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch donors' }, { status: 500 });
  }
}
