import React from "react";
import Select from "react-select";

const CustomSelect = ({ options, label, onChange }) => {
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "rgb(82, 81, 95)",
      borderRadius: "50em",
      width: "100%", 
      cursor: "pointer",
      color: "#efe3facc",
      borderColor: "#6b7280",
      height: "45px",
      minHeight: "45px",
      marginTop: "1px",
      paddingTop: "5px",
      paddingBottom: "5px",
      paddingLeft: '2em'
    }),
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? "#C4C0C0" : "rgb(82, 81, 95)",
        color: isDisabled ? "#efe3facc" : "#efe3facc",
        cursor: isDisabled ? "not-allowed" : "pointer",
        width: "100%",
        height: "100%",
      };
    },
    singleValue: (styles) => ({
      ...styles,
      color: "#efe3facc",
      fontSize: "20px",
    }),
    dropdownIndicator: (styles) => ({
      ...styles,
      color: "#efe3facc",
      fontSize: "20px",
    }),
  };

  return (
    <Select
      label={label}
      options={options}
      styles={colourStyles}
      isSearchable={false}
      onChange={onChange}
      defaultValue={options[0]}
      className="w-full text-start"
    />
  );
};

export default CustomSelect;
