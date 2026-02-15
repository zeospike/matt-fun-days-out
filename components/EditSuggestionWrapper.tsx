
'use client'

import { useState } from 'react'
import { Edit2 } from 'lucide-react'
import EditSuggestionForm from './EditSuggestionForm'

export default function EditSuggestionWrapper({ attraction }: { attraction: any }) {
    const [isOpen, setIsOpen] = useState(false)

    if (isOpen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                <div className="w-full max-w-2xl my-8">
                    <EditSuggestionForm attraction={attraction} onClose={() => setIsOpen(false)} />
                </div>
            </div>
        )
    }

    return (
        <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 text-sm text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-full transition-colors font-medium border border-transparent hover:border-blue-100"
        >
            <Edit2 className="w-3.5 h-3.5" />
            Suggest Edit
        </button>
    )
}
