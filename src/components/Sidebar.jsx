import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";
import {
  FaList,
  FaChevronDown,
  FaChevronUp,
  FaCloudUploadAlt,
} from "react-icons/fa";
import { GiLargeDress } from "react-icons/gi";
import { IoIosShirt } from "react-icons/io";
import { GiPirateCoat } from "react-icons/gi";
import { TbShirtFilled } from "react-icons/tb";
import { GiSkirt } from "react-icons/gi";
import { GiTShirt } from "react-icons/gi";

const Sidebar = () => {
  const [isNykaaOpen, setIsNykaaOpen] = useState(false);

  return (
    <div className="w-64 bg-gray-800 text-white fixed h-full p-5">
      <h2 className="text-xl font-bold mb-4">Products Catalog</h2>
      <hr className="text-gray-600" />
      <ul className="mt-4">
        <li className="mb-2 flex gap-3 items-center">
          <AiFillProduct className="text-2xl" />
          <Link to="/products" className="hover:text-gray-300">
            Products
          </Link>
        </li>
        {/* <li className="mb-2 flex gap-3 items-center">
          <FaList className="text-xl" />
          <Link to="/listing/shopify" className="hover:text-gray-300">
            Shopify Listing
          </Link>
        </li> */}

        {/* Nykaa Listing with Dropdown */}
        <li className="mb-2">
          <div
            className="flex items-center justify-between cursor-pointer hover:text-gray-300"
            onClick={() => setIsNykaaOpen(!isNykaaOpen)}
          >
            <div className="flex gap-3 items-center">
              <FaList className="text-xl" />
              <span>Nykaa Listing</span>
            </div>
            {isNykaaOpen ? (
              <FaChevronUp className="text-sm" />
            ) : (
              <FaChevronDown className="text-sm" />
            )}
          </div>

          {/* Dropdown Links */}
          {isNykaaOpen && (
            <ul className="ml-6 mt-2 space-y-2">
              <li className="mb-2 flex gap-3 items-center">
                {" "}
                <GiLargeDress />{" "}
                <Link
                  to="/nykaa-listing/dresses"
                  className="hover:text-gray-300"
                >
                  Dresses
                </Link>
              </li>
              <li className="mb-2 flex gap-3 items-center">
                <IoIosShirt />
                <Link to="/nykaa-listing/tops" className="hover:text-gray-300">
                  Tops
                </Link>
              </li>
              <li className="mb-2 flex gap-3 items-center">
                <GiPirateCoat />
                <Link
                  to="/nykaa-listing/jackets"
                  className="hover:text-gray-300"
                >
                  Jackets
                </Link>
              </li>
              <li className="mb-2 flex gap-3 items-center">
                <GiTShirt />
                <Link
                  to="/nykaa-listing/co-ords"
                  className="hover:text-gray-300"
                >
                  Co-ords
                </Link>
              </li>
              <li className="mb-2 flex gap-3 items-center">
                <TbShirtFilled />
                <Link
                  to="/nykaa-listing/shirts"
                  className="hover:text-gray-300"
                >
                  Shirts
                </Link>
              </li>
              <li className="mb-2 flex gap-3 items-center">
                <GiSkirt />
                <Link
                  to="/nykaa-listing/skirts"
                  className="hover:text-gray-300"
                >
                  Skirts
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="mb-2 flex gap-3 items-center">
          <FaCloudUploadAlt className="text-xl" />
          <Link to="/upload-products" className="hover:text-gray-300">
            Upload New
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
