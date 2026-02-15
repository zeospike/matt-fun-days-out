
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { X, Save, AlertCircle } from 'lucide-react'

export default function EditSuggestionForm({ attraction, onClose }: { attraction: any, onClose: () => void }) {
    const [formData, setFormData] = useState({
        name: attraction.name,
        description: attraction.description || '',
        cost_tier: attraction.cost_tier || 2,
        indoor_outdoor: attraction.indoor_outdoor || 'mixed',
        has_nappy_changing: attraction.has_nappy_changing || false,
        has_restaurant: attraction.has_restaurant || false,
        has_parking: attraction.has_parking || false,
        category: attraction.category || 'Other',
        address: attraction.address || ''
    })
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('submitting')

        try {
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                alert('You must be signed in to suggest edits.')
                setStatus('idle')
                return
            }

            const { error } = await supabase
                .from('attraction_edits')
                .insert({
                    attraction_id: attraction.id,
                    user_id: user.id,
                    proposed_data: formData
                })

            if (error) throw error
            setStatus('success')
            setTimeout(onClose, 2000)
        } catch (error) {
            console.error('Error suggesting edit:', error)
            setStatus('error')
        }
    }

    if (status === 'success') {
        return (
            <div className="bg-white p-8 rounded-lg shadow-xl text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Save className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Suggestion Sent!</h3>
                <p className="text-gray-600">Thanks for helping improve the guide. We'll review your changes shortly.</p>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <h2 className="text-lg font-bold text-gray-900">Suggest an Edit</h2>
                <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
                {status === 'error' && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Something went wrong. Please try again.
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address / Location</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cost Tier</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.cost_tier}
                            onChange={e => setFormData({ ...formData, cost_tier: parseInt(e.target.value) })}
                        >
                            <option value={1}>£ (Free/Cheap)</option>
                            <option value={2}>££ (Moderate)</option>
                            <option value={3}>£££ (Expensive)</option>
                            <option value={4}>££££ (Splash out)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Setting</label>
                        <select
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.indoor_outdoor}
                            onChange={e => setFormData({ ...formData, indoor_outdoor: e.target.value })}
                        >
                            <option value="Indoor">Indoor</option>
                            <option value="Outdoor">Outdoor</option>
                            <option value="mixed">Mixed</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-2 pt-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={formData.has_nappy_changing}
                            onChange={e => setFormData({ ...formData, has_nappy_changing: e.target.checked })}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        Baby Changing Facilities
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={formData.has_restaurant}
                            onChange={e => setFormData({ ...formData, has_restaurant: e.target.checked })}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        Cafe / Restaurant
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={formData.has_parking}
                            onChange={e => setFormData({ ...formData, has_parking: e.target.checked })}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        Parking Available
                    </label>
                </div>
            </form>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    disabled={status === 'submitting'}
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={status === 'submitting'}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50"
                >
                    {status === 'submitting' ? 'Sending...' : 'Submit Suggestion'}
                </button>
            </div>
        </div>
    )
}
