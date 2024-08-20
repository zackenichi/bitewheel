import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lat = url.searchParams.get("lat");
  const lng = url.searchParams.get("lng");
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  try {
    if (!lat || !lng) {
      return NextResponse.json(
        { error: "Latitude and longitude are required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status === "OK") {
      const formattedAddress =
        data.results[0]?.formatted_address || "Address not found";
      return NextResponse.json({ formattedAddress });
    } else {
      console.error("Geocoding API error:", data.error_message);
      return NextResponse.json(
        { error: "Failed to fetch address" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return NextResponse.json(
      { error: "Error fetching address" },
      { status: 500 }
    );
  }
}
