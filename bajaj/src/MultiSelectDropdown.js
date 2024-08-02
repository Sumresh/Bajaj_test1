import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const MultiSelectDropdown = ({ options }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleOptionChange = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        return prevSelectedOptions.filter(
          (selectedOption) => selectedOption !== option
        );
      } else {
        return [...prevSelectedOptions, option];
      }
    });
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} multi className="w-100">
      <DropdownToggle caret className="w-100">
        {selectedOptions.length > 0
          ? selectedOptions.join(", ")
          : "Select Options"}
      </DropdownToggle>
      <DropdownMenu className="w-100">
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => handleOptionChange(option)}>
            <input
              type="checkbox"
              checked={selectedOptions.includes(option)}
              onChange={() => handleOptionChange(option)}
              className="me-2"
            />
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default MultiSelectDropdown;
