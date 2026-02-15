
import Link from 'next/link'
import { MapPin, PoundSterling } from 'lucide-react'

// Using `any` for now to bypass strict type checking during rapid prototyping
// Ideally this would be `Database['public']['Tables']['attractions']['Row']`
export default function AttractionCard({ attraction }: { attraction: any }) {
    return (
        <Link href={`/attraction/${attraction.id}`} className="block group">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                    {/* Placeholder for image */}
                    {attraction.image_url ? (
                        <img src={attraction.image_url} alt={attraction.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                    {attraction.distance !== undefined && (
                        <div className="absolute top-2 left-2 bg-blue-600/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-white">
                            {attraction.distance.toFixed(1)} miles
                        </div>
                    )}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-700">
                        {attraction.category || 'Day Out'}
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors mb-1">
                        {attraction.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                        {attraction.address || 'Location unknown'}
                    </div>
                    <div className="flex items-center justify-between mt-3 text-sm">
                        <div className="flex items-center text-gray-700 font-medium">
                            <span className="mr-1">Cost:</span>
                            <span className="flex">
                                {[...Array(attraction.cost_tier || 1)].map((_, i) => (
                                    <PoundSterling key={i} className="w-3 h-3 text-green-600" />
                                ))}
                            </span>
                        </div>
                        {attraction.rating_avg && (
                            <div className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded border border-yellow-100">
                                ★ {attraction.rating_avg}
                            </div>
                        )}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                        {attraction.indoor_outdoor && (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">
                                {attraction.indoor_outdoor}
                            </span>
                        )}
                        {attraction.has_restaurant && (
                            <span className="px-2 py-0.5 bg-green-50 text-green-600 text-xs rounded-full">
                                Food
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}
