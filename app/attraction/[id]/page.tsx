
import { supabase } from '@/lib/supabase'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { MapPin, Clock, DollarSign, Check, X, Edit2 } from 'lucide-react'
import ReviewForm from '@/components/ReviewForm'
import ReviewList from '@/components/ReviewList'
import EditSuggestionWrapper from '@/components/EditSuggestionWrapper'

export default async function AttractionPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    // Use shared client
    // const supabase = createClient(...)

    const { data: attraction, error } = await supabase
        .from('attractions')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !attraction) {
        return (
            <Layout>
                <div className="text-center py-20">
                    <h1 className="text-2xl font-bold text-gray-800">Attraction not found</h1>
                    <Link href="/" className="text-blue-600 hover:underline mt-4 block">Return Home</Link>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="mb-6">
                <Link href="/results" className="text-blue-600 hover:underline">&larr; Back to Results</Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Hero Image Area */}
                <div className="h-64 sm:h-80 bg-gray-200 relative">
                    {attraction.image_url ? (
                        <img src={attraction.image_url} alt={attraction.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 text-lg">
                            No Image Available
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 sm:p-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{attraction.name}</h1>
                        <div className="flex items-center text-white/90">
                            <MapPin className="w-5 h-5 mr-2" />
                            {attraction.address || 'Address not listed'}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 sm:p-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        <section>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-xl font-bold text-gray-800">About</h2>
                                <EditSuggestionWrapper attraction={attraction} />
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {attraction.description || 'No description available for this attraction.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Facilities</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FacilityItem label="Nappy Changing" available={attraction.has_nappy_changing} />
                                <FacilityItem label="Restaurant / Cafe" available={attraction.has_restaurant} />
                                <FacilityItem label="Parking" available={attraction.has_parking} />
                                <FacilityItem label="Paid Parking" available={attraction.is_parking_paid} negativeIsGood={true} />
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">Reviews</h2>
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Reviews</h2>

                            <div className="mb-8">
                                <ReviewList attractionId={id} />
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <ReviewForm attractionId={id} />
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Quick Info</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 flex items-center gap-2"><DollarSign className="w-4 h-4" /> Cost</span>
                                    <span className="font-medium text-gray-900">
                                        {attraction.cost_tier === 1 ? '£ Cheap' :
                                            attraction.cost_tier === 2 ? '££ Moderate' :
                                                attraction.cost_tier === 3 ? '£££ Expensive' : '££££ Splash out'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600 flex items-center gap-2"><Clock className="w-4 h-4" /> Allow</span>
                                    <span className="font-medium text-gray-900">{attraction.allow_time || 'N/A'}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Setting</span>
                                    <span className="font-medium text-gray-900">{attraction.indoor_outdoor}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Category</span>
                                    <span className="font-medium text-gray-900">{attraction.category || 'General'}</span>
                                </div>
                            </div>

                            {attraction.website_url && (
                                <a href={attraction.website_url} target="_blank" rel="noopener noreferrer" className="block w-full bg-white border border-gray-300 text-gray-700 font-medium text-center py-2.5 rounded-lg mt-6 hover:bg-gray-50 transition-colors">
                                    Visit Website
                                </a>
                            )}
                            {attraction.google_maps_url && (
                                <a href={attraction.google_maps_url} target="_blank" rel="noopener noreferrer" className="block w-full bg-blue-600 text-white font-medium text-center py-2.5 rounded-lg mt-3 hover:bg-blue-700 transition-colors">
                                    View on Google Maps
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

function FacilityItem({ label, available, negativeIsGood }: { label: string, available: boolean, negativeIsGood?: boolean }) {
    // Logic: if available is true, usually good (green check). 
    // If negativeIsGood (like "Paid Parking"), then available=true might be warned (orange?) or just info. 
    // Let's keep it simple: Check for yes, X for no.
    return (
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${available ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                {available ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
            </div>
            <span className={available ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                {label} {negativeIsGood && available ? '(Paid)' : ''}
            </span>
        </div>
    )
}
