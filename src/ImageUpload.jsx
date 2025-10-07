import React, { useRef, useState } from 'react';

function ImageUpload({ label = 'Upload Image', onHash, hideHash }) {
  // We keep the prop name `onHash` for backward compatibility but now
  // we send the uploaded file's name (string) instead of a SHA-256 hash.
  const [imageName, setImageName] = useState('');
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      const name = file.name || '';
      setImageName(name);
      if (onHash) onHash(name);
    } else {
      setPreview(null);
      setImageName('');
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
