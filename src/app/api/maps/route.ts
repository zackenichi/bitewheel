import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Extract query parameters
  const { searchParams } = new URL(req.url);
  const location = searchParams.get('location');

  // Your Google Maps API key
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
  }

  if (!location) {
    return NextResponse.json(
      { error: 'Location query parameter is required' },
      { status: 400 }
    );
  }

  // Construct the request URL to Google Places API
  const placesApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    location
  )}&key=${googleMapsApiKey}`;

  try {
    // Fetch data from Google Maps Places API
    const response = await fetch(placesApiUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data from Google Maps' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while fetching data' },
      { status: 500 }
    );
  }
}
