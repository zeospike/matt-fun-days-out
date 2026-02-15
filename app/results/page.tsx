
import { supabase } from '@/lib/supabase'
import Layout from '@/components/Layout'
import AttractionCard from '@/components/AttractionCard'
import Link from 'next/link'
import { geocodeLocation, calculateDistance } from '@/lib/geolocation'

export default async function ResultsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const params = await searchParams

    // Parse params
    const cost = params.cost ? parseInt(params.cost as string) : null
    const type = params.type as string
    const locationQuery = params.loc as string
    const maxDistance = params.dist ? parseInt(params.dist as string) : null

    // Fetch all relevant attractions first (filtering by strict DB fields)
    let query = supabase.from('attractions').select('*')

    if (cost) query = query.lte('cost_tier', cost)
    if (type) query = query.eq('indoor_outdoor', type)
    if (params.nappy === 'true') query = query.eq('has_nappy_changing', true)
    if (params.food === 'true') query = query.eq('has_restaurant', true)
    if (params.parking === 'true') query = query.eq('has_parking', true)

    const { data: rawAttractions, error } = await query

    let attractions = rawAttractions || []
    let searchLocationCoords = null

    // Perform Distance Filtering in Memory (PoC Approach)
    if (locationQuery && maxDistance && attractions.length > 0) {
        console.log('Searching for:', locationQuery, 'Max Dist:', maxDistance);
        const coords = await geocodeLocation(locationQuery)

        if (coords) {
            console.log('Search Coords:', coords);
            searchLocationCoords = coords
            attractions = attractions.filter((attraction: any) => {
                if (!attraction.latitude || !attraction.longitude) {
                    console.log('Missing coords for:', attraction.name);
                    return false
                }
                const dist = calculateDistance(
                    coords.lat,
                    coords.lng,
                    attraction.latitude,
                    attraction.longitude
                )
                console.log(attraction.name, 'Distance:', dist);
                // Attach distance to object for display/sorting (optional hack)
                attraction.distance = dist
                return dist <= maxDistance
            })

            // Sort by distance
            attractions.sort((a: any, b: any) => (a.distance || 0) - (b.distance || 0))
        }
    }

    return (
        <Layout>
            <div className="mb-6">
                <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Search</Link>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
                        {locationQuery && (
                            <p className="text-gray-600 mt-1">
                                Showing results near <span className="font-semibold text-gray-800">"{locationQuery}"</span>
                                {maxDistance && ` within ${maxDistance} miles`}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded">
                    Error fetching attractions: {error.message}
                </div>
            )}

            {!error && attractions.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-medium text-gray-700">No attractions found.</h3>
                    <p className="text-gray-500 mt-2">
                        {locationQuery && !searchLocationCoords
                            ? `We couldn't find the location "${locationQuery}". Try a major city or postcode.`
                            : "Try adjusting your filters or increasing the search distance."}
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {attractions.map((attraction: any) => (
                    <AttractionCard key={attraction.id} attraction={attraction} />
                ))}
            </div>
        </Layout>
    )
}

