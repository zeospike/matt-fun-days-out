
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import RoleSwitcher from './RoleSwitcher'
import { User } from '@supabase/supabase-js'
import { UserCircle, LogOut, Shield } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AuthButton() {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<{ username: string, role_type?: string, active_role?: string } | null>(null)
    const router = useRouter()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            if (user) fetchProfile(user.id)
        }

        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
            if (session?.user) fetchProfile(session.user.id)
            else setProfile(null)
        })

        return () => subscription.unsubscribe()
    }, [])

    const fetchProfile = async (userId: string) => {
        const { data } = await supabase
            .from('profiles')
            .select('username, role_type, active_role')
            .eq('id', userId)
            .single()

        if (data) setProfile(data)
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    if (!user) {
        return (
            <Link
                href="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
                <UserCircle className="w-4 h-4" />
                Sign In
            </Link>
        )
    }

    return (
        <div className="flex items-center gap-4">
            {profile?.role_type && ['admin', 'editor', 'reviewer'].includes(profile.active_role || '') && (
                <Link
                    href="/admin"
                    className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                    <Shield className="w-4 h-4" />
                    Dashboard
                </Link>
            )}

            {profile?.role_type && profile.role_type !== 'visitor' && (
                <div className="hidden sm:block">
                    <RoleSwitcher
                        currentRole={(profile.active_role as any) || 'visitor'}
                        maxRole={(profile.role_type as any) || 'visitor'}
                    />
                </div>
            )}

            <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-bold text-gray-800">
                    {profile?.username || 'Explorer'}
                </span>
                <span className="text-xs text-green-600 font-medium">Online</span>
            </div>
            <button
                onClick={handleSignOut}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600 transition-colors"
                title="Sign Out"
            >
                <LogOut className="w-5 h-5" />
            </button>
        </div>
    )
}
