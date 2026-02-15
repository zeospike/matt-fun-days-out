
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ChevronDown, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'

type UserRole = 'visitor' | 'reviewer' | 'editor' | 'admin'

interface RoleSwitcherProps {
    currentRole: UserRole
    maxRole: UserRole
}

export default function RoleSwitcher({ currentRole, maxRole }: RoleSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const roles: UserRole[] = ['visitor', 'reviewer', 'editor', 'admin']
    // Filter roles: can only switch to roles <= maxRole
    const availableRoles = roles.filter(role =>
        roles.indexOf(role) <= roles.indexOf(maxRole)
    )

    const handleSwitch = async (role: UserRole) => {
        if (role === currentRole) {
            setIsOpen(false)
            return
        }

        setLoading(true)
        try {
            const { error } = await supabase.rpc('update_active_role', { new_role: role })
            if (error) throw error

            // Reload the page to ensure all server-side RLS queries re-run with new role context
            window.location.reload()
        } catch (error) {
            console.error('Failed to switch role:', error)
            setLoading(false)
        }
    }

    if (maxRole === 'visitor') return null

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 transition-colors"
                disabled={loading}
            >
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span className="capitalize">{currentRole} View</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20">
                        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                            Switch Role View
                        </div>
                        {availableRoles.map((role) => (
                            <button
                                key={role}
                                onClick={() => handleSwitch(role)}
                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${currentRole === role ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700'
                                    }`}
                            >
                                <span className="capitalize">{role}</span>
                                {currentRole === role && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
