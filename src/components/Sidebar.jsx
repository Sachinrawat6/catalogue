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
          <Link to="/" className="hover:text-gray-300">
            Products
          </Link>
        </li>
       

        {/* Nykaa Listing with Dropdown */}
      

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
