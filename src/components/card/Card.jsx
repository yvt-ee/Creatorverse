import { Link } from 'react-router-dom';

export default function Card({ creator }) {
  return (
    <div className="bg-white text-black rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300">
      <Link to={`/view-creator/${creator.id}`}>
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{creator.name}</h3>
        <p className="text-sm text-gray-700">{creator.description}</p>
        <a
          href={creator.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline mt-2 inline-block"
        >
          Visit
        </a>
      </div>
    </div>
  );
}
