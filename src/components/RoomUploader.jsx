import React, { useState, useRef } from 'react';
import axios from 'axios';
import './RoomUploader.css';

// Predefined list of amenities from the database
const AMENITIES_LIST = [
  { _id: "64523c719addcc6527be2a0f", title: "Wifi" },
  { _id: "64896ce1c3e8c53f3ad50897", title: "Washing Machine" },
  { _id: "64896d6ac3e8c53f3ad50898", title: "Air conditioner" },
  { _id: "64896ddcc3e8c53f3ad5089a", title: "Refrigerator" },
  { _id: "64896e40c3e8c53f3ad5089b", title: "Microwave" },
  { _id: "64896e97c3e8c53f3ad5089d", title: "Iron" },
  { _id: "64896eecc3e8c53f3ad5089e", title: "Television" },
  { _id: "64896eecc3e8c53f3ad5089o", title: "TV" },
  { _id: "64896f36c3e8c53f3ad5089f", title: "Shower" },
  { _id: "64896f95c3e8c53f3ad508a0", title: "Shampoo" },
  { _id: "64896fd7c3e8c53f3ad508a1", title: "No Smoking" },
  { _id: "64897095c3e8c53f3ad508a3", title: "Hot Water" },
  { _id: "64d4cdc9dcb974789d5cbbea", title: "Security Camera" },
  { _id: "64d4ce28dcb974789d5cbbeb", title: "Parking" },
  { _id: "64d4ceb3dcb974789d5cbbec", title: "Garden" },
  { _id: "64d4cefbdcb974789d5cbbed", title: "Swimming pool" },
  { _id: "66e053453098ed8d5a79876d", title: "Private Pool" },
  { _id: "66e056923098ed8d5a79876e", title: "Landscaped Garden or Rooftop Garden" },
  { _id: "66e056f23098ed8d5a79876f", title: "Private Beach Access" },
  { _id: "66e057773098ed8d5a798770", title: "BBQ Area" },
  { _id: "66e057d33098ed8d5a798771", title: "Outdoor Dining or Lounge Area" },
  { _id: "66e0582b3098ed8d5a798772", title: "Children's Play Area" },
  { _id: "66e058913098ed8d5a798773", title: "Private Parking or Carports" },
  { _id: "66e058fd3098ed8d5a798774", title: "Golf Course Views" },
  { _id: "66e059413098ed8d5a798775", title: "Infinity Pool" },
  { _id: "66e0599d3098ed8d5a798776", title: "Tennis Court, Squash Court or Basketball Court" },
  { _id: "66e059ed3098ed8d5a798777", title: "24/7 Security and Concierge Services" },
  { _id: "66e05a2a3098ed8d5a798778", title: "Access to Swimming Pool" },
  { _id: "66e05a653098ed8d5a798779", title: "Gymnasium or Fitness Center" },
  { _id: "66e05aa43098ed8d5a79877a", title: "Spa and Sauna Facilities" },
  { _id: "66e05b0c3098ed8d5a79877b", title: "Conference Rooms or Business Centers" },
  { _id: "66e05b413098ed8d5a79877c", title: "Pet-friendly facilities (dog parks, pet grooming)" },
  { _id: "66e05b7a3098ed8d5a79877d", title: "Gated Community or Secure Entry Systems" },
  { _id: "66e05bb83098ed8d5a79877e", title: "Valet Parking and Guest Parking" },
  { _id: "66e05be83098ed8d5a79877f", title: "Multi-purpose Hall or Event Space" },
  { _id: "66e05c203098ed8d5a798780", title: "Bicycle Racks and Jogging Tracks" },
  { _id: "66e05c5d3098ed8d5a798781", title: "Restaurants, Cafés, or Retail Shops within the community" },
  { _id: "66e05c9f3098ed8d5a798782", title: "On-site Supermarket" },
  { _id: "66e05cd73098ed8d5a798783", title: "Community Parks and Green Spaces" },
  { _id: "66e05d0a3098ed8d5a798784", title: "Access to Public Transportation" },
  { _id: "66e05d3f3098ed8d5a798785", title: "Waste Management Systems" },
  { _id: "66e05d713098ed8d5a798786", title: "Electric Car Charging Stations" },
  { _id: "66e05db93098ed8d5a798787", title: "Walk-in Closets or Built-in Wardrobes" },
  { _id: "66e05ded3098ed8d5a798788", title: "Home Office or Study Room" },
  { _id: "66e05e2b3098ed8d5a798789", title: "Private Elevator" },
  { _id: "66e05e603098ed8d5a79878a", title: "Panoramic Windows or Floor-to-ceiling Glass" },
  { _id: "66e1267aef9675549fe2fad4", title: "Private Balcony or Terrace" },
  { _id: "66e129a8ef9675549fe2fad5", title: "Soundproofing" },
  { _id: "66e129deef9675549fe2fad6", title: "High-speed Internet Access and Fiber-optic Connectivity" },
  { _id: "66e12a0def9675549fe2fad7", title: "Fully-equipped Gym" },
  { _id: "66e12a3bef9675549fe2fad8", title: "Dedicated Parking Space(s) or Private Garage" },
  { _id: "66e12a75ef9675549fe2fad9", title: "Serviced Apartments" }
];

const RoomUploader = () => {
  // State for multiple rooms
  const [rooms, setRooms] = useState([{  
    id: 1,  
    name: 'Room 1',  
    images: [],  
    previewImages: [],  
    result: null,  
    expanded: true  
  }]);
  const [currentRoomId, setCurrentRoomId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleRoomChange = (e, roomId) => {
    const files = [...e.target.files];
    setError(null);
    const previews = files.map(file => URL.createObjectURL(file));
    
    setRooms(prevRooms => prevRooms.map(room => {
      if (room.id === roomId) {
        return {
          ...room,
          images: files,
          previewImages: previews
        };
      }
      return room;
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e, roomId) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const files = [...e.dataTransfer.files];
    if (files.length > 0) {
      setError(null);
      const previews = files.map(file => URL.createObjectURL(file));
      
      setRooms(prevRooms => prevRooms.map(room => {
        if (room.id === roomId) {
          return {
            ...room,
            images: files,
            previewImages: previews
          };
        }
        return room;
      }));
    }
  };

  const removeImage = (roomId, index) => {
    setRooms(prevRooms => prevRooms.map(room => {
      if (room.id === roomId) {
        const newImages = [...room.images];
        const newPreviews = [...room.previewImages];
        URL.revokeObjectURL(room.previewImages[index]);
        newImages.splice(index, 1);
        newPreviews.splice(index, 1);
        return {
          ...room,
          images: newImages,
          previewImages: newPreviews
        };
      }
      return room;
    }));
  };
  
  const addNewRoom = () => {
    const newRoomId = rooms.length > 0 ? Math.max(...rooms.map(r => r.id)) + 1 : 1;
    setRooms(prevRooms => [
      ...prevRooms,
      {
        id: newRoomId,
        name: `Room ${newRoomId}`,
        images: [],
        previewImages: [],
        result: null,
        expanded: true
      }
    ]);
    setCurrentRoomId(newRoomId);
  };
  
  const removeRoom = (roomId) => {
    if (rooms.length <= 1) {
      setError('Cannot remove the only room. At least one room is required.');
      return;
    }
    
    setRooms(prevRooms => {
      const filtered = prevRooms.filter(room => room.id !== roomId);
      if (filtered.length > 0 && currentRoomId === roomId) {
        setCurrentRoomId(filtered[0].id);
      }
      return filtered;
    });
  };
  
  const toggleRoomExpansion = (roomId) => {
    setRooms(prevRooms => prevRooms.map(room => {
      if (room.id === roomId) {
        return { ...room, expanded: !room.expanded };
      }
      return room;
    }));
  };

  // This function is now simplified since we're not doing matching anymore
  const processAmenities = (detectedAmenities) => {
    if (!detectedAmenities || !Array.isArray(detectedAmenities) || detectedAmenities.length === 0) {
      return [];
    }
    
    return detectedAmenities;
  };

  const handleRoomSubmit = async (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    
    if (!room || room.images.length === 0) {
      setError(`Please select at least one image for ${room?.name || 'the room'}.`);
      return;
    }

    const formData = new FormData();
    room.images.forEach((img) => formData.append('images', img));
    formData.append('category', 'room');
    formData.append('roomId', roomId.toString());

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('http://localhost:5000/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 second timeout
      });

      if (res.data && res.data.analysis) {
        // Process the response data
        const processedData = {
          ...res.data.analysis,
          amenities: processAmenities(res.data.analysis.amenities || []),
          analyzedAt: new Date().toISOString()
        };
        
        setRooms(prevRooms => prevRooms.map(r => {
          if (r.id === roomId) {
            return {
              ...r,
              result: processedData,
              error: null
            };
          }
          return r;
        }));
      } else {
        throw new Error('Invalid analysis response');
      }
    } catch (err) {
      console.error('Room analysis error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to analyze room images. Please try again later.';
      
      setRooms(prevRooms => prevRooms.map(r => {
        if (r.id === roomId) {
          return {
            ...r,
            error: errorMessage
          };
        }
        return r;
      }));
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rooms-container">
        <div className="rooms-header">
          <h3>
            <i className="fas fa-bed"></i>
            Room Analysis
          </h3>
          <button className="add-room-button" onClick={addNewRoom}>
            <i className="fas fa-plus"></i>
            Add Another Room
          </button>
        </div>
        
        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        {rooms.map(room => (
          <div key={room.id} className="room-panel">
            <div className="room-header" onClick={() => toggleRoomExpansion(room.id)}>
              <h3>
                <i className="fas fa-bed"></i>
                {room.name}
              </h3>
              <div className="room-controls">
                {rooms.length > 1 && (
                  <button 
                    className="remove-room-button" 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRoom(room.id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                )}
                <i className={`fas fa-chevron-${room.expanded ? 'up' : 'down'}`}></i>
              </div>
            </div>

            {room.expanded && (
              <div className="room-content">
                <div 
                  className="upload-area"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, room.id)}
                  onClick={() => {
                    fileInputRef.current.setAttribute('data-room-id', room.id);
                    fileInputRef.current.click();
                  }}
                >
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    multiple 
                    onChange={(e) => {
                      const roomId = parseInt(e.target.getAttribute('data-room-id') || room.id);
                      handleRoomChange(e, roomId);
                    }}
                    className="file-input"
                    accept="image/*"
                  />
                  <div className="upload-content">
                    <i className="fas fa-cloud-upload-alt"></i>
                    <p>Drag and drop {room.name} images here or click to browse</p>
                    <span>Supported formats: JPG, PNG, WEBP</span>
                  </div>
                </div>

                <div className="preview-container">
                  {room.previewImages.length > 0 ? (
                    <>
                      <h3>Selected Images ({room.previewImages.length})</h3>
                      <div className="image-previews">
                        {room.previewImages.map((preview, index) => (
                          <div key={index} className="preview-item">
                            <img src={preview} alt={`${room.name} Preview ${index + 1}`} />
                            <button 
                              className="remove-image" 
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(room.id, index);
                              }}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                      <button 
                        className="analyze-button" 
                        onClick={() => handleRoomSubmit(room.id)}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <i className="fas fa-spinner fa-spin"></i>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-magic"></i>
                            Analyze {room.name} Images
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <div className="no-images-message">
                      <i className="fas fa-info-circle"></i>
                      <p>Upload room images for automatic amenity detection</p>
                    </div>
                  )}
                </div>

                {room.result && /* Always show room details */ (
                  <div className="result-container">
                    <h3>
                      <i className="fas fa-chart-bar"></i>
                      {room.name} Analysis Results
                    </h3>
                    
                    <div className="result-grid">
                      {/* Display all available properties from the response */}
                      {Object.entries(room.result).filter(([key]) => (
                        // Exclude raw response and some internal properties
                        key !== 'rawResponse' && 
                        key !== 'analyzedAt' &&
                        typeof room.result[key] !== 'function'
                      )).map(([key, value]) => {
                        // Handle different types of values appropriately
                        if (key === 'amenities' || key === 'matchedAmenities') {
                          // Handle arrays of amenities
                          return (
                            <div key={key} className="result-item amenities">
                              <h4>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</h4>
                              <div className="amenities-list">
                                {Array.isArray(value) && value.length > 0 ? (
                                  value.map((amenity, index) => {
                                    const amenityText = typeof amenity === 'string' ? amenity : 
                                      (amenity.name || amenity.title || JSON.stringify(amenity));
                                    return (
                                      <span key={index} className="amenity-tag">
                                        <i className="fas fa-check"></i>
                                        {amenityText}
                                      </span>
                                    );
                                  })
                                ) : (
                                  <div className="no-amenities">
                                    <i className="fas fa-info-circle"></i>
                                    <p>No {key} available</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        } else if (key === 'bedOptions') {
                          // Handle bed configuration
                          return (
                            <div key={key} className="result-item">
                              <h4>Bed Configuration</h4>
                              <p>{Array.isArray(value) ? value.map(bed => 
                                `${bed.count}x ${bed.bedType}`).join(', ') : JSON.stringify(value)}</p>
                            </div>
                          );
                        } else if (key === 'description') {
                          // Handle description (full width)
                          return (
                            <div key={key} className="result-item description">
                              <h4>Description</h4>
                              <p>{value || 'No description available'}</p>
                            </div>
                          );
                        } else if (['maxAdults', 'maxChildren', 'maxGuests'].includes(key)) {
                          // Group these into a capacity section
                          if (key === 'maxAdults') { // Only create this once
                            return (
                              <div key="capacity" className="result-item">
                                <h4>Capacity</h4>
                                <div className="capacity-info">
                                  <span>
                                    <i className="fas fa-user"></i>
                                    {room.result.maxAdults || '?'} Adults
                                  </span>
                                  <span>
                                    <i className="fas fa-child"></i>
                                    {room.result.maxChildren || '?'} Children
                                  </span>
                                  <span>
                                    <i className="fas fa-users"></i>
                                    {room.result.maxGuests || '?'} Total Guests
                                  </span>
                                </div>
                              </div>
                            );
                          }
                          return null; // Skip the other capacity fields
                        } else if (['isSmokingAllowed', 'isBathroomPrivate'].includes(key)) {
                          // Group these into a features section
                          if (key === 'isSmokingAllowed') { // Only create this once
                            return (
                              <div key="features" className="result-item features">
                                <h4>Room Features</h4>
                                <div className="features-list">
                                  <div className="feature-item">
                                    <i className={`fas fa-${room.result.isSmokingAllowed ? 'smoking' : 'smoking-ban'}`}></i>
                                    <span>{room.result.isSmokingAllowed ? 'Smoking Allowed' : 'No Smoking'}</span>
                                  </div>
                                  <div className="feature-item">
                                    <i className="fas fa-bath"></i>
                                    <span>{room.result.isBathroomPrivate ? 'Private Bathroom' : 'Shared Bathroom'}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null; // Skip the other feature fields
                        } else if (typeof value === 'object' && value !== null) {
                          // Handle complex objects
                          return (
                            <div key={key} className="result-item">
                              <h4>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</h4>
                              <pre className="object-data">{JSON.stringify(value, null, 2)}</pre>
                            </div>
                          );
                        } else {
                          // Handle simple values
                          return (
                            <div key={key} className="result-item">
                              <h4>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</h4>
                              <p>{value !== undefined && value !== null ? String(value) : 'Not available'}</p>
                            </div>
                          );
                        }
                      })}
                    </div>
                    
                    <div className="result-actions">
                      <button className="save-room-button">
                        <i className="fas fa-save"></i>
                        Save Room Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default RoomUploader;
