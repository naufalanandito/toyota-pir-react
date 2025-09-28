import React, { useRef, useState } from 'react';

function ImageUpload({ label = 'Upload Image', onHash, hideHash }) {
  const [imageHash, setImageHash] = useState('');
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  // Helper to read file as ArrayBuffer
  const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  // Simple hash function (SHA-256)
  async function getImageHash(file) {
    const buffer = await readFileAsArrayBuffer(file);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      const hash = await getImageHash(file);
      setImageHash(hash);
      if (onHash) onHash(hash);
    } else {
      setPreview(null);
      setImageHash('');
      if (onHash) onHash('');
    }
  };

  const buttonLabel = preview ? label.replace('Upload', 'Change') : label;

  return (
    <div className="image-upload" style={{ marginBottom: 16 }}>
      <button
        type="button"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        style={{
          padding: '10px 24px',
          background: '#1976d2', // Primary color
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          fontSize: 16,
          fontWeight: 500,
          cursor: 'pointer',
          marginBottom: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'background-color 0.3s ease, transform 0.3s ease',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#1565c0'} // Darker shade on hover
        onMouseLeave={(e) => e.target.style.backgroundColor = '#1976d2'} // Default color
        onMouseDown={(e) => e.target.style.transform = 'scale(0.98)'} // Slight shrink on click
        onMouseUp={(e) => e.target.style.transform = 'scale(1)'} // Return to normal size
      >
        {buttonLabel}
      </button>
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleChange}
      />
      {preview && (
        <div style={{ marginTop: 10 }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: 200,
              maxHeight: 200,
              borderRadius: 8,
              border: '1px solid #eee',
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
