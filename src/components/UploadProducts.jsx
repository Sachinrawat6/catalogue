import { useState, useEffect } from "react";
import Papa from "papaparse";
import { Link } from "react-router-dom";

export default function UploadProducts() {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [existingStyleNumbers, setExistingStyleNumbers] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchExistingRecords = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingRecords();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const filteredData = csv.data.filter(row => Object.values(row).some(value => value !== ""));
        
        // Remove duplicate style_number entries
        const uniqueData = Array.from(new Map(filteredData.map(item => [item.style_number, item])).values());
        
        // Filter out already existing style_numbers
        const newRecords = uniqueData.filter(item => !existingStyleNumbers.has(item.style_number));
        
        setParsedData(newRecords);
        setIsLoading(false);
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

    setIsLoading(true);
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
      alert("Products uploaded successfully!");
      setParsedData([]);
      setFile(null);
      // Refresh existing style numbers
      const styleNumbers = new Set([...existingStyleNumbers, ...parsedData.map(item => item.style_number)]);
      setExistingStyleNumbers(styleNumbers);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <div className="my-4  mx-8">
        <Link to="/" className=" bg-blue-200 py-2 px-4 rounded-md shadow">Back</Link>
      </div>
    
    <div className="max-w-4xl mx-auto p-6">
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
          Product Inventory Upload
        </h2>
        
        <div className="mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CSV File Selection
            </label>
            <div className="flex items-center">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                disabled={isLoading}
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Upload a CSV file containing product information. Only new products will be added.
            </p>
            <p className="mt-4">
              <a href="Product_Sample_Template.csv" className="text-white py-2 px-4 bg-blue-400 rounded-md">Download Template File</a>
            </p>
          </div>

          <button 
            onClick={handleUpload} 
            disabled={isLoading || parsedData.length === 0}
            className={`px-4 py-2 rounded-md text-sm font-medium text-white 
              ${isLoading || parsedData.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isLoading ? 'Processing...' : 'Upload Products'}
          </button>
        </div>

        {parsedData.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-900">
                Preview ({parsedData.length} new products)
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Ready for upload
              </span>
            </div>
            <div className="overflow-auto max-h-96 border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(parsedData[0] || {}).map((key) => (
                      <th
                        key={key}
                        scope="col"
                        className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {parsedData.slice(0, 5).map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((value, j) => (
                        <td
                          key={j}
                          className="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {parsedData.length > 5 && (
                    <tr>
                      <td colSpan={Object.keys(parsedData[0] || {}).length} className="px-3 py-2 text-center text-xs text-gray-500">
                        ... and {parsedData.length - 5} more records
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}