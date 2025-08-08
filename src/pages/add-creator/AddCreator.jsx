import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../client.js';

export default function AddCreator({ setCreators }) {
  const [insertError, setInsertError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    imageURL: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from('creators').insert([formData]).select();

    if (error) {
      alert('Error inserting data');
      setInsertError('Error inserting data');
    } else {
      setInsertError(null);

      // use Supabase's returned object (with correct id)
      const newCreator = data[0];
      setCreators((prev) => [...prev, newCreator]);

      navigate('/show-creators');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-b from-slate-900 to-gray-900">
      <div className="mt-10 sm:mx-auto sm:w-full lg:max-w-lg md:max-w-md sm:max-w-sm bg-white px-14 py-14 rounded-lg">
        <div className="flex justify-center">
          <h1 className="mb-9 text-4xl font-bold">Add a Creator</h1>
        </div>
        <form className="bg-white" onSubmit={handleFormSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Creator Info</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">Please provide the new creator's information.</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-full">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="off"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g.: Ed Sheeran"
                  />
                </div>

                <div className="col-span-full">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <p className="mt-3 text-sm text-gray-600">Write or paste a few sentences about them.</p>
                </div>

                <div className="sm:col-span-full">
                  <label htmlFor="url" className="block text-sm font-medium text-gray-900">Main Social Media URL</label>
                  <input
                    type="text"
                    name="url"
                    id="url"
                    autoComplete="off"
                    required
                    value={formData.url}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g.: Instagram profile link"
                  />
                </div>

                <div className="sm:col-span-full">
                  <label htmlFor="imageURL" className="block text-sm font-medium text-gray-900">Creator's Image URL</label>
                  <input
                    type="text"
                    name="imageURL"
                    id="imageURL"
                    autoComplete="off"
                    required
                    value={formData.imageURL}
                    onChange={handleInputChange}
                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g.: Image address from Google Images"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="w-full rounded-md bg-orange-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none"
            >
              Submit to Creatorverse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
