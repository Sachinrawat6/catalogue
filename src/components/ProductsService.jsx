import React, { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    style_number: [],
    style_type: [],
    pattern_number: [],
  });

  const API_URL = "https://app.nocodb.com/api/v2/tables/m5fegjmoxwbg9d2/records";
  const API_HEADERS = {
    "xc-token": "-0XAccEvsn8koGW5MKQ79LoPj07lxk_1ldqDmuv1",
  };

  // 🟢 Fetch Products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const countResponse = await fetch(`${API_URL}?limit=1`, { headers: API_HEADERS });
      const countData = await countResponse.json();
      const totalRecords = countData.pageInfo?.totalRows || 0;

      if (totalRecords === 0) {
        setProducts([]);
        setFilteredProducts([]);
        setLoading(false);
        return;
      }

      console.log(`✅ Total Records Found: ${totalRecords}`);
      const limit = 100;
      const totalPages = Math.ceil(totalRecords / limit);

      const fetchPromises = Array.from({ length: totalPages }, (_, i) => {
        const offset = i * limit;
        return fetch(`${API_URL}?offset=${offset}&limit=${limit}`, { headers: API_HEADERS })
          .then(response => response.json())
          .then(data => data.list || []);
      });

      const results = await Promise.all(fetchPromises);
      const allProducts = results.flat();

      setProducts(allProducts);
      setFilteredProducts(allProducts); // 🟢 Initially show all products
    } catch (err) {
      console.error("❌ Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    console.log("🔍 Filters Applied:", filters);
    console.log("📦 Total Products Before Filtering:", products.length);
  
    const filtered = products.filter((product) => {
      return (
        (!Array.isArray(filters.style_number) || filters.style_number.length === 0 || 
          filters.style_number.some(num => product.style_number?.toLowerCase().includes(num.toLowerCase()))) &&
        (!Array.isArray(filters.style_type) || filters.style_type.length === 0 || 
          filters.style_type.some(type => product.style_type?.toLowerCase().includes(type.toLowerCase()))) &&
        (!Array.isArray(filters.pattern_number) || filters.pattern_number.length === 0 || 
          filters.pattern_number.some(num => product.pattern_number?.toLowerCase().includes(num.toLowerCase())))
      );
    });
  
    console.log("✅ Filtered Products:", filtered.length);
    setFilteredProducts(filtered);
  }, [filters, products]);
  

  return (
    <ProductsContext.Provider value={{ products: filteredProducts, loading, setFilters }}>
      {children}
    </ProductsContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a ProductsProvider");
  }
  return context;
};

export { ProductsProvider, useGlobalContext };
