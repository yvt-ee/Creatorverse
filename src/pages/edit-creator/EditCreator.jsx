import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import { supabase } from '../../client.js';

export default function EditCreator({ creators, setCreators }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const creator = creators?.find((c) => String(c.id) === String(id));
  const [formData, setFormData] = useState(creator || {});
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (!creator) {
      navigate('/add-creator');
    } else {
      setFormData(creator);
    }
  }, [creator, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('creators')
      .update({
        name: formData.name,
        description: formData.description,
        url: formData.url,
        imageURL: formData.imageURL
      })
      .eq('id', id)
      .select();

    if (error) {
      setError('Error updating data');
      alert('Error updating data');
    } else {
      setError(null);
      setCreators((prev) => {
        const updated = prev.map((c) => (c.id === formData.id ? formData : c));
        return updated;
      });
      navigate('/show-creators');
    }
  };

  const handleDelete = async () => {
    setModal(false);

    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (error) {
      setError('Error deleting data');
      alert('Error deleting data');
    } else {
      setCreators((prev) => prev.filter((c) => c.id !== formData.id));
      navigate('/show-creators');
    }
  };

  if (!creator) return null;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-700">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full lg:max-w-lg md:max-w-md sm:max-w-sm bg-white px-14 py-14 rounded-lg">
          <div className="flex justify-center">
            <h1 className="mb-4 text-4xl font-bold">Edit</h1>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., Ed Sheeran"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-900">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-900">Main Social Media URL</label>
                <input
                  type="text"
                  name="url"
                  id="url"
                  autoComplete="off"
                  value={formData.url || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., Instagram link"
                />
              </div>
              <div>
                <label htmlFor="imageURL" className="block text-sm font-medium text-gray-900">Creator's Image URL</label>
                <input
                  type="text"
                  name="imageURL"
                  id="imageURL"
                  autoComplete="off"
                  value={formData.imageURL || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., image link"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <button type="submit" className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500">
                  Submit Update
                </button>
                <button
                  type="button"
                  className="w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                  onClick={() => setModal(true)}
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <Transition.Root show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <img
                          src="https://static.vecteezy.com/system/resources/previews/017/172/379/original/warning-message-concept-represented-by-exclamation-mark-icon-exclamation-symbol-in-triangle-png.png"
                          className="h-6 w-6"
                          alt="warning"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Delete Creator from Creatorverse?
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this creator? This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setModal(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
