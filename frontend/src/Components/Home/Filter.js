import React, { useEffect, useState } from "react";
import FilterModal from "./FilterModal";
import { UseDispatch, useDispatch } from "react-redux";
import { getAllProperties } from "../../Store/Property/property-action";
import { propertyAction } from "../../Store/Property/property-slice";

const Filter = () => {
  //for controlling modal visibility (pop up for filter)
  const [isModalOpen, setIsModalOpen] = useState(false); //by default false/closed,,, store selected filters
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(propertyAction.updateSearchParams(selectedFilters));
    dispatch(getAllProperties());
  }, [selectedFilters, dispatch]);

  //function to handle opening the modal(popup)
  const handleOpenModal = () => {
    setIsModalOpen(true); //open the modal, sets is Modal true
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); //close the modal
  };

  //function to handle changes in filter
  const handleFilterChange = (filterName, value) => {
    //update the selected filters with new values
    setSelectedFilters((prevFilters) => ({
      ...prevFilters, //spread operator,,,keeps track of other filters
      [filterName]: value,
    }));
  };

  return (
    <>
      {/* onClick is method for click event to open modal*/}
      <span class="material-symbols-outlined filter" onClick={handleOpenModal}>
        Filter_Alt
      </span>
      {isModalOpen && (
        <FilterModal
          selectedFilters={selectedFilters} //passes the selected filters to modal
          onFilterChange={handleFilterChange}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Filter;
