import { NextResponse } from 'next/server';

const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Ensure this is set in your environment variables

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'lat and lng are required' },
      { status: 400 }
    );
  }

  const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${API_KEY}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    // console.log('Raw data', data);

    if (data.results) {
      // Filter out non-operational businesses and simplify the data
      const simplifiedData = data.results
        .filter((place: any) => place.business_status === 'OPERATIONAL')
        .map((place: any) => {
          const photoReference = place.photos?.[0]?.photo_reference;

          return {
            id: place.place_id,
            name: place.name,
            address: place.vicinity,
            rating: place.rating,
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng,
            photo: photoReference,
          };
        });

      return NextResponse.json(simplifiedData);
    } else {
      return NextResponse.json(
        { error: 'No restaurants found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Error fetching restaurants' },
      { status: 500 }
    );
  }
}
