import { NextResponse } from 'next/server';

const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Make sure this is correct

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get('input');

  if (!input) {
    return NextResponse.json({ error: 'Input is required' }, { status: 400 });
  }

  const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${API_KEY}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.predictions) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(
        { error: 'No predictions found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error fetching predictions' },
      { status: 500 }
    );
  }
}
