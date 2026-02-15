
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { MapPin, Upload, Loader2 } from 'lucide-react'

// CATEGORIES same as SearchForm (should centralize)
const CATEGORIES = [
    'Theme Park', 'Zoo', 'Museum', 'Park', 'Soft Play', 'Farm', 'Beach', 'Other'
]

export default function AddAttractionForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        cost_tier: 1,
        indoor_outdoor: 'Outdoor',
        has_nappy_changing: false,
        has_restaurant: false,
        has_parking: false,
        is_parking_paid: false,
        category: 'Park',
        allow_time: '',
        website_url: '',
        image_url: '' // For now, just a text input. Real upload later.
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        // const supabase = createClient(...) using global instance

        const { error: insertError } = await supabase
            .from('attractions')
            .insert([formData])

        setLoading(false)

        if (insertError) {
            console.error('Error adding attraction:', insertError)
            setError('Failed to add attraction. Please try again.')
        } else {
            router.push('/results') // Or to the new attraction page if we returned ID
        }
    }

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add a New Adventure</h2>

            {error && (
                <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attraction Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Windsor Great Park" />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="What makes this place great?" />
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address / Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Postcode or City" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cost */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cost Tier</label>
                        <select name="cost_tier" value={formData.cost_tier} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="1">£ (Cheap)</option>
                            <option value="2">££ (Moderate)</option>
                            <option value="3">£££ (Expensive)</option>
                            <option value="4">££££ (Splash out)</option>
                        </select>
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Setting</label>
                        <select name="indoor_outdoor" value={formData.indoor_outdoor} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="Indoor">Indoor</option>
                            <option value="Outdoor">Outdoor</option>
                            <option value="Mixed">Mixed</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    {/* Allow Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Suggested Time</label>
                        <input type="text" name="allow_time" value={formData.allow_time} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 2-3 hours" />
                    </div>
                </div>

                {/* Facilities */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facilities</label>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { id: 'has_nappy_changing', label: 'Nappy Changing' },
                            { id: 'has_restaurant', label: 'Restaurant' },
                            { id: 'has_parking', label: 'Parking' },
                            { id: 'is_parking_paid', label: 'Paid Parking' },
                        ].map(f => (
                            <label key={f.id} className="flex items-center gap-2 cursor-pointer">
                                {/* @ts-ignore */}
                                <input type="checkbox" name={f.id} checked={formData[f.id]} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                                <span className="text-gray-700">{f.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Image URL Placeholder */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
                    <div className="relative">
                        <Upload className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input type="url" name="image_url" value={formData.image_url} onChange={handleChange} className="w-full pl-10 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://..." />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Paste a public image URL for the PoC.</p>
                </div>

                {/* Website URL */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website URL (Optional)</label>
                    <input type="url" name="website_url" value={formData.website_url} onChange={handleChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://..." />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Add Attraction'}
                </button>
            </form>
        </div>
    )
}
