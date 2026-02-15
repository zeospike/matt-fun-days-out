
import { supabase } from '@/lib/supabase'
import StarRating from './StarRating'
import { UserCircle } from 'lucide-react'

export default async function ReviewList({ attractionId }: { attractionId: string }) {
    // Fetch reviews with profile data
    // Note: We need to manually join or fetch profiles if foreign keys aren't set up for auto-join in standard client
    // With correct Foreign Key setup: .select('*, profiles(username, avatar_url)')

    const { data: reviews, error } = await supabase
        .from('reviews')
        .select(`
            *,
            profiles (
                username,
                avatar_url
            )
        `)
        .eq('attraction_id', attractionId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching reviews:', error)
        return <div className="text-red-500">Failed to load reviews.</div>
    }

    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p>No reviews yet. Be the first to verify this adventure!</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {reviews.map((review: any) => {
                // Handle potential missing profile data
                const username = review.profiles?.username || 'Anonymous Explorer'
                const date = new Date(review.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric'
                })

                return (
                    <div key={review.id} className="bg-white border-b border-gray-100 pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                                    {review.profiles?.avatar_url ? (
                                        <img src={review.profiles.avatar_url} alt={username} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        username.charAt(0).toUpperCase()
                                    )}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{username}</div>
                                    <div className="text-xs text-gray-500">{date}</div>
                                </div>
                            </div>
                            <StarRating rating={review.rating} readOnly size="sm" />
                        </div>
                        <p className="text-gray-700 leading-relaxed mt-2 pl-[52px]">
                            {review.comment}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}
