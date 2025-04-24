import React from 'react';
import HotelImageUploader from './components/HotelImageUploader';
import RoomUploader from './components/RoomUploader';

const App = () => {
  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '40px',
      backgroundColor: '#f5f6fa',
      minHeight: '100vh'
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#2c3e50',
        fontSize: '2.5rem',
        marginBottom: '2rem'
      }}>🧠 Hotel AI Image Analysis</h2>
      <HotelImageUploader />
      <hr style={{ 
        margin: '40px 0',
        border: 'none',
        height: '1px',
        backgroundColor: '#e0e0e0'
      }} />
      <RoomUploader />
    </div>
  );
};

export default App;
