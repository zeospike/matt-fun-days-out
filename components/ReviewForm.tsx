
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import StarRating from './StarRating'
import Link from 'next/link'
import { Loader2, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ReviewForm({ attractionId }: { attractionId: string }) {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
        }
        checkUser()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return
        if (rating === 0) {
            setError('Please select a star rating')
            return
        }

        setSubmitting(true)
        setError(null)

        try {
            const { error: submitError } = await supabase
                .from('reviews')
                .insert({
                    attraction_id: attractionId,
                    user_id: user.id,
                    rating,
                    comment
                })

            if (submitError) {
                if (submitError.code === '23505') { // Unique constraint violation
                    throw new Error('You have already reviewed this attraction.')
                }
                throw submitError
            }

            setSuccess(true)
            setComment('')
            setRating(0)
            router.refresh() // Refresh server components to show new review

        } catch (err: any) {
            setError(err.message || 'Failed to submit review')
        } finally {
            setSubmitting(false)
        }
    }

    if (!user) {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Been here? Share your thoughts!</h3>
                <p className="text-gray-600 mb-4">Sign in to leave a review and help other families.</p>
                <Link href="/login" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors">
                    Sign In to Review
                </Link>
            </div>
        )
    }

    if (success) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <h3 className="text-lg font-medium text-green-900 mb-2">Thanks for your review!</h3>
                <p className="text-green-700">Your feedback helps the community.</p>
                <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 text-sm text-green-800 underline hover:text-green-900"
                >
                    Write another review? (Note: You can only have one per attraction)
                </button>
            </div>
        )
    }

    return (
        <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <StarRating rating={rating} onRatingChange={setRating} size="lg" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Experience</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        placeholder="What did you like? Is it good for toddlers? How was the food?"
                        required
                    />
                </div>

                {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                    Post Review
                </button>
            </form>
        </div>
    )
}
