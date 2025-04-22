import { useGlobalContext } from "./ProductsService";
import { Link } from "react-router-dom";
import { useState } from "react";
import { generateNykaaListing } from "./ActionButton";
import GlobalFilter from "./GlobalFilter";
// import { generateShopifyListing } from "./shopify/ShopifyActionButton";
import { generateShopifyListingReport } from "./shopify/ShopifyLIsting";
import generateAjioShirtListing from "./ajio/AjioShirts";
import generateAjioTopstListing from  "./ajio/AjioTops";
import generateAjioDressListing from "./ajio/AjioDress"
import generateAjioJacketsListing from "./ajio/AjioJackets"
import generateAjioSkirtListing from "./ajio/AjioSkirts"
import generateAjioPlazosAndPantsListing from "./ajio/AjioPlazosAndPants"
import generateAjioShurgsListing from "./ajio/AjioShruges"
import { generateTatacliqListing } from "./tatacliq/TatacliqListing";
import { generateShoppersStopListing } from "./shoppersstop/ShoppersStopListing";

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

  

  // const buttons = [
  //   { name: "Nykaa", action:  () => generateNykaaListing(selectedData) },
  //   { name: "Myntra", action:  () => generateShopifyListing() },
  //   { name: "Shopify", action:  () => generateShopifyListing(selectedData) },
  //   { name: "Ajio", action:  () => generateAjioShirtListing(selectedData) },
  //   { name: "Tatacliq", action:  () => generateNykaaListing() },
  //   { name: "Shoppersstop", action:  () => generateNykaaListing() },
  //   { name: "Nykaa +", action:  () => generateNykaaListing() },
  //   { name: "Myntra +", action:  () => generateNykaaListing() },
  //   { name: "Ajio +", action:  () => generateNykaaListing() },
  //   { name: "Tatacliq +", action:  () => generateNykaaListing() },
  //   { name: "Shoppersstop +", action:  () => generateNykaaListing() },
  //   { name: "Edit", action:  () => generateNykaaListing() },
  //   { name: "Delete", action:  () => generateNykaaListing() },
  //   { name: "Update", action:  () => generateNykaaListing() },
  // ];

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

  const channels = [
    { name: "TATACLIQ",action:()=>generateTatacliqListing(selectedData) },
    { name: "SHOPPERSSTOP",action:()=>generateShoppersStopListing(selectedData) },
    // { name: "SHOPIFY",action:()=>generateShopifyListing(selectedData) },
    { name: "SHOPIFY",action:()=>generateShopifyListingReport(selectedData)},

    { name: "NYKAA",action:()=>generateNykaaListing(selectedData) },
  ];

  return (
    <div>
        <h3 className="text-xl font-semibold mb-2 text-blue-400">Action Buttons </h3>
      <div className="p-4 flex gap-4 items-center justify-center bg-gray-200 rounded-md shadow-[6px] ">
        <div>
         
          <select
            className="mt-1 block p-2 cursor-pointer border  bg-white border-gray-200 rounded-lg focus:ring focus:ring-indigo-300"
            value={selectedCategory}
            onChange={(e) => {
              const selected = categories.find((item) => item.name === e.target.value);
              setSelectedCategory(e.target.value);
              if (selected && selected.action) {
                selected.action();
              }
            }}
          >
            <option value="">-- Choose Ajio category --</option>
            {categories.map((item, index) => (
              <option key={index} value={item.name} onClick={item.action}  >
                

                {item.name}
                
              </option>
            ))}
          </select>
        </div>

        {/* MYNTRA CATEGORY BUTTONS  */}
        <div>
         
          <select
            className="mt-1 block p-2 border cursor-pointer rounded-lg bg-white border-gray-200 focus:ring focus:ring-indigo-300"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" className="cursor-pointer">-- Choose Myntra category --</option>
            {myntraCategory.map((item, index) => (
              <option key={index} value={item.name} className="cursor-pointer">
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          
          <select
            className="mt-1 block p-2 border rounded-lg  bg-white border-gray-200 focus:ring focus:ring-indigo-300"
            value={selectedChannel}
            onChange={(e) => {
              const selected = channels.find((item) => item.name === e.target.value);
              setSelectedCategory(e.target.value);
              if (selected && selected.action) {
                selected.action();
              }
            }}
          >
            <option value="">-- Choose a channel --</option>
            {channels.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr className="my-3 text-gray-300" />

      <GlobalFilter />
      {/* Table */}
      <div className="overflow-x-auto text-[14px]">
        <table className="min-w-full bg-white border border-gray-50">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 border-gray-200 border">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setSelectedData(e.target.checked ? products : []);
                  }}
                  checked={selectedData.length === products.length}
                />
              </th>
              <th className="p-2 truncate border-gray-200 border">
                Product Id
              </th>
              <th className="p-2 truncate border-gray-200 border">
                Style Number
              </th>
              <th className="p-2 truncate border-gray-200 border">
                Style Type
              </th>
              <th className="p-2 truncate border-gray-200 border">
                Style Name
              </th>
              <th className="p-2 truncate border-gray-200 border">
                Style Image
              </th>
              <th className="p-2 truncate border-gray-200 border">
                Pattern Number
              </th>
              <th className="p-2 truncate border-gray-200 border">MRP</th>
              <th className="p-2 truncate border-gray-200 border">Color</th>
              <th className="p-2 truncate border-gray-200 border">Fabric</th>
              <th className="p-2 truncate border-gray-200 border">Closure</th>
              <th className="p-2 truncate border-gray-200 border">
                Front Length
              </th>
              <th className="p-2 truncate border-gray-200 border">
                Sleeve Length
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="13" className="text-center animate-pulse p-4">
                  Loading...
                </td>
              </tr>
            ) : (
              products.map((product, i) => (
                <tr
                  key={product.style_number}
                  className="hover:bg-gray-100 duration-75 ease-in text-center"
                >
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(product)}
                      checked={selectedData.includes(product)}
                    />
                  </td>
                  <td className="p-2 border border-gray-200">{i + 1}</td>
                  <td className="p-2 border border-gray-200">
                    {product.style_number}
                  </td>
                  <td className="p-2 border border-gray-200">
                    {product.style_type}
                  </td>
                  <td className="p-2 border border-gray-200 ">
                    {product.style_name}
                  </td>
                  <td className="p-2 border border-gray-200  grid items-center justify-center ">
                    <Link
                      to={product.style_image}
                      target="_blank"
                      className=" text-blue-600 truncate"
                    >
                      {product.style_image}
                    </Link>
                  </td>
                  <td className="p-2 border border-gray-200">
                    {product.pattern_number}
                  </td>
                  <td className="p-2 border border-gray-200">{product.mrp}</td>
                  <td className="p-2 border border-gray-200">
                    {product.color}
                  </td>
                  <td className="p-2 border border-gray-200">
                    {product.fabric}
                  </td>
                  <td className="p-2 border border-gray-200 truncate">
                    {product.closure}
                  </td>
                  <td className="p-2 border border-gray-200">
                    {product.front_length}
                  </td>
                  <td className="p-2 border border-gray-200">
                    {product.sleeve_length}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
