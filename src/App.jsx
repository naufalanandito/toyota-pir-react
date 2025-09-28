
import { useCallback, useState } from 'react';
import dummyData from './data/dummy.json';
import ImageUpload from './ImageUpload';
import ListPartTable from './ListPartTable';
import PartDetailsTable from './PartDetailsTable';

function App() {
  const [category, setCategory] = useState('');
  const [showSecondUpload, setShowSecondUpload] = useState(false);
  const [modelHash, setModelHash] = useState('');
  const [modelInfo, setModelInfo] = useState({ name: '', year: '' });
  const [carImageUploaded, setCarImageUploaded] = useState(false);
  const [partImageUploaded, setPartImageUploaded] = useState(false);
  const [partHash, setPartHash] = useState('');
  const [selectedPartNo, setSelectedPartNo] = useState(null);
  const [partUploadKey, setPartUploadKey] = useState(0);

  const handleModelImage = useCallback((hash) => {
    setModelHash(hash);
    setCarImageUploaded(!!hash);
    setPartImageUploaded(false);
    setPartHash('');
    setSelectedPartNo(null);
    if (dummyData[hash]) {
      setModelInfo({
        name: dummyData[hash]["Model Name"] || '',
        year: dummyData[hash]["Model Year"] || ''
      });
    } else {
      setModelInfo({ name: '', year: '' });
    }
    setCategory('');
    setShowSecondUpload(false);
  }, []);

  const handlePartImage = useCallback((hash) => {
    setPartHash(hash);
    setPartImageUploaded(!!hash);
    setSelectedPartNo(null);
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setShowSecondUpload(false);
    setPartImageUploaded(false);
    setPartHash('');
    setSelectedPartNo(null);
  };

  const handleSearchClick = () => {
    setShowSecondUpload(true);
    setPartImageUploaded(false);
    setPartHash('');
    setSelectedPartNo(null);
  };

  const partList = (modelHash && category && dummyData[modelHash] && dummyData[modelHash][category]) ? dummyData[modelHash][category] : null;
  let matchedPartNo = null;
  let matchedPart = null;
  if (partList && partHash) {
    for (const [no, part] of Object.entries(partList)) {
      if (part.Hash && part.Hash === partHash) {
        matchedPartNo = no;
        matchedPart = part;
        break;
      }
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3f6fa, #e1e8f0)', // Soft gradient
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",  // Apply modern font
      }}
    >
        <h1 style={{ textAlign: 'center', marginBottom: 24, fontSize: '32px', fontWeight: 700 }}>Toyota PIR</h1> {/* Increased size and bold */}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ImageUpload
            label={carImageUploaded ? 'Change Car Image' : 'Upload Car Image'}
            onHash={handleModelImage}
            hideHash
          />
          {carImageUploaded && !dummyData[modelHash] && (
            <div style={{ color: 'red', margin: 8, fontWeight: 500, fontSize: '14px' }}>
              Unknown car detected, please upload another image.
            </div>
          )}
        </div>

        <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 350, margin: '8px 0' }}>
          <label htmlFor="modelName" style={{ flex: 1, textAlign: 'left', fontSize: '16px', fontWeight: 500 }}>Model Name:</label>
          <input type="text" id="modelName" readOnly value={modelInfo.name} style={{ flex: 2, textAlign: 'left', fontSize: '16px' }} />
        </div>

        <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 350, margin: '8px 0' }}>
          <label htmlFor="modelYear" style={{ flex: 1, textAlign: 'left', fontSize: '16px', fontWeight: 500 }}>Model Year:</label>
          <input type="text" id="modelYear" readOnly value={modelInfo.year} style={{ flex: 2, textAlign: 'left', fontSize: '16px' }} />
        </div>

        <div className="row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: 350, margin: '8px 0' }}>
          <label htmlFor="category" style={{ flex: 1, textAlign: 'left', fontSize: '16px', fontWeight: 500 }}>Category:</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            disabled={!modelHash || !dummyData[modelHash]}
            style={{ flex: 2, textAlign: 'left', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
          >
            <option value="">-- Select --</option>
            <option value="TGA" disabled>Toyota Genuine Accessories</option>
            <option value="TCO">Toyota Customization Option</option>
            <option value="TGP" disabled>Toyota Genuine Part</option>
            <option value="TGB" disabled>Toyota Genuine Battery</option>
          </select>
        </div>
      

      {category && (
        <button
          onClick={() => {
            setShowSecondUpload(true);
            setPartImageUploaded(false);
            setPartHash('');
            setSelectedPartNo(null);
            setPartUploadKey(prev => prev + 1);
          }}
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: '#1976d2',
            border: 'none',
            borderRadius: '50%',
            width: 56,
            height: 56,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1000
          }}
          aria-label="Search"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
        </button>
      )}

      {showSecondUpload && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ImageUpload
            key={partUploadKey}
            label={partImageUploaded ? 'Change Part Image' : 'Upload Part Image'}
            onHash={handlePartImage}
            hideHash
          />
          {(!matchedPart && !selectedPartNo && partList && !(partImageUploaded && !matchedPart)) && (
            <div style={{ margin: '8px 0', color: '#555', fontWeight: 500, fontSize: '14px' }}>
              Or choose one from below
            </div>
          )}
          {partImageUploaded && !matchedPart && (
            <div style={{ color: 'red', margin: 8, fontWeight: 500, fontSize: '14px' }}>
              Unknown part detected, please choose one from below.
            </div>
          )}
          {matchedPart && !selectedPartNo && (
            <PartDetailsTable
              partNo={matchedPartNo}
              part={matchedPart}
              modelName={modelInfo.name}
            />
          )}
          {(!matchedPart && !selectedPartNo && partList) && (
            <ListPartTable
              parts={partList}
              onDetails={no => setSelectedPartNo(no)}
            />
          )}
          {selectedPartNo && partList && partList[selectedPartNo] && (
            <PartDetailsTable
              partNo={selectedPartNo}
              part={partList[selectedPartNo]}
              modelName={modelInfo.name}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;