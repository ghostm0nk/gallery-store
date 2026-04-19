import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

function ImageUpload({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError('Please select an image file.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('No file selected.');
      return;
    }

    setUploading(true);
    setError(null);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `portraits/${fileName}`;

    try {
      const { data, error: uploadError } = await supabase.storage
        .from('portrait_images') // Assuming you have a storage bucket named 'portrait_images'
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from('portrait_images')
        .getPublicUrl(filePath);

      if (publicUrlData && publicUrlData.publicUrl) {
        onUploadSuccess(publicUrlData.publicUrl);
        setFile(null); // Clear file input after successful upload
      } else {
        throw new Error('Could not get public URL for uploaded image.');
      }
    } catch (uploadError) {
      setError(`Error uploading image: ${uploadError.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload Image</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100 transition-colors duration-200"
      />
      {file && <p className="mt-2 text-gray-700">Selected file: {file.name}</p>}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className={`mt-4 px-6 py-2 rounded-lg shadow-md text-white font-semibold transition-all duration-200
                    ${uploading || !file ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

export default ImageUpload;