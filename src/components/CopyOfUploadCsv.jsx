import { useState, useEffect } from "react";
import Papa from "papaparse";

export default function CopyOfUploadProducts() {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [existingStyleNumbers, setExistingStyleNumbers] = useState(new Set());

  useEffect(() => {
    const fetchExistingRecords = async () => {
      try {
        const response = await fetch("https://app.nocodb.com/api/v2/tables/m5fegjmoxwbg9d2/records?offset=0&limit=10000&where=&viewId=vwuer17umyyj7be5", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "xc-token": "-0XAccEvsn8koGW5MKQ79LoPj07lxk_1ldqDmuv1"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch existing records");
        }

        const result = await response.json();
        const styleNumbers = new Set(result.list.map(record => record.style_number));
        setExistingStyleNumbers(styleNumbers);
      } catch (error) {
        console.error("Error fetching existing records:", error);
      }
    };

    fetchExistingRecords();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const filteredData = csv.data.filter(row => Object.values(row).some(value => value !== ""));
        
        // Remove duplicate style_number entries
        const uniqueData = Array.from(new Map(filteredData.map(item => [item.style_number, item])).values());
        
        // Filter out already existing style_numbers
        const newRecords = uniqueData.filter(item => !existingStyleNumbers.has(item.style_number));
        
        setParsedData(newRecords);
      };
      reader.readAsText(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    if (parsedData.length === 0) {
      alert("All style numbers already exist in the database. No new records to add.");
      return;
    }

    try {
      const response = await fetch("https://app.nocodb.com/api/v2/tables/m5fegjmoxwbg9d2/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xc-token": "-0XAccEvsn8koGW5MKQ79LoPj07lxk_1ldqDmuv1"
        },
        body: JSON.stringify(parsedData)
      });

      if (!response.ok) {
        throw new Error("Failed to upload");
      }

      const result = await response.json();
      alert("File uploaded successfully!");
      setParsedData([]);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    }
  };

  return (
    <>
        <h2 className="text-center relative top-15 text-xl font-semibold text-blue-400">Upload New Products</h2>
      <div className="flex flex-col items-center border-gray-200 justify-center p-6 border rounded-lg max-w-xl mt-20 mx-auto">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mb-4 border p-2 rounded w-full border-gray-200"
        />
        <button onClick={handleUpload} className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg">
          Upload CSV
        </button>
      </div>
      <div className="mt-4 w-2xl mx-auto">
        <h3 className="text-lg font-semibold mb-2">Parsed Data Preview:</h3>
        <div className="overflow-auto max-h-60 border p-2 border-gray-200 rounded">
          <pre className="text-sm">{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      </div>
    </>
  );
}
