import React from 'react';

function PartDetailsTable({ partNo, part, modelName }) {
  if (!part) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <table
        style={{
          margin: '0 auto 24px auto',
          borderCollapse: 'collapse',
          minWidth: 400,
          textAlign: 'center',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#F3F4F6', // Light gray background
        }}
        border={1}
      >
        <thead>
          <tr
            style={{
              backgroundColor: '#1D4ED8', // Primary blue for header
              color: '#fff',
              fontWeight: 'bold',
            }}
          >
            <th style={{ padding: '12px 20px' }}>Part No</th>
            <th style={{ padding: '12px 20px' }}>Part Name</th>
            <th style={{ padding: '12px 20px' }}>Model Name</th>
            <th style={{ padding: '12px 20px' }}>Stock</th>
            <th style={{ padding: '12px 20px' }}>Retail Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '12px 20px' }}>{partNo}</td>
            <td style={{ padding: '12px 20px' }}>{part['Part Name'] || '-'}</td>
            <td style={{ padding: '12px 20px' }}>{modelName}</td>
            <td style={{ padding: '12px 20px' }}>{part['Stock'] || '-'}</td>
            <td style={{ padding: '12px 20px' }}>{part['Retail Price'] || '-'}</td>
          </tr>
        </tbody>
      </table>
      {part.Image && (
        <img
          src={`/toyota-pir-react/assets/${part.Image}`}
          alt={part['Part Name'] || 'Part'}
          style={{
            maxWidth: 200,
            maxHeight: 200,
            borderRadius: '12px',
            border: '1px solid #eee',
            marginBottom: 16,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for images
            transition: 'box-shadow 0.3s ease', // Smooth shadow transition
          }}
        />
      )}
    </div>
  );
}

export default PartDetailsTable;
