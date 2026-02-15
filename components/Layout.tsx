
import Link from 'next/link'
import AuthButton from './AuthButton'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="font-bold text-xl text-blue-600 tracking-tight flex items-center gap-2">
                        <span className="text-2xl">👨‍👩‍👧‍👦</span>
                        Family Day Out
                    </Link>
                    <nav className="flex gap-4">
                        <Link href="/add" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
                            Add Attraction
                        </Link>
                        <AuthButton />
                    </nav>
                </div>
            </header>

            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span>&copy; {new Date().getFullYear()} Family Day Out. Built for parents, by parents.</span>
                    <Link href="/guide" className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        User Guide & Help
                    </Link>
                </div>
            </footer>
        </div>
    )
}
