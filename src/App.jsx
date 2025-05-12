import React from 'react'
import { ProductsProvider } from './components/ProductsService'
import Products from './components/Products'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import NykaaListing from './components/nykaa/NykaaListing'
import Sidebar from './components/Sidebar'
import UploadProducts from './components/UploadProducts'


const App = () => {
  return (
    <ProductsProvider>
      {/* <BrowserRouter>
      <div className="flex h-screen">
      <Sidebar/>
      <div className="ml-64 flex-1 p-5">
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/nykaa-listing' element={<NykaaListing/>}/>
        <Route path='/upload-products' element={<UploadProducts/>}/>
      
      </Routes>
      </div>
      </div>
      </BrowserRouter> */}
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/upload-product' element={<UploadProducts/>}/>
      </Routes>
      </BrowserRouter>

    </ProductsProvider>
  )
}

export default App