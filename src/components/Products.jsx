import { useGlobalContext } from "./ProductsService";
import { Link } from "react-router-dom";
import { useState } from "react";
import { generateNykaaListing } from "./ActionButton";
import GlobalFilter from "./GlobalFilter";
import { generateShopifyListing } from "./shopify/ShopifyActionButton";
// import { generateShopifyListingReport } from "./shopify/ShopifyLIsting";
import generateAjioShirtListing from "./ajio/AjioShirts";
import generateAjioTopstListing from  "./ajio/AjioTops";
import generateAjioDressListing from "./ajio/AjioDress"
import generateAjioJacketsListing from "./ajio/AjioJackets"
import generateAjioSkirtListing from "./ajio/AjioSkirts"
import generateAjioPlazosAndPantsListing from "./ajio/AjioPlazosAndPants"
import generateAjioShurgsListing from "./ajio/AjioShruges"
import { generateTatacliqListing } from "./tatacliq/TatacliqListing";
import { generateShoppersStopListing } from "./shoppersstop/ShoppersStopListing";
import { generateNykaaTopListing } from "./nykaa/NykaaTops";
import { generateNykaaShirtListing } from "./nykaa/NykaaShirts";
import { generateNykaaDressListing } from "./nykaa/NkyaaDresses";
import { generateNykaaJackeAndShrugeListing } from "./nykaa/NykaaJackets";

const Products = () => {
  const { products, loading } = useGlobalContext();
  const [selectedData, setSelectedData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("");

  // Handle checkbox selection
  const handleCheckboxChange = (product) => {
    setSelectedData((prevSelected) =>
      prevSelected.includes(product)
        ? prevSelected.filter((p) => p !== product)
        : [...prevSelected, product]
    );
  };

  const categories = [
    { name: "AJIO TOP" ,action: ()=>generateAjioTopstListing(selectedData)},
    { name: "AJIO SHIRT",action:()=> generateAjioShirtListing(selectedData) },
    { name: "AJIO DRESS",action:()=> generateAjioDressListing(selectedData) },
    { name: "AJIO SKIRT",action:()=> generateAjioSkirtListing(selectedData) },
    { name: "AJIO JACKETS",action:()=> generateAjioJacketsListing(selectedData) },
    { name: "AJIO PLAZOS & PANTS",action:()=> generateAjioPlazosAndPantsListing(selectedData) },
    { name: "AJIO SHRUG",action:()=> generateAjioShurgsListing(selectedData) },
  ];

  const myntraCategory = [
    { name: "MYNTRA TOP" },
    { name: "MYNTRA SHIRT" },
    { name: "MYNTRA DRESS" },
    { name: "MYNTRA SKIRT" },
    { name: "MYNTRA JACKETS" },
    { name: "MYNTRA PLAZOS & PANTS" },
  ];


  const nykaaCategory = [
    {name:"NYKAA TOP",action:()=>generateNykaaTopListing(selectedData)},
    {name:"NYKAA SHIRT" , action:()=>generateNykaaShirtListing(selectedData)},
    {name:"NYKAA DRESS" , action:()=>generateNykaaDressListing(selectedData)},
    {name:"NYKAA JACKET", action:()=> generateNykaaJackeAndShrugeListing(selectedData)},
    {name:"NYKAA SKIRT" , action:()=> alert("Nykaa skirt")},
    {name:"NYKAA CO-ORDS",action:()=>alert("Nykaa co-ords set")}
  ]



  const channels = [
    { name: "TATACLIQ",action:()=>generateTatacliqListing(selectedData) },
    { name: "SHOPPERSSTOP",action:()=>generateShoppersStopListing(selectedData) },
    { name: "SHOPIFY",action:()=>generateShopifyListing(selectedData)},

  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
  {/* Header Section */}
  <div className="mb-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Product Catalogue</h3>
    
    {/* Action Buttons Section */}
    <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100">
      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Category Filters</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Ajio Category */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Ajio Category</label>
          <select
            className="w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
            value={selectedCategory}
            onChange={(e) => {
              const selected = categories.find((item) => item.name === e.target.value);
              setSelectedCategory(e.target.value);
              if (selected?.action) selected.action();
            }}
          >
            <option value="">Select Ajio category</option>
            {categories.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Nykaa Category */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Nykaa Category</label>
          <select
            className="w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
            value={selectedCategory}
            onChange={(e) => {
              const selected = nykaaCategory.find((item) => item.name === e.target.value);
              setSelectedCategory(e.target.value);
              if (selected?.action) selected.action();
            }}
          >
            <option value="">Select Nykaa category</option>
            {nykaaCategory.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Myntra Category */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Myntra Category</label>
          <select
            className="w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Myntra category</option>
            {myntraCategory.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Channel Selector */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Sales Channel</label>
          <select
            className="w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2 px-3 border"
            value={selectedChannel}
            onChange={(e) => {
              const selected = channels.find((item) => item.name === e.target.value);
              setSelectedCategory(e.target.value);
              if (selected?.action) selected.action();
            }}
          >
            <option value="">Select channel</option>
            {channels.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
        </div>
        <div className="flex gap-3 items-center ">
          <GlobalFilter />
          <Link to="/upload-product" className="truncate bg-blue-400 text-white hover:bg-blue-300 duration-75 py-2 w-65 px-4 rounded-md shadow ">Upload New Products </Link>
        </div>
    
  </div>

  {/* Table Section */}
  <div className="overflow-hidden border border-gray-200 rounded-lg">
    <div className="">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                onChange={(e) => setSelectedData(e.target.checked ? products : [])}
                checked={selectedData.length === products.length && products.length > 0}
              />
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Style Number
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pattern
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              MRP
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Color
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fabric
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Closure
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Front Length
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sleeve Length
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan="13" className="px-6 py-4 text-center">
                <div className="flex justify-center items-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading products...</span>
                </div>
              </td>
            </tr>
          ) : (
            products.map((product, i) => (
              <tr key={product.style_number} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    onChange={() => handleCheckboxChange(product)}
                    checked={selectedData.includes(product)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {i + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.style_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.style_type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.style_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                  <a href={product.style_image} target="_blank" rel="noopener noreferrer" className="truncate max-w-xs block">
                    View Image
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.pattern_number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ₹{product.mrp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.color}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.fabric}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                  {product.closure}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.front_length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.sleeve_length}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
};

export default Products;
