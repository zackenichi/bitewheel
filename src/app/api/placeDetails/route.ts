import { NextResponse } from 'next/server';

const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Make sure this is correct

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get('placeId');

  if (!placeId) {
    return NextResponse.json({ error: 'placeId is required' }, { status: 400 });
  }

  const endpoint = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${API_KEY}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.result) {
      return NextResponse.json(data.result);
    } else {
      return NextResponse.json(
        { error: 'Place details not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error fetching place details' },
      { status: 500 }
    );
  }
}
