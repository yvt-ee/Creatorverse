import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AddCreator from './pages/add-creator/AddCreator.jsx';
import EditCreator from './pages/edit-creator/EditCreator.jsx';
import ShowCreators from './pages/show-creators/ShowCreators.jsx';
import ViewCreator from './pages/view-creator/ViewCreator.jsx';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import { supabase } from './client.js';

export default function App() {
  const [creators, setCreators] = useState(null);
  const [fetchError, setFetchError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*');

      if (error) {
        setFetchError('Could not fetch the creators');
        setCreators(null);
        console.error(error);
      } else {
        setCreators(data);
        setFetchError(null);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Header />
      <main className="min-h-screen bg-gray-900 text-white px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/show-creators" replace />} />
          
          <Route 
            path="/show-creators" 
            element={
              fetchError ? (
                <p className="text-center text-red-500">{fetchError}</p>
              ) : creators ? (
                <ShowCreators creators={creators} setCreators={setCreators} />
              ) : (
                <p className="text-center text-gray-300">Loading creators...</p>
              )
            } 
          />

          <Route path="/add-creator" element={<AddCreator setCreators={setCreators} />} />
          <Route path="/edit-creator/:id" element={<EditCreator creators={creators} setCreators={setCreators} />} />
          <Route path="/view-creator/:id" element={<ViewCreator creators={creators} />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
