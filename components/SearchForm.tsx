
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, PoundSterling } from 'lucide-react'

// Mock categories for now - eventually redundant if we fetch from DB
const CATEGORIES = [
    'Theme Park', 'Zoo', 'Museum', 'Park', 'Soft Play', 'Farm', 'Beach', 'Other'
]

const AGE_RANGES = ['<5', '5-8', '8-11', '11+']

export default function SearchForm() {
    const router = useRouter()
    const [filters, setFilters] = useState({
        location: '',
        distance: '',
        cost: '',
        indoorOutdoor: '',
        nappyChanging: false,
        restaurant: false,
        parking: false,
        ageRange: [] as string[]
    })

    // This will handle the form submission and redirect to results page with query params
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if (filters.location) params.set('loc', filters.location)
        if (filters.distance) params.set('dist', filters.distance)
        if (filters.cost) params.set('cost', filters.cost)
        if (filters.indoorOutdoor) params.set('type', filters.indoorOutdoor)
        if (filters.nappyChanging) params.set('nappy', 'true')
        if (filters.restaurant) params.set('food', 'true')
        if (filters.parking) params.set('parking', 'true')

        // For arrays like ageRange, we might join them or multiple params
        if (filters.ageRange.length > 0) params.set('ages', filters.ageRange.join(','))

        router.push(`/results?${params.toString()}`)
    }

    const toggleAge = (age: string) => {
        setFilters(prev => {
            const exists = prev.ageRange.includes(age)
            if (exists) {
                return { ...prev, ageRange: prev.ageRange.filter(a => a !== age) }
            } else {
                return { ...prev, ageRange: [...prev.ageRange, age] }
            }
        })
    }

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <Search className="w-6 h-6 text-blue-500" />
                Find a Day Out
            </h2>

            <form onSubmit={handleSearch} className="space-y-6">

                {/* Row 1: Location & Distance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Location</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="e.g. London or Postcode"
                                className="w-full pl-10 h-11 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={filters.location}
                                onChange={e => setFilters({ ...filters, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Distance (miles)</label>
                        <div className="relative">
                            <select
                                className="w-full pl-4 h-11 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                value={filters.distance}
                                onChange={e => setFilters({ ...filters, distance: e.target.value })}
                            >
                                <option value="">Any distance</option>
                                <option value="10">10 miles</option>
                                <option value="20">20 miles</option>
                                <option value="30">30 miles</option>
                                <option value="50">50 miles</option>
                                <option value="100">100 miles</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Row 2: Cost */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Cost</label>
                    <div className="relative">
                        <PoundSterling className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <select
                            className="w-full pl-10 h-11 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            value={filters.cost}
                            onChange={e => setFilters({ ...filters, cost: e.target.value })}
                        >
                            <option value="">Any cost</option>
                            <option value="1">£ (Cheap)</option>
                            <option value="2">££ (Moderate)</option>
                            <option value="3">£££ (Expensive)</option>
                            <option value="4">££££ (Splash out)</option>
                        </select>
                    </div>
                </div>

                {/* Row 2: Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Setting</label>
                    <div className="flex gap-4">
                        {['Indoor', 'Outdoor', 'Mixed'].map(type => (
                            <label key={type} className="flex-1 cursor-pointer">
                                <input
                                    type="radio"
                                    name="indoorOutdoor"
                                    value={type}
                                    checked={filters.indoorOutdoor === type}
                                    onChange={e => setFilters({ ...filters, indoorOutdoor: e.target.value })}
                                    className="peer sr-only"
                                />
                                <div className="text-center py-2 rounded-lg border border-gray-200 peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 transition-all hover:bg-gray-50">
                                    {type}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Row 3: Facilities */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facilities Needed</label>
                    <div className="flex flex-wrap gap-3">
                        {[
                            { id: 'nappyChanging', label: 'Nappy Changing' },
                            { id: 'restaurant', label: 'Restaurant' },
                            { id: 'parking', label: 'Parking' },
                        ].map((facility) => (
                            <label key={facility.id} className="inline-flex items-center gap-2 cursor-pointer select-none">
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        className="peer w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        // @ts-ignore
                                        checked={filters[facility.id]}
                                        // @ts-ignore
                                        onChange={e => setFilters({ ...filters, [facility.id]: e.target.checked })}
                                    />
                                </div>
                                <span className="text-gray-700">{facility.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Row 4: Age Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                    <div className="flex flex-wrap gap-2">
                        {AGE_RANGES.map(age => (
                            <button
                                key={age}
                                type="button"
                                onClick={() => toggleAge(age)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${filters.ageRange.includes(age)
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'
                                    }`}
                            >
                                {age}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all transform active:scale-[0.98]"
                >
                    Find Adventures
                </button>

            </form>
        </div>
    )
}
