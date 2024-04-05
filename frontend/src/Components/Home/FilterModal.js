import React, { useEffect, useState } from "react";
import Proptypes from "prop-types"; //imported for type checking props
import "../../CSS/FilterModal.css";
import "react-input-range/lib/css/index.css"; //cssfile for input range styling
import InputRange from "react-input-range";

const FilterModal = ({ selectedFilters, onFilterChange, onClose }) => {
  const [priceRange, setPriceRange] = useState({
    min: selectedFilters.priceRange?.min || 600, //what we choose or default 600 is chosen as minimum, same with max
    max: selectedFilters.priceRange?.max || 30000,
  });

  const [propertyType, setPropertyType] = useState(
    selectedFilters.propertyType || "" //by default property type is empty
  );

  const [roomType, setRoomType] = useState(selectedFilters.roomType || "");

  const [amenities, setAmenities] = useState(selectedFilters.amenities || []);

  //useEffect hook is used to update changes when selected Filter state changes
  useEffect(() => {
    setPriceRange({
      min: selectedFilters.priceRange?.min || 600,
      max: selectedFilters.priceRange?.max || 30000,
    });

    setPropertyType(selectedFilters.propertyType || "");

    setRoomType(selectedFilters.roomType || "");

    setAmenities(selectedFilters.amenities || []); //amenities is an array of amenities containing amenities such as wifi ac etc,,, it is stored in form of array
  }, [selectedFilters]);

  //fuctions to handle changes in price range
  const handlePriceRangeChange = (value) => {
    setPriceRange(value); //updates price range state
  };

  //func to handle min value
  const handleMinInputChange = (e) => {
    const minValue = parseInt(e.target.value, 10);
    setPriceRange((prev) => ({ ...prev, min: minValue }));
  };

  //func to handle max value
  const handleMaxInputChange = (e) => {
    const maxValue = parseInt(e.target.value, 10);
    setPriceRange((prev) => ({ ...prev, max: maxValue }));
  };

  //func to handle filter change
  const handleFilterChange = () => {
    onFilterChange("minPrice", priceRange.min);
    onFilterChange("maxPrice", priceRange.max);
    onFilterChange("propertyType", propertyType);
    onFilterChange("roomType", roomType);
    onFilterChange("amenities", amenities);
    onClose(); //closes the modal
  };

  //options for property types
  const propertyTypeOptions = [
    {
      value: "House",
      label: "House",
      icon: "home",
    },
    {
      value: "Flat",
      label: "Flat",
      icon: "apartment",
    },
    {
      value: "Guest House",
      label: "Guest House",
      icon: "hotel",
    },
    {
      value: "Hotel",
      label: "Hotel",
      icon: "meeting_room",
    },
  ];

  //options for roomtypes
  const roomTypeOptions = [
    {
      value: "Entire Home",
      label: "Entire Room",
      icon: "hotel",
    },
    {
      value: "Room",
      label: "Room",
      icon: "meeting_room",
    },
    {
      value: "Any Type",
      label: "Any Type",
      icon: "apartment",
    },
  ];

  //amenities
  const amenitiesTypeOptions = [
    {
      value: "Wifi",
      label: "Wifi",
      icon: "wifi",
    },{
      value: "Kitchen",
      label: "Kitchen",
      icon: "kitchen",
    },{
      value: "AC",
      label: "AC",
      icon: "ac_unit",
    },{
      value: "Washing Machine",
      label: "Washing Machine",
      icon: "local_laundry_service",
    },{
      value: "TV",
      label: "TV",
      icon: "tv",
    },{
      value: "Pool",
      label: "Pool",
      icon: "pool",
    },{
      value: "Free Parking",
      label: "Free Parking",
      icon: "local_parking",
    },
  ];

  //function to handle clearing filters
  const handleClearFilters = () => {
    setPriceRange({ min: 600, max: 30000 }); //reset price range
    setPropertyType(""); //empty string,,, reset property type
    setRoomType("");
    setAmenities([]);
  };

  //function to handle changes in amenities
  const handleAmenitiesChange = (selectedAmenities) => {
    setAmenities((prevAmenities) =>
      prevAmenities.includes(selectedAmenities)
        ? prevAmenities.filter((item) => item !== selectedAmenities)
        : [...prevAmenities, selectedAmenities]
    );
  };

  //function to handle changes in property type
  const handlePropertyTypeChange = (seletedType) => {
    setPropertyType((prevType) =>
      prevType === seletedType ? "" : seletedType
    );
  };

  //func to handle room type
  const handleRoomTypeChange = (seletedType) => {
    setRoomType((prevType) => (prevType === seletedType ? "" : seletedType));
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h4>
          Filters <hr />
        </h4>
        <button className="close-button" onClick={onClose}>
          <span>&times;</span>
        </button>

        {/* filter sections */}
        <div className="modal-filters-container">
          <div className="filter-section">
            <label>Price Range:</label>
            <InputRange
              minValue={600}
              maxValue={30000}
              value={priceRange}
              onChange={handlePriceRangeChange}
            />
            <div className="range-inputs">
              <input
                type="number"
                value={priceRange.min}
                onChange={handleMinInputChange}
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={handleMaxInputChange}
              />
            </div>
          </div>

          {/* for property type filter */}
          <div className="filter-section">
            <label>Property Type:</label>
            <div className="icon-box">
              {propertyTypeOptions.map((options) => (
                <div
                  key={options.value}
                  className={`selectable-box ${
                    propertyType === options.value ? "selected" : ""
                  }`}
                  onClick={() => handlePropertyTypeChange(options.value)}
                >
                  <span className="material-icons">{options.icon}</span>
                  <span>{options.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* room type filter */}
          <div className="filter-section">
            <label>Room Type:</label>
            <div className="icon-box">
              {roomTypeOptions.map((options) => (
                <div
                  key={options.value}
                  className={`selectable-box ${
                    roomType === options.value ? "selected" : ""
                  }`}
                  onClick={() => handleRoomTypeChange(options.value)}
                >
                  <span className="material-icons">{options.icon}</span>
                  <span>{options.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* amenities filter */}
          <div className="filter-section">
            <label>Amenities:</label>
            <div className="amenities-checkboxes">
              {amenitiesTypeOptions.map((options) => (
                <div key={options.value} className="amenity-checkbox">
                  {console.log(amenities.includes(options.value))}
                  <input
                    type="checkbox"
                    value={options.value}
                    checked={amenities.includes(options.value)}
                    onChange={() => handleAmenitiesChange(options.value)}
                  />
                  <span className="material-icons amenitieslabel">
                    {options.icon}
                  </span>
                  <span>{options.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* filter action for buttons */}
          <div className="filter-buttons">
            <button className="clear-button" onClick={handleClearFilters}>
              Clear
            </button>

            <button onClick={handleFilterChange}>Apply Filters</button>
          </div>
        </div>
      </div>
    </div>
  );
};

//to check if given properties are of given types only then it accepts otherwise throws error
FilterModal.propTypes = {
  selectedFilters:Proptypes.object.isRequired,
  onFilterChange: Proptypes.func.isRequired,
  onClose: Proptypes.func.isRequired
}

export default FilterModal;