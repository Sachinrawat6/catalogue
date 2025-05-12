import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
      <nav className="bg-gray-50 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="#" className="text-gray-700 text-xl font-bold">Cataloging</Link>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-700 hover:text-gray-600">Products</Link>
            </li>
            <li>
              <Link to="/nykaa-listing" className="text-wite hover:text-gray-600">Listing Reports</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  