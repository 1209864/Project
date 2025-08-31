
import React, { useState, useEffect } from 'react';

import AddImageForm from './AddImageForm';
import './ImageGallery.css';
import Api from '../API/Api';

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarImages, setSimilarImages] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const response = await Api.get('/images');
      setImages(response.data);
    } catch (err) {
      setError('Failed to fetch images.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageAdded = (newImage) => {
    setImages(prevImages => [...prevImages, newImage]);
  };

  const handleFindSimilar = async (imageId) => {
    setIsSearching(true);
    setSimilarImages([]);
    try {
      const response = await Api.get(`/images/${imageId}/similar`);
      setSimilarImages(response.data);
    } catch (err) {
      console.error('Failed to find similar images:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const totalPages = Math.ceil(images.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentImages = images.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) return (
    <div className="dot-spinner">
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
      <div className="dot-spinner__dot"></div>
    </div>
  );
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Add a New Image</h2>
      <AddImageForm onImageAdded={handleImageAdded} />

      <hr />

      <h2>Similarity Search Results</h2>
      <div className="similar-results-container">
        {isSearching && (
          <div className="dot-spinner">
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
          </div>
        )}
        {!isSearching && similarImages.length > 0 ? (
          <div className="gallery-container scrollable">
            {similarImages.map(image => (
              <div key={image.id} className="image-card">
                <img src={image.imageUrl} alt={`Similar item ${image.id}`} />
              </div>
            ))}
          </div>
        ) : !isSearching && (
          <p>Click "Find Similar" on an image to see results here.</p>
        )}
      </div>

      <hr style={{ margin: "2rem 0", borderColor: "var(--border-color)" }} />

      <h2>Full Gallery</h2>
      <div className="gallery-container">
        {currentImages.map(image => (
          <div key={image.id} className="image-card">
            <img src={image.imageUrl} alt={`Gallery item ${image.id}`} />
            <div className="card-overlay">
              <button onClick={() => handleFindSimilar(image.id)}>
                Find Similar
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <nav className="pagination" aria-label="Pagination">
            <button
              className="page-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              <span aria-hidden="true">←</span> Previous
            </button>

            <span className="page-info">Page {currentPage} of {totalPages || 1}</span>

            <button
              className="page-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              aria-label="Go to next page"
            >
              Next <span aria-hidden="true">→</span>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;