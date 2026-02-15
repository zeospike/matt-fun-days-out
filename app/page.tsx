
import SearchForm from "@/components/SearchForm";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-10 space-y-8">
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 pb-2">
            Plan Your Next Family Adventure
          </h1>
          <p className="text-lg text-gray-600">
            Find the perfect day out tailored to your family's needs. Filter by age, facilities, cost, and more.
          </p>
        </div>

        <SearchForm />

        <div className="mt-12 text-center">
          <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-4">Popular Categories</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['🏰 Castles', '🦁 Zoos', '🌳 Parks', '🎢 Theme Parks'].map(cat => (
              <span key={cat} className="px-4 py-2 bg-white rounded-full text-sm shadow-sm text-gray-600 border border-gray-100">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
