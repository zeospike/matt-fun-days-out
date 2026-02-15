
import Layout from '@/components/Layout'
import Link from 'next/link'
import { MapPin, Search, Star, Edit2, Shield } from 'lucide-react'

export default function UserGuidePage() {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">How to Use Family Day Out</h1>
                    <p className="text-xl text-gray-600">Your guide to finding the perfect adventure.</p>
                </div>

                <div className="space-y-16">
                    {/* Section 1 */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                                    <Search className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">1. Finding an Adventure</h2>
                            </div>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                The home page allows you to search for attractions based on your location, budget, and preferences.
                            </p>
                            <img
                                src="/docs/home_page.png"
                                alt="Home Page Search"
                                className="w-full rounded-xl border border-gray-200 shadow-sm mb-6"
                            />
                            <div className="bg-blue-50 p-6 rounded-xl">
                                <h3 className="font-bold text-blue-900 mb-3">Search Tips:</h3>
                                <ul className="list-disc list-inside space-y-2 text-blue-800">
                                    <li><strong>Location:</strong> Enter a city (e.g., "London") or postcode.</li>
                                    <li><strong>Distance:</strong> Choose how far you want to travel (e.g., "20 miles").</li>
                                    <li><strong>Filters:</strong> Use checkboxes to find places with parking, baby changing, or cafes.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-green-100 text-green-600 rounded-full">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">2. Viewing Details</h2>
                            </div>
                            <p className="text-gray-700 mb-6">
                                Click on any attraction card to see full details, including photos, facilities, and directions.
                            </p>
                            <img
                                src="/docs/attraction_details.png"
                                alt="Attraction Details"
                                className="w-full rounded-xl border border-gray-200 shadow-sm"
                            />
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
                                    <Star className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">3. Reviews</h2>
                            </div>
                            <p className="text-gray-700 mb-6">
                                Scroll down on any attraction page to see what other families think, or leave your own review to help the community.
                            </p>
                            <img
                                src="/docs/reviews_section.png"
                                alt="Reviews Section"
                                className="w-full rounded-xl border border-gray-200 shadow-sm"
                            />
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                                    <Edit2 className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">4. Suggesting Edits</h2>
                            </div>
                            <p className="text-gray-700 mb-6">
                                Spot a mistake? Click the <strong>Suggest Edit</strong> button (pencil icon) to propose changes to descriptions, prices, or facilities.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <img
                                    src="/docs/suggest_edit_modal.png"
                                    alt="Suggest Edit Form"
                                    className="w-full rounded-xl border border-gray-200 shadow-sm"
                                />
                                <div className="flex flex-col justify-center text-gray-600">
                                    <p>An administrator will review your suggestions and approve them if they are accurate.</p>
                                    <p className="mt-4 text-sm italic">Note: You must be signed in to make suggestions.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100 overflow-hidden">
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">5. Roles &amp; Admin Tools</h2>
                            </div>
                            <p className="text-gray-700 mb-4">
                                Users with <strong>Reviewer</strong>, <strong>Editor</strong>, or <strong>Admin</strong> roles have additional capabilities including content moderation, editing, and user management.
                            </p>
                            <Link href="/guide/roles" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-colors shadow-sm">
                                <Shield className="w-4 h-4" />
                                View Role Guide &amp; Permissions &rarr;
                            </Link>
                        </div>
                    </section>
                </div>

                <div className="mt-12 text-center">
                    <Link href="/" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                        Start Exploring &rarr;
                    </Link>
                </div>
            </div>
        </Layout>
    )
}
