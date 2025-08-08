import Card from '../../components/card/Card.jsx';


export default function ShowCreators({ creators }) {
  if (creators === null) {
    return (
      <div className="bg-gray-900 min-h-screen text-white flex items-center justify-center">
        <p className="text-lg text-gray-400">Loading creators...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold mb-8 text-center">Best Creators</h2>

        {creators.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {creators.map((creator) => (
              <Card key={creator.id} creator={creator} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No creators to display.</p>
        )}
      </div>
    </div>
  );
}
