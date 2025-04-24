import React, { useState, useRef } from 'react';
import axios from 'axios';
import './HotelImageUploader.css';
import RoomUploader from './RoomUploader';

// Predefined list of amenities from the database
const AMENITIES_LIST = [
  { _id: "64523c719addcc6527be2a0f", title: "Wifi" },
  { _id: "64896ce1c3e8c53f3ad50897", title: "Washing Machine" },
  { _id: "64896d6ac3e8c53f3ad50898", title: "Air conditioner" },
  { _id: "64896ddcc3e8c53f3ad5089a", title: "Refrigerator" },
  { _id: "64896e40c3e8c53f3ad5089b", title: "Microwave" },
  { _id: "64896e97c3e8c53f3ad5089d", title: "Iron" },
  { _id: "64896eecc3e8c53f3ad5089e", title: "Television" },
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

const HotelImageUploader = () => {
  // State for hotel images and details
  const [hotelImages, setHotelImages] = useState([]);
  const [hotelPreviewImages, setHotelPreviewImages] = useState([]);
  const [hotelResult, setHotelResult] = useState(null);
  
  // State for property category (hotel or apartment)
  const [category, setCategory] = useState('hotel');

  // State for rooms
  const [rooms, setRooms] = useState([{
    id: 1,
    name: 'Room 1',
    images: [],
    previewImages: [],
    result: null,
    expanded: true
  }]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const hotelFileInputRef = useRef(null);
  const roomFileInputRefs = useRef({});

  const handleHotelChange = (e) => {
    const files = [...e.target.files];
    setHotelImages(files);

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setHotelPreviewImages(previews);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
  };

  const handleHotelDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const files = [...e.dataTransfer.files];
    if (files.length > 0) {
      setHotelImages(files);
      setError(null);
      const previews = files.map(file => URL.createObjectURL(file));
      setHotelPreviewImages(previews);
    }
  };

  const handleRoomChange = (e, roomId) => {
    const files = [...e.target.files];
    const newRooms = [...rooms];
    const roomIndex = newRooms.findIndex(room => room.id === roomId);
    if (roomIndex >= 0) {
      newRooms[roomIndex].images = files;
      const previews = files.map(file => URL.createObjectURL(file));
      newRooms[roomIndex].previewImages = previews;
      setRooms(newRooms);
    }
  };

  const handleRoomDrop = (e, roomId) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const files = [...e.dataTransfer.files];
    if (files.length > 0) {
      const newRooms = [...rooms];
      const roomIndex = newRooms.findIndex(room => room.id === roomId);
      if (roomIndex >= 0) {
        newRooms[roomIndex].images = files;
        const previews = files.map(file => URL.createObjectURL(file));
        newRooms[roomIndex].previewImages = previews;
        setRooms(newRooms);
      }
    }
  };

  // Function to match detected amenities with the predefined list
  const matchAmenities = (detectedAmenities) => {
    if (!detectedAmenities || !Array.isArray(detectedAmenities) || detectedAmenities.length === 0) {
      return [];
    }
    
    // Convert detected amenities to lowercase for case-insensitive matching
    const detectedLower = detectedAmenities.map(amenity => 
      typeof amenity === 'string' ? amenity.toLowerCase() : 
      (amenity.name ? amenity.name.toLowerCase() : '')
    );
    
    // Find matches in the predefined list
    return AMENITIES_LIST.filter(listItem => {
      const titleLower = listItem.title.toLowerCase();
      // Check for partial matches (e.g., "wifi" should match "High-speed wifi")
      return detectedLower.some(detected => 
        detected.includes(titleLower) || titleLower.includes(detected)
      );
    });
  };

  const handleAnalyzeAll = async (e) => {
    e.preventDefault();

    if (hotelImages.length === 0) {
      setError(`Please select at least one ${category} image.`);
      return;
    }

    // Only require room images for hotels
    if (category === 'hotel') {
      const hasRoomImages = rooms.some(room => room.images.length > 0);
      if (!hasRoomImages) {
        setError('Please select at least one image for any room.');
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      // First analyze hotel
      const hotelFormData = new FormData();
      hotelImages.forEach((img) => hotelFormData.append('images', img));
      hotelFormData.append('category', category);

      console.log('Sending hotel analysis request with data:', Object.fromEntries(hotelFormData.entries())); // Log form data

      const hotelRes = await axios.post('https://rentvip-backend.onrender.com/api/analyze', hotelFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 second timeout
      });

      if (hotelRes.data && hotelRes.data.analysis) {
        setHotelResult(hotelRes.data.analysis);

        // Then analyze each room
        const roomResults = await Promise.all(rooms.map(async (room) => {
          if (room.images.length === 0) return room;

          const roomFormData = new FormData();
          room.images.forEach((img) => roomFormData.append('images', img));
          roomFormData.append('category', 'room');
          roomFormData.append('roomId', room.id.toString());

          try {
            const roomRes = await axios.post('https://rentvip-backend.onrender.com/api/analyze', roomFormData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              timeout: 30000
            });

            if (roomRes.data && roomRes.data.analysis) {
              return {
                ...room,
                result: roomRes.data.analysis
              };
            }
            throw new Error('Invalid room analysis response');
          } catch (roomErr) {
            console.error(`Error analyzing room ${room.id}:`, roomErr);
            return {
              ...room,
              error: 'Failed to analyze room images'
            };
          }
        }));

        setRooms(roomResults);
      } else {
        throw new Error('Invalid hotel analysis response');
      }
    } catch (err) {
      console.error('Analysis error:', err); // Log the full error object
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', err.response.data);
        console.error('Error response status:', err.response.status);
        console.error('Error response headers:', err.response.headers);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('Error request:', err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', err.message);
      }
      setError(err.response?.data?.message || err.message || 'Failed to analyze images. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const removeHotelImage = (index) => {
    const newImages = [...hotelImages];
    const newPreviews = [...hotelPreviewImages];
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(hotelPreviewImages[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setHotelImages(newImages);
    setHotelPreviewImages(newPreviews);
  };

  const removeRoomImage = (roomId, index) => {
    const newRooms = [...rooms];
    const roomIndex = newRooms.findIndex(room => room.id === roomId);
    if (roomIndex >= 0) {
      const newImages = [...newRooms[roomIndex].images];
      const newPreviews = [...newRooms[roomIndex].previewImages];
      
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(newPreviews[index]);
      
      newImages.splice(index, 1);
      newPreviews.splice(index, 1);
      
      newRooms[roomIndex].images = newImages;
      newRooms[roomIndex].previewImages = newPreviews;
      setRooms(newRooms);
    }
  };

  const addNewRoom = () => {
    const newRoomId = rooms.length + 1;
    const newRoom = {
      id: newRoomId,
      name: `Room ${newRoomId}`,
      images: [],
      previewImages: [],
      result: null,
      expanded: true
    };
    setRooms([...rooms, newRoom]);
  };

  const removeRoom = (roomId) => {
    const newRooms = rooms.filter(room => room.id !== roomId);
    setRooms(newRooms);
  };

  const toggleRoomExpansion = (roomId) => {
    const newRooms = [...rooms];
    const roomIndex = newRooms.findIndex(room => room.id === roomId);
    if (roomIndex >= 0) {
      newRooms[roomIndex].expanded = !newRooms[roomIndex].expanded;
      setRooms(newRooms);
    }
  };

  return (
    <div className="uploader-container">
      <div className="uploader-header">
        <h2>Property Image Analysis</h2>
        <p className="subtitle">Upload and analyze property images with AI</p>
        <div className="category-selector">
          <label htmlFor="category-select">Category:</label>
          <select id="category-select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="hotel">Hotel</option>
            <option value="apartment">Apartment</option>
          </select>
        </div>
        <button className="refresh-button" onClick={() => window.location.reload()}>Refresh</button>
      </div>

      <div className="hotel-section">
        <h2>{category === 'hotel' ? 'Hotel Information' : 'Apartment Information'}</h2>
        <div className="upload-section">
          <div 
            className="upload-area"
            onDragOver={handleDragOver}
            onDrop={handleHotelDrop}
            onClick={() => hotelFileInputRef.current.click()}
          >
            <input
              type="file"
              ref={hotelFileInputRef}
              onChange={handleHotelChange}
              multiple
              accept="image/*"
              style={{ display: 'none' }}
            />
            <div className="upload-message">
              <i className="fas fa-cloud-upload-alt"></i>
              <p>Drag & drop {category === 'hotel' ? 'hotel images' : 'apartment images'} here or click to select</p>
            </div>
          </div>

          {hotelPreviewImages.length > 0 && (
            <div className="preview-container">
              <h3>{category === 'hotel' ? 'Hotel Images' : 'Apartment Images'} ({hotelPreviewImages.length})</h3>
              <div className="image-previews">
                {hotelPreviewImages.map((preview, index) => (
                  <div key={index} className="preview-item">
                    <img src={preview} alt={`${category === 'hotel' ? 'Hotel' : 'Apartment'} Preview ${index + 1}`} />
                    <button 
                      className="remove-image" 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeHotelImage(index);
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {category === 'hotel' && (
          <div className="rooms-section">
            <h2>Room Information</h2>
            {rooms.map((room, index) => (
              <div key={room.id} className={`room-card ${room.expanded ? 'expanded' : ''}`}>
                <div 
                  className="room-header" 
                  onClick={() => toggleRoomExpansion(room.id)}
                >
                  <h3>
                    <i className={`fas fa-chevron-${room.expanded ? 'down' : 'right'}`}></i>
                    {room.name}
                  </h3>
                  {index > 0 && (
                    <button 
                      className="remove-room" 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRoom(room.id);
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  )}
                </div>

                {room.expanded && (
                  <div className="room-content">
                    <div 
                      className="upload-area"
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleRoomDrop(e, room.id)}
                      onClick={() => roomFileInputRefs.current[room.id].click()}
                    >
                      <input
                        type="file"
                        ref={el => roomFileInputRefs.current[room.id] = el}
                        onChange={(e) => handleRoomChange(e, room.id)}
                        multiple
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                      <div className="upload-message">
                        <i className="fas fa-cloud-upload-alt"></i>
                        <p>Drag & drop room images here or click to select</p>
                      </div>
                    </div>

                    {room.previewImages.length > 0 && (
                      <div className="preview-container">
                        <h3>Room Images ({room.previewImages.length})</h3>
                        <div className="image-previews">
                          {room.previewImages.map((preview, index) => (
                            <div key={index} className="preview-item">
                              <img src={preview} alt={`${room.name} Preview ${index + 1}`} />
                              <button 
                                className="remove-image" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeRoomImage(room.id, index);
                                }}
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {room.result && (
                      <div className="room-analysis">
                        <h4>Room Details</h4>
                        <div className="result-grid">
                          {/* <div className="result-item">
                            <h5>Room Name</h5>
                            <p>{room.result.roomName || room.name}</p>
                          </div> */}
                          <div className="result-item">
                            <h5>Room Type</h5>
                            <p>{room.result.roomType || 'Standard Room'}</p>
                          </div>
                          <div className="result-item description">
                            <h5>Description</h5>
                            <p>{room.result.description || 'No description available'}</p>
                          </div>
                          <div className="result-item amenities">
                            <h5>Room Amenities</h5>
                            <div className="amenities-list">
                              {(room.result.roomAmenities || []).map((amenity, index) => {
                                const name = typeof amenity === 'string' ? amenity : amenity.name || amenity.title;
                                const matchedTitles = matchAmenities(room.result.roomAmenities || []).map(a => a.title.toLowerCase());
                                const isMatched = matchedTitles.includes(name.toLowerCase());
                                return (
                                  <span key={index} className={`amenity-tag ${isMatched ? 'matched' : 'detected'}`}>
                                    <i className="fas fa-check"></i>
                                    {name}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            <button className="add-room-button" onClick={addNewRoom}>
              <i className="fas fa-plus"></i>
              Add Another Room
            </button>
          </div>
        )}

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <button 
          className="analyze-all-button" 
          onClick={handleAnalyzeAll}
          disabled={loading}
        >
          {loading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i>
              Analyzing All Images...
            </>
          ) : (
            <>
              <i className="fas fa-magic"></i>
              Analyze All Images
            </>
          )}
        </button>

        {hotelResult && (
          <div className="result-section">
            <div className="hotel-results">
              <h3>{category === 'hotel' ? 'Hotel Details' : 'Apartment Details'}</h3>
              <div className="result-grid">
                <div className="result-item">
                  <h4>{category === 'hotel' ? 'Hotel Style' : 'Apartment Style'}</h4>
                  <p>{hotelResult.hotelStyle || 'N/A'}</p>
                </div>
                <div className="result-item description">
                  <h4>Description</h4>
                  <p>{hotelResult.description || 'No description available'}</p>
                </div>
                <div className="result-item amenities">
                  <h4>{category === 'hotel' ? 'Hotel Amenities' : 'Apartment Amenities'}</h4>
                  <div className="amenities-list">
                    {(hotelResult.amenities || []).map((amenity, index) => {
                      const name = typeof amenity === 'string' ? amenity : amenity.name || amenity.title;
                      const matchedTitles = matchAmenities(hotelResult.amenities || []).map(a => a.title.toLowerCase());
                      const isMatched = matchedTitles.includes(name.toLowerCase());
                      return (
                        <span key={index} className={`amenity-tag ${isMatched ? 'matched' : 'detected'}`}>
                          <i className="fas fa-check"></i>
                          {name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            {category === 'hotel' && (
              <div className="room-results">
                <h3>Room Information ({rooms.filter(r => r.result).length})</h3>
                {rooms.filter(r => r.result).map((room, idx) => (
                  <div key={room.id} className="room-details">
                    <h4>Room {idx + 1}: {room.result.roomName || room.name}</h4>
                    <div className="result-grid">
                      <div className="result-item">
                        <h5>Room Type</h5>
                        <p>{room.result.roomType || 'N/A'}</p>
                      </div>
                      <div className="result-item description">
                        <h5>Description</h5>
                        <p>{room.result.description || 'No description available'}</p>
                      </div>
                      <div className="result-item amenities">
                        <h5>Amenities</h5>
                        <div className="amenities-list">
                          {(room.result.roomAmenities || []).map((amenity, i) => {
                            const name = typeof amenity === 'string' ? amenity : amenity.name || amenity.title;
                            const matched = matchAmenities(room.result.roomAmenities || []).map(a => a.title.toLowerCase());
                            const isMatched = matched.includes(name.toLowerCase());
                            return (
                              <span key={i} className={`amenity-tag ${isMatched ? 'matched' : 'detected'}`}>
                                <i className="fas fa-check"></i>{name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelImageUploader;
