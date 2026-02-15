
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { Shield, Check, X, Eye } from 'lucide-react'

// Types
type PendingItem = {
    id: string
    created_at: string
    name?: string // For attractions
    description?: string // For attractions
    user_name?: string // For reviews
    rating?: number // For reviews
    comment?: string // For reviews
    location_text?: string
    proposed_data?: any // For edits
    attraction_id?: string // For edits/reviews
    // Polymorphic type tag
    type: 'attraction' | 'review' | 'edit'
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState<'attractions' | 'reviews' | 'edits'>('attractions')
    const [items, setItems] = useState<PendingItem[]>([])
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        checkAdmin()
    }, [])

    useEffect(() => {
        if (isAdmin) fetchItems()
    }, [isAdmin, activeTab])

    const checkAdmin = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: profile } = await supabase
            .from('profiles')
            .select('active_role')
            .eq('id', user.id)
            .single()

        if (profile && ['admin', 'editor', 'reviewer'].includes(profile.active_role || '')) {
            setIsAdmin(true)
        }
    }

    const fetchItems = async () => {
        setLoading(true)
        setItems([])
        try {
            if (activeTab === 'attractions') {
                const { data } = await supabase
                    .from('attractions')
                    .select('*')
                    .eq('is_live', false)
                    .order('created_at', { ascending: false })

                if (data) setItems(data.map(d => ({ ...d, type: 'attraction' })))
            }
            else if (activeTab === 'reviews') {
                const { data } = await supabase
                    .from('reviews')
                    .select('*, attractions(name)')
                    .eq('is_live', false)
                    .order('created_at', { ascending: false })

                if (data) setItems(data.map(d => ({ ...d, type: 'review', name: d.attractions?.name })))
            }
            else if (activeTab === 'edits') {
                const { data } = await supabase
                    .from('attraction_edits')
                    .select('*, attractions(name)')
                    .eq('status', 'pending')
                    .order('created_at', { ascending: false })

                if (data) setItems(data.map(d => ({ ...d, type: 'edit', name: d.attractions?.name })))
            }
        } catch (error) {
            console.error('Error fetching items:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleApprove = async (id: string, type: string, proposedData?: any, attractionId?: string) => {
        try {
            if (type === 'attraction' || type === 'review') {
                await supabase
                    .from(type + 's') // attractions or reviews
                    .update({ is_live: true, approved_at: new Date() })
                    .eq('id', id)
            } else if (type === 'edit' && attractionId && proposedData) {
                // 1. Update attraction with new data
                // exclude id, created_at from merge just in case
                const { id: _, ...updateData } = proposedData
                await supabase.from('attractions').update(updateData).eq('id', attractionId)

                // 2. Mark edit as approved
                await supabase.from('attraction_edits').update({ status: 'approved' }).eq('id', id)
            }
            fetchItems()
        } catch (e) {
            console.error('Approve error', e)
        }
    }

    const handleReject = async (id: string, type: string) => {
        if (!confirm('Are you sure you want to reject this item?')) return
        try {
            if (type === 'attraction' || type === 'review') {
                // Soft delete by keeping is_live=false but marking is_active=false? 
                // Or just leave it as hidden? Let's mark is_active=false (soft deleted)
                await supabase
                    .from(type + 's')
                    .update({ is_active: false })
                    .eq('id', id)
            } else if (type === 'edit') {
                await supabase.from('attraction_edits').update({ status: 'rejected' }).eq('id', id)
            }
            fetchItems()
        } catch (e) {
            console.error('Reject error', e)
        }
    }

    if (!isAdmin) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                    <Shield className="w-16 h-16 text-gray-300 mb-4" />
                    <h1 className="text-2xl font-bold text-gray-800">Access Restricted</h1>
                    <p className="text-gray-500 mt-2">You need to act as an Admin or Reviewer to view this page.</p>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <Shield className="w-8 h-8 text-blue-600" />
                        Admin Dashboard
                    </h1>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-200 mb-6">
                    {(['attractions', 'reviews', 'edits'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 px-1 text-sm font-medium capitalize transition-colors relative ${activeTab === tab
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Pending {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {loading ? (
                    <div className="py-20 text-center text-gray-400">Loading...</div>
                ) : items.length === 0 ? (
                    <div className="py-20 text-center bg-gray-50 rounded-xl border border-gray-100">
                        <Check className="w-12 h-12 text-green-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">All caught up!</h3>
                        <p className="text-gray-500">No pending items in this category.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide ${item.type === 'attraction' ? 'bg-purple-100 text-purple-700' :
                                            item.type === 'review' ? 'bg-orange-100 text-orange-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                            {item.type}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {new Date(item.created_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {item.type === 'attraction' && (
                                        <>
                                            <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                                            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                                        </>
                                    )}

                                    {item.type === 'review' && (
                                        <>
                                            <h3 className="text-lg font-bold text-gray-900">Review for: {item.name}</h3>
                                            <div className="flex items-center gap-1 text-yellow-500 my-1">
                                                ★ {item.rating}
                                            </div>
                                            <p className="text-gray-600 italic">"{item.comment}"</p>
                                        </>
                                    )}

                                    {item.type === 'edit' && (
                                        // @ts-ignore
                                        <>
                                            <h3 className="text-lg font-bold text-gray-900">Edit for: {item.name}</h3>
                                            <pre className="mt-2 bg-gray-50 p-2 rounded text-xs overflow-x-auto text-gray-700 border border-gray-200">
                                                {JSON.stringify(item.proposed_data, null, 2)}
                                            </pre>
                                        </>
                                    )}
                                </div>

                                <div className="flex gap-2 shrink-0">
                                    <button
                                        onClick={() => handleReject(item.id, item.type)}
                                        className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                        title="Reject"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleApprove(
                                            item.id,
                                            item.type,
                                            item.proposed_data,
                                            // @ts-ignore
                                            item.attraction_id // present in DB response
                                        )}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                                    >
                                        <Check className="w-4 h-4" />
                                        Approve
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    )
}
