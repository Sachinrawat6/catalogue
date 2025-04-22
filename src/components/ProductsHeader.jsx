import React from 'react'

const ProductsHeader = () => {
  return (
   <table>
     <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-2 border">Style Number</th>
              <th className="p-2 border">Style Type</th>
              <th className="p-2 border">Style Name</th>
              <th className="p-2 border">Style Image</th>
              <th className="p-2 border">Pattern Number</th>
              <th className="p-2 border">MRP</th>
              <th className="p-2 border">Color</th>
              <th className="p-2 border">Fabric</th>
              <th className="p-2 border">Closure</th>
              <th className="p-2 border">Front Length</th>
              <th className="p-2 border">Sleeve Length</th>
            </tr>
          </thead>
   </table>
  )
}

export default ProductsHeader