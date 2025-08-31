import React, { useState } from 'react';
import Api from '../API/Api';

const AddImageForm = ({ onImageAdded }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      setError('Please enter an image URL.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await Api.post('/images', { imageUrl });
      onImageAdded(response.data);
      setImageUrl('');
    } catch (err) {
      setError('Failed to add image. Please check the URL and try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-image-form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Enter Image URL"
          disabled={isSubmitting}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Image'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddImageForm;