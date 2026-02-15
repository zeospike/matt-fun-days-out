
/**
 * Geocodes a location string using OpenStreetMap Nominatim API.
 * Returns { lat, lng } or null if not found.
 */
export async function geocodeLocation(location: string): Promise<{ lat: number; lng: number } | null> {
    if (!location) return null;

    try {
        const encoded = encodeURIComponent(location);
        const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`;

        // Nominatim requires a User-Agent
        const headers = {
            'User-Agent': 'MattFamilyDayOutApp/1.0'
        };

        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error('Geocoding failed');

        const data = await res.json();
        console.log('Geocoding response for', location, ':', data && data.length > 0 ? data[0] : 'No results');
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
        }
    } catch (error) {
        console.error('Geocoding error:', error);
    }
    return null;
}

/**
 * Calculates distance between two points in miles using Haversine formula.
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3959; // Radius of Earth in miles
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(degrees: number): number {
    return degrees * (Math.PI / 180);
}
