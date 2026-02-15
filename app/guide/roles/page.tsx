
import Layout from '@/components/Layout'
import Link from 'next/link'
import { Shield, Eye, Edit2, Crown, ArrowLeft, CheckCircle, XCircle, Users, Star, MapPin } from 'lucide-react'

export default function RolesGuidePage() {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto py-8">
                {/* Back link */}
                <Link href="/guide" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to User Guide
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Role Guide</h1>
                    <p className="text-xl text-gray-600">Understanding your permissions and responsibilities.</p>
                </div>

                {/* Role Hierarchy Overview */}
                <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12 border border-blue-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Role Hierarchy</h2>
                    <p className="text-gray-600 mb-6">Each role builds on the permissions of the previous one. Higher roles can always do everything lower roles can do.</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        {[
                            { name: 'Visitor', icon: Eye, color: 'bg-gray-100 text-gray-600 border-gray-200' },
                            { name: 'Reviewer', icon: Star, color: 'bg-orange-100 text-orange-600 border-orange-200' },
                            { name: 'Editor', icon: Edit2, color: 'bg-blue-100 text-blue-600 border-blue-200' },
                            { name: 'Admin', icon: Crown, color: 'bg-purple-100 text-purple-600 border-purple-200' },
                        ].map((role, i) => (
                            <div key={role.name} className="flex items-center gap-3">
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border font-bold text-sm ${role.color}`}>
                                    <role.icon className="w-4 h-4" />
                                    {role.name}
                                </div>
                                {i < 3 && <span className="text-gray-300 text-xl hidden sm:block">→</span>}
                            </div>
                        ))}
                    </div>
                </section>

                <div className="space-y-12">
                    {/* Reviewer Section */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-orange-50 border-b border-orange-100 p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
                                    <Star className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Reviewer</h2>
                                    <p className="text-orange-700 text-sm font-medium">Content Quality Guardian</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="font-bold text-gray-900 mb-3">What You Can Do</h3>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700"><strong>See pending content</strong> — You can view attractions and reviews that haven&apos;t been approved yet (marked as drafts).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700"><strong>Access the Dashboard</strong> — Navigate to the Admin Dashboard to see the moderation queue.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700"><strong>Approve or Reject</strong> — Use the green Approve or red Reject buttons on pending attractions, reviews, and edit suggestions.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700"><strong>Switch roles</strong> — Use the Role Switcher in the header to temporarily view the site as a Visitor (to check what normal users see).</span>
                                </li>
                            </ul>

                            <h3 className="font-bold text-gray-900 mb-3">How to Review Content</h3>
                            <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                                <ol className="space-y-3 text-orange-900 list-decimal list-inside">
                                    <li>Click <strong>&quot;Dashboard&quot;</strong> in the top navigation bar.</li>
                                    <li>Select the tab: <strong>Pending Attractions</strong>, <strong>Pending Reviews</strong>, or <strong>Pending Edits</strong>.</li>
                                    <li>Review each item carefully. Check for accuracy, appropriateness, and completeness.</li>
                                    <li>Click <strong className="text-green-700">Approve</strong> to make it live, or <strong className="text-red-700">Reject</strong> to remove it.</li>
                                    <li>If &quot;All caught up!&quot; appears, there&apos;s nothing to review. Check back later!</li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    {/* Editor Section */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-blue-50 border-b border-blue-100 p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                                    <Edit2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Editor</h2>
                                    <p className="text-blue-700 text-sm font-medium">Content Manager</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="font-bold text-gray-900 mb-3">Everything a Reviewer Can Do, Plus:</h3>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700"><strong>Edit all active content</strong> — Make direct changes to attraction details, descriptions, prices, and facilities.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700"><strong>Apply suggested edits</strong> — When approving an edit suggestion, the changes are automatically applied to the attraction.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700"><strong>Manage content visibility</strong> — Control which attractions and reviews are visible to the public.</span>
                                </li>
                            </ul>

                            <h3 className="font-bold text-gray-900 mb-3">When to Use Your Editor Powers</h3>
                            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                                <ul className="space-y-2 text-blue-900">
                                    <li>✏️ Fix typos or outdated information on attraction pages.</li>
                                    <li>📝 Review and approve user-submitted edit suggestions from the Dashboard.</li>
                                    <li>🔄 Update prices, opening times, or facility information as things change.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Admin Section */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-purple-50 border-b border-purple-100 p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                                    <Crown className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Admin</h2>
                                    <p className="text-purple-700 text-sm font-medium">System Administrator</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="font-bold text-gray-900 mb-3">Everything an Editor Can Do, Plus:</h3>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700"><strong>See everything</strong> — Access all content, including soft-deleted items that other roles cannot see.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700"><strong>Manage users</strong> — Assign roles (Visitor, Reviewer, Editor, Admin) to other users and activate/deactivate accounts.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <span className="text-gray-700"><strong>Full system control</strong> — Override any content decision and manage the overall platform.</span>
                                </li>
                            </ul>

                            <h3 className="font-bold text-gray-900 mb-3">Admin Best Practices</h3>
                            <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                                <ul className="space-y-2 text-purple-900">
                                    <li>👤 <strong>Use the Role Switcher</strong> to browse the site as a Visitor and ensure the user experience is correct.</li>
                                    <li>🔒 <strong>Grant roles carefully</strong> — Only promote trusted users to Reviewer or higher.</li>
                                    <li>📊 <strong>Check the Dashboard regularly</strong> to keep the moderation queue clear.</li>
                                    <li>⚠️ <strong>Soft-delete, don&apos;t hard-delete</strong> — Rejecting content keeps it hidden but recoverable.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Role Switcher Section */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50 border-b border-gray-100 p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-gray-200 text-gray-600 rounded-full">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Using the Role Switcher</h2>
                                    <p className="text-gray-600 text-sm font-medium">Available to all non-Visitor roles</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <p className="text-gray-700 mb-4">
                                The <strong>Role Switcher</strong> appears in the top navigation bar when you are logged in with a role higher than Visitor.
                                It lets you temporarily change your view of the site without changing your actual permissions.
                            </p>
                            <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200 mb-6">
                                <p className="text-yellow-800 font-medium">💡 Why use it?</p>
                                <p className="text-yellow-700 mt-1">
                                    Switch to <strong>&quot;Visitor View&quot;</strong> to see exactly what a normal user sees.
                                    This helps you verify that draft content is properly hidden and the public experience looks right.
                                    Switch back to your full role when you need to moderate or edit.
                                </p>
                            </div>
                            <ol className="space-y-3 text-gray-700 list-decimal list-inside">
                                <li>Click the <strong>&quot;[Role] View&quot;</strong> button in the header (e.g., &quot;Admin View&quot;).</li>
                                <li>Select the role you want to switch to from the dropdown.</li>
                                <li>The page will reload with the new role&apos;s permissions active.</li>
                                <li>To switch back, click the button again and select your full role.</li>
                            </ol>
                        </div>
                    </section>

                    {/* Permissions Matrix */}
                    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Permissions at a Glance</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-bold text-gray-900">Action</th>
                                            <th className="text-center py-3 px-4 font-bold text-gray-500">Visitor</th>
                                            <th className="text-center py-3 px-4 font-bold text-orange-600">Reviewer</th>
                                            <th className="text-center py-3 px-4 font-bold text-blue-600">Editor</th>
                                            <th className="text-center py-3 px-4 font-bold text-purple-600">Admin</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            { action: 'Search & browse live attractions', v: true, r: true, e: true, a: true },
                                            { action: 'Write reviews', v: true, r: true, e: true, a: true },
                                            { action: 'Suggest edits', v: true, r: true, e: true, a: true },
                                            { action: 'Add new attractions', v: true, r: true, e: true, a: true },
                                            { action: 'See pending/draft content', v: false, r: true, e: true, a: true },
                                            { action: 'Access Dashboard', v: false, r: true, e: true, a: true },
                                            { action: 'Approve/reject submissions', v: false, r: true, e: true, a: true },
                                            { action: 'Edit attraction details directly', v: false, r: false, e: true, a: true },
                                            { action: 'Apply edit suggestions', v: false, r: false, e: true, a: true },
                                            { action: 'See soft-deleted content', v: false, r: false, e: false, a: true },
                                            { action: 'Manage user roles', v: false, r: false, e: false, a: true },
                                        ].map((row) => (
                                            <tr key={row.action} className="hover:bg-gray-50">
                                                <td className="py-3 px-4 text-gray-700">{row.action}</td>
                                                <td className="text-center py-3 px-4">{row.v ? <CheckCircle className="w-5 h-5 text-green-500 inline" /> : <XCircle className="w-5 h-5 text-gray-200 inline" />}</td>
                                                <td className="text-center py-3 px-4">{row.r ? <CheckCircle className="w-5 h-5 text-green-500 inline" /> : <XCircle className="w-5 h-5 text-gray-200 inline" />}</td>
                                                <td className="text-center py-3 px-4">{row.e ? <CheckCircle className="w-5 h-5 text-green-500 inline" /> : <XCircle className="w-5 h-5 text-gray-200 inline" />}</td>
                                                <td className="text-center py-3 px-4">{row.a ? <CheckCircle className="w-5 h-5 text-green-500 inline" /> : <XCircle className="w-5 h-5 text-gray-200 inline" />}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="mt-12 text-center space-y-4">
                    <Link href="/guide" className="inline-block px-8 py-3 bg-gray-200 text-gray-700 font-bold rounded-full hover:bg-gray-300 transition-colors mr-4">
                        &larr; User Guide
                    </Link>
                    <Link href="/admin" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                        Go to Dashboard &rarr;
                    </Link>
                </div>
            </div>
        </Layout>
    )
}
