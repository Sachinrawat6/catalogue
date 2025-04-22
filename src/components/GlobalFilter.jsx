import React, { useState } from "react";
import { useGlobalContext } from "./ProductsService";

const GlobalFilter = () => {
  const { setFilters } = useGlobalContext();

  // 🟢 States for filters
  const [styleNumbers, setStyleNumbers] = useState([]);
  const [styleTypes, setStyleTypes] = useState([]);
  const [patternNumbers, setPatternNumbers] = useState([]);

  // 🟢 Handle Enter Key Press for Inputs
  const handleKeyDown = (e, filterType) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newValue = e.target.value.trim().toLowerCase();

      if (!newValue) return; // If empty, return

      let updatedValues;
      if (filterType === "style_number") {
        updatedValues = [...new Set([...styleNumbers, newValue])]; // Avoid duplicates
        setStyleNumbers(updatedValues);
      } else if (filterType === "style_type") {
        updatedValues = [...new Set([...styleTypes, newValue])];
        setStyleTypes(updatedValues);
      } else if (filterType === "pattern_number") {
        updatedValues = [...new Set([...patternNumbers, newValue])];
        setPatternNumbers(updatedValues);
      }

      // 🟢 Update Global Filter
      setFilters((prev) => ({
        ...prev,
        [filterType]: updatedValues, // 🟢 Save as an array instead of string
      }));

      e.target.value = ""; // 🧹 Clear input after adding
    }
  };

  // 🟢 Function to Remove a Filter
  const removeFilter = (filterType, value) => {
    let updatedValues;
    if (filterType === "style_number") {
      updatedValues = styleNumbers.filter((num) => num !== value);
      setStyleNumbers(updatedValues);
    } else if (filterType === "style_type") {
      updatedValues = styleTypes.filter((type) => type !== value);
      setStyleTypes(updatedValues);
    } else if (filterType === "pattern_number") {
      updatedValues = patternNumbers.filter((num) => num !== value);
      setPatternNumbers(updatedValues);
    }

    // 🟢 Update Global Filter
    setFilters((prev) => ({
      ...prev,
      [filterType]: updatedValues, // 🟢 Keep as an array
    }));
  };

  return (
    <div className="  px-4 flex flex-col items-center py-2  gap-2 w-[90vw]">
        <div className="flex gap-2 justify-center items-center  px-4 rounded-sm">
      {/* 🟢 Input Fields */}
      <input
        type="text"
        placeholder="Style Number..."
        onKeyDown={(e) => handleKeyDown(e, "style_number")}
        className="p-2 border border-gray-300 rounded-md w-full max-w-xs outline-gray-400 bg-white"
      />
      <input
        type="text"
        placeholder="Style Type..."
        onKeyDown={(e) => handleKeyDown(e, "style_type")}
        className="p-2 border border-gray-300 rounded-md w-full max-w-xs outline-gray-400 bg-white"
      />
      <input
        type="text"
        placeholder="Pattern Number... "
        onKeyDown={(e) => handleKeyDown(e, "pattern_number")}
        className="p-2 border border-gray-300 rounded-md  outline-gray-400 bg-white"
      />
      </div>

      {/* 🟢 Selected Filters Display */}
      <div className="flex flex-wrap gap-2 mt-2">
        {styleNumbers.map((num, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full cursor-pointer"
            onClick={() => removeFilter("style_number", num)}
          >
            {num} ❌
          </span>
        ))}
        {styleTypes.map((type, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full cursor-pointer"
            onClick={() => removeFilter("style_type", type)}
          >
            {type} ❌
          </span>
        ))}
        {patternNumbers.map((num, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full cursor-pointer"
            onClick={() => removeFilter("pattern_number", num)}
          >
            {num} ❌
          </span>
        ))}
      </div>
    </div>
  );
};

export default GlobalFilter;
