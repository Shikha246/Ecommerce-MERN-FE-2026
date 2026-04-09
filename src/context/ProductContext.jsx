import { createContext, useContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);


export const fetchProducts = async () =>{
   let allProducts = await fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        // debugger;
        return data.data.products;
        // setProducts(data.data.products); 
        setAllProducts(data.data.products);
        // console.log(products);
      })
      .catch((err) => {console.log(err);
        return null;
      });
      return allProducts;
}

export const ProductProvider = ({ children }) => {
  // debugger;
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    fetch("https://ecommerce-mern-be-2026.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        // debugger;
        setProducts(data.data.products); // important
        setAllProducts(data.data.products);
        console.log(products);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts ,allProducts}}>
      {children}
    </ProductContext.Provider>
  );
};