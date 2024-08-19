import { NextResponse } from 'next/server';

const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Ensure this is set in your environment variables

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const photoReference = searchParams.get('photoReference');

  if (!photoReference) {
    return NextResponse.json(
      { error: 'photoReference is required' },
      { status: 400 }
    );
  }

  const endpoint = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}`;

  try {
    const response = await fetch(endpoint);
    const photoUrl = response.url;

    return NextResponse.json({ photoUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error fetching photo' },
      { status: 500 }
    );
  }
}
