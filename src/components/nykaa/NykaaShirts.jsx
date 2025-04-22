import React, { useState } from "react";

const NykaaShirts = () => {
  const nykaa_shirts = JSON.parse(localStorage.getItem("nykaaListingData")) || [];

  if (nykaa_shirts.length === 0) {
    return <p className="text-center mt-4 text-xl text-red-400 animate-pulse">No data available !</p>;
  }

  // 🟢 Extracting headers dynamically
  const headers = Object.keys(nykaa_shirts[0]);

  // 🔥 Filter only those rows where "Pack Contains" is "1 Dress"
  const filteredDresses = nykaa_shirts.filter(item => item["Pack Contains"] === "1 Shirt");

  // 🟢 State for selected items
  const [selectedItems, setSelectedItems] = useState([]);

  if (filteredDresses.length === 0) {
    return <p className="text-center mt-40 text-2xl">No data found!</p>;
  }

  // 🟢 Function to toggle selection of individual product
  const toggleSelection = (index) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(index)
        ? prevSelected.filter(item => item !== index) // Remove if already selected
        : [...prevSelected, index] // Add if not selected
    );
  };

  // 🟢 Function to toggle Select All
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredDresses.length) {
      setSelectedItems([]); // Deselect all
    } else {
      setSelectedItems(filteredDresses.map((_, index) => index)); // Select all using index
    }
  };

  // 🟢 Function to Export Selected Data as CSV
  const exportSelectedToCSV = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one product to export!");
      return;
    }

    const csvRows = [];
    
    // 🟡 Add CSV Headers
    csvRows.push(headers.join(","));

    // 🔵 Add Selected Data Rows
    selectedItems.forEach(index => {
      const item = filteredDresses[index];
      const row = headers.map(header => `"${item[header] || ""}"`).join(",");
      csvRows.push(row);
    });

    // 🔥 Convert to CSV Blob & Download
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "nykaa_shirts.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // 🟢 Function to Delete Selected Products
  const deleteSelectedData = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one product to delete!");
      return;
    }

    const updatedData = nykaa_shirts.filter((_, index) => !selectedItems.includes(index));
    localStorage.setItem("nykaaListingData", JSON.stringify(updatedData));
    window.location.reload(); // Refresh page to update UI
  };

  return (
    <div>
      <div className="flex gap-4">
        <button 
          onClick={deleteSelectedData} 
          className="bg-red-400 cursor-pointer hover:bg-red-300 duration-75 ease-in text-white py-2 px-4 rounded-sm shadow-sm">
          Delete Selected
        </button>
        
        <button 
          onClick={exportSelectedToCSV} 
          className="bg-blue-400 cursor-pointer hover:bg-blue-300 duration-75 ease-in text-white py-2 px-4 rounded-sm shadow-sm">
          Export Selected
        </button>
      </div>

      <hr className="mt-2 text-gray-200 mb-2" />
      
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th className="border border-gray-100 px-2 py-2">
              <input 
                type="checkbox"
                checked={selectedItems.length === filteredDresses.length && filteredDresses.length > 0}
                onChange={toggleSelectAll}
              />
            </th>
            {headers.map((header, index) => (
                
              <th className="truncate border border-gray-100 px-2 py-2" key={index}>{header}</th>
              
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredDresses.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-100 text-center px-2 py-2">
                <input 
                  type="checkbox" 
                  checked={selectedItems.includes(index)}
                  onChange={() => toggleSelection(index)}
                />
              </td>
              {headers.map((header, i) => (
                <td className="truncate border border-gray-100 text-center px-2 py-2" key={i}>{item[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NykaaShirts;
