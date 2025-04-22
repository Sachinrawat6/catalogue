import React from 'react'
import { ProductsProvider } from './components/ProductsService'
import Products from './components/Products'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import NykaaListing from './components/nykaa/NykaaListing'
import Sidebar from './components/Sidebar'
import UploadProducts from './components/UploadProducts'
import NkyaaDresses from './components/nykaa/NkyaaDresses'
import NykaaTops from './components/nykaa/NykaaTops'
import NykaaJackets from './components/nykaa/NykaaJackets'
import NykaaShirts from './components/nykaa/NykaaShirts'
import NykaaSkirts from './components/nykaa/NykaaSkirts'
import NykaaCoords from './components/nykaa/NykaaCo-ords'


const App = () => {
  return (
    <ProductsProvider>
      <BrowserRouter>
      <div className="flex h-screen">
      <Sidebar/>
      <div className="ml-64 flex-1 p-5">
      <Routes>
        <Route path='/products' element={<Products/>}/>
        <Route path='/nykaa-listing' element={<NykaaListing/>}/>
        <Route path='/upload-products' element={<UploadProducts/>}/>
        <Route path='/nykaa-listing/dresses' element={<NkyaaDresses/>}/>
        <Route path='/nykaa-listing/tops' element={<NykaaTops/>}/>
        <Route path='/nykaa-listing/jackets' element={<NykaaJackets/>}/>
        <Route path='/nykaa-listing/shirts' element={<NykaaShirts/>}/>
        <Route path='/nykaa-listing/skirts' element={<NykaaSkirts/>}/>
        <Route path='/nykaa-listing/tops' element={<NykaaTops/>}/>
        <Route path='/nykaa-listing/co-ords' element={<NykaaCoords/>}/>
      </Routes>
      </div>
      </div>
      </BrowserRouter>
    </ProductsProvider>
  )
}

export default App