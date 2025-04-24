import React, { useState } from 'react';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  const renderAmenityIcon = (amenityName) => {
    const iconMap = {
      'wifi': 'fas fa-wifi',
      'pool': 'fas fa-swimming-pool',
      'parking': 'fas fa-parking',
      'gym': 'fas fa-dumbbell',
      'spa': 'fas fa-spa',
      'restaurant': 'fas fa-utensils',
      'default': 'fas fa-concierge-bell'
    };

    const lowerCaseName = amenityName.toLowerCase();
    return iconMap[lowerCaseName] || iconMap.default;
  };

  return (
    <div className="property-card">
      <div className="property-image-carousel">
        {property.images && property.images.length > 0 ? (
          <>
            <img 
              src={property.images[currentImageIndex]} 
              alt={`${property.name} - Image ${currentImageIndex + 1}`} 
              className="property-main-image"
            />
            {property.images.length > 1 && (
              <div className="carousel-controls">
                <button onClick={prevImage} className="carousel-button prev">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button onClick={nextImage} className="carousel-button next">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
            <div className="image-counter">
              {currentImageIndex + 1}/{property.images.length}
            </div>
          </>
        ) : (
          <div className="property-image-placeholder">
            <i className="fas fa-hotel"></i>
            <span>No Image Available</span>
          </div>
        )}
        <div className="property-badges">
          {property.isApproved && (
            <span className="badge verified">
              <i className="fas fa-check-circle"></i> Verified
            </span>
          )}
          {property.hotelRating && (
            <span className="badge rating">
              <i className="fas fa-star"></i> {property.hotelRating}
            </span>
          )}
        </div>
      </div>

      <div className="property-content">
        <div className="property-header">
          <div className="property-title">
            <h3>{property.name}</h3>
            <div className="property-location">
              <i className="fas fa-map-marker-alt"></i>
              <span>{property.city_id?.name}, {property.areaId?.name}</span>
            </div>
          </div>
          <div className="property-price-tag">
            <div className="price-amount">
              <span className="currency">{property.currency || '$'}</span>
              <span className="amount">{property.price}</span>
            </div>
            <span className="price-period">/night</span>
          </div>
        </div>

        <div className="property-features">
          <div className="feature">
            <i className="fas fa-bed"></i>
            <div className="feature-details">
              <span className="feature-value">{property.bedrooms?.length || 0}</span>
              <span className="feature-label">Bedrooms</span>
            </div>
          </div>
          <div className="feature">
            <i className="fas fa-bath"></i>
            <div className="feature-details">
              <span className="feature-value">{property.bathRooms?.length || 0}</span>
              <span className="feature-label">Bathrooms</span>
            </div>
          </div>
          <div className="feature">
            <i className="fas fa-ruler-combined"></i>
            <div className="feature-details">
              <span className="feature-value">{property.areaInSqft}</span>
              <span className="feature-label">sq ft</span>
            </div>
          </div>
        </div>

        {property.amenities && property.amenities.length > 0 && (
          <div className="property-amenities">
            <h4>Amenities</h4>
            <div className="amenities-grid">
              {property.amenities.slice(0, 6).map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <i className={renderAmenityIcon(amenity.name)}></i>
                  <span>{amenity.name}</span>
                </div>
              ))}
              {property.amenities.length > 6 && (
                <div className="amenity-item more">
                  <i className="fas fa-ellipsis-h"></i>
                  <span>+{property.amenities.length - 6} more</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="property-footer">
          <div className="rating-section">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <i 
                  key={star}
                  className={`fas fa-star ${star <= (property.ratingAverage || 0) ? 'active' : ''}`}
                />
              ))}
            </div>
            <span className="review-count">{property.ratingQuantity || 0} reviews</span>
          </div>
          <button className="view-details-btn">
            View Details
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
