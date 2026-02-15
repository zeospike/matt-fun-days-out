
'use client'

import { Star } from 'lucide-react'
import { useState } from 'react'

interface StarRatingProps {
    rating: number // 0-5
    onRatingChange?: (rating: number) => void
    readOnly?: boolean
    size?: 'sm' | 'md' | 'lg'
}

export default function StarRating({ rating, onRatingChange, readOnly = false, size = 'md' }: StarRatingProps) {
    const [hoverRating, setHoverRating] = useState(0)

    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    }

    const starClass = sizeClasses[size]

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star

                return (
                    <button
                        key={star}
                        type="button"
                        disabled={readOnly}
                        onClick={() => onRatingChange?.(star)}
                        onMouseEnter={() => !readOnly && setHoverRating(star)}
                        onMouseLeave={() => !readOnly && setHoverRating(0)}
                        className={`${readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform`}
                    >
                        <Star
                            className={`${starClass} ${isFilled
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                        />
                    </button>
                )
            })}
        </div>
    )
}
