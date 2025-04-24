// Utility to match detected amenities with predefined list
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
  { _id: "66e057d33098ed8a798771", title: "Outdoor Dining or Lounge Area" },
  { _id: "66e0582b3098ed8a798772", title: "Children's Play Area" },
  { _id: "66e058913098ed8a798773", title: "Private Parking or Carports" },
  { _id: "66e058fd3098ed8a798774", title: "Golf Course Views" },
  { _id: "66e059413098ed8a798775", title: "Infinity Pool" },
  { _id: "66e0599d3098ed8a798776", title: "Tennis Court, Squash Court or Basketball Court" },
  { _id: "66e059ed3098ed8a798777", title: "24/7 Security and Concierge Services" },
  { _id: "66e05a2a3098ed8a798778", title: "Access to Swimming Pool" },
  { _id: "66e05a653098ed8a798779", title: "Gymnasium or Fitness Center" },
  { _id: "66e05aa43098ed8a79877a", title: "Spa and Sauna Facilities" },
  { _id: "66e05b0c3098ed8a79877b", title: "Conference Rooms or Business Centers" },
  { _id: "66e05b413098ed8a79877c", title: "Pet-friendly facilities (dog parks, pet grooming)" },
  { _id: "66e05b7a3098ed8a79877d", title: "Gated Community or Secure Entry Systems" },
  { _id: "66e05bb83098ed8a79877e", title: "Valet Parking and Guest Parking" },
  { _id: "66e05be83098ed8a79877f", title: "Multi-purpose Hall or Event Space" },
  { _id: "66e05c203098ed8a798780", title: "Bicycle Racks and Jogging Tracks" },
  { _id: "66e05c5d3098ed8a798781", title: "Restaurants, Cafés, or Retail Shops within the community" },
  { _id: "66e05c9f3098ed8a798782", title: "On-site Supermarket" },
  { _id: "66e05cd73098ed8a798783", title: "Community Parks and Green Spaces" },
  { _id: "66e05d0a3098ed8a798784", title: "Access to Public Transportation" },
  { _id: "66e05d3f3098ed8a798785", title: "Waste Management Systems" },
  { _id: "66e05d713098ed8a798786", title: "Electric Car Charging Stations" },
  { _id: "66e05db93098ed8a798787", title: "Walk-in Closets or Built-in Wardrobes" },
  { _id: "66e05ded3098ed8a798788", title: "Home Office or Study Room" },
  { _id: "66e05e2b3098ed8a798789", title: "Private Elevator" },
];

/**
 * Filters detected amenities against predefined list
 * @param {Array} detectedAmenities
 * @returns {Array}
 */
const matchAmenities = (detectedAmenities) => {
  if (!detectedAmenities || !Array.isArray(detectedAmenities) || detectedAmenities.length === 0) {
    return [];
  }
  const detectedLower = detectedAmenities.map(amenity =>
    typeof amenity === 'string' ? amenity.toLowerCase() :
    (amenity.name ? amenity.name.toLowerCase() : '')
  );
  return AMENITIES_LIST.filter(listItem => {
    const titleLower = listItem.title.toLowerCase();
    return detectedLower.some(detected =>
      detected.includes(titleLower) || titleLower.includes(detected)
    );
  });
};

export default matchAmenities;
