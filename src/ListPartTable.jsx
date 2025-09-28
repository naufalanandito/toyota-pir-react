import React from 'react';

function ListPartTable({ parts, onDetails }) {
  return (
    <table
      style={{
        margin: '24px auto',
        borderCollapse: 'collapse',
        minWidth: 400,
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
          <th style={{ padding: '12px 20px' }}>No</th>
          <th style={{ padding: '12px 20px' }}>Part No</th>
          <th style={{ padding: '12px 20px' }}>Part Name</th>
          <th style={{ padding: '12px 20px' }}>Details</th>
        </tr>
      </thead>
      <tbody>
        {parts &&
          Object.entries(parts).map(([partNo, part], idx) => (
            <tr
              key={partNo}
              style={{
                backgroundColor: idx % 2 === 0 ? '#F9FAFB' : '#FFFFFF', // Light gray and white zebra striping
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#F1F5F9')} // Hover effect
              onMouseLeave={(e) => (e.target.style.backgroundColor = idx % 2 === 0 ? '#F9FAFB' : '#FFFFFF')}
            >
              <td style={{ padding: '12px 20px', textAlign: 'center' }}>{idx + 1}</td>
              <td style={{ padding: '12px 20px' }}>{partNo}</td>
              <td style={{ padding: '12px 20px' }}>{part['Part Name'] || '-'}</td>
              <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#F59E0B', // Soft yellow for icon color
                  }}
                  onClick={() => onDetails(partNo)}
                  aria-label="Show Details"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default ListPartTable;
