import { useState } from "react";
import { useProducts } from "../context/ProductContext";


function Filters() {
  const { products,setProducts,allProducts } = useProducts();
  const [rating, setRatings] =useState(0);


  const handleRatingChange = (e) => {
  const value =  Number(e.target.value);
  setRatings(value);

  const filtered = allProducts.filter((p) => p.rating >= value);
  setProducts(filtered);
};

  const onClearFilterClicked = async () => {
    // debugger;
    let fiction = document.getElementById("fiction");
    fiction.checked = false;
    let selfHelp = document.getElementById("selfhelp");
    selfHelp.checked = false; 
    let finance = document.getElementById("finance");
    finance.checked = false;
    let programming = document.getElementById("programming");
    programming.checked = false;
    

   await fetch("https://ecommerce-mern-be-2026.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        // debugger;
        setProducts(data.data.products); // important
        console.log(products);
      })
      .catch((err) => console.log(err));
  }


   const onApplyFilterClicked = () => {
    // debugger;
    let finalProducts = [];
    let fiction_checked = document.getElementById("fiction").checked;
let finance_checked = document.getElementById("finance").checked;
let programming_checked = document.getElementById("programming").checked;
let selfhelp_checked = document.getElementById("selfhelp").checked;
    console.log(products);
    if(fiction_checked == true) {
      // debugger;
     let products_fiction = products.filter(x => x.category == "Fiction");
     finalProducts.push(products_fiction);

    }   

     if(finance_checked == true) {
      // debugger;
     let products_finance = products.filter(x => x.category == "Finance");
     finalProducts.push(products_finance);

    }  
  // debugger;
     if(selfhelp_checked == true) {
      // debugger;
     let products_selfHelp = products.filter(x => x.category == "Self-Help");
     finalProducts.push(products_selfHelp);

    }   
     if(programming_checked == true) {
      // debugger;

     let products_programming = products.filter(x => x.category == "Programming");
     finalProducts.push(products_programming);

    }   
    // debugger;
let list = [];
    for (let index = 0; index < finalProducts.length; index++) {
      const bookArr = finalProducts[index];
      for (let index = 0; index < bookArr.length; index++) {
        const element = bookArr[index];
        list.push(element);
      }
      
    }
    setProducts(list);

  }


  const onClearSortingClicked = async () => {
   

    let priceElements= document.getElementsByName("price");
    
    for (let index = 0; index < priceElements.length; index++) {
      const element = priceElements[index];
      element.checked = false;
    }

  await  fetch("https://ecommerce-mern-be-2026.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        // debugger;
        setProducts(data.data.products); // important
        console.log(products);
      })
      .catch((err) => console.log(err));
  }


   const onApplySortingClicked = async () => {
    //  debugger;
    let priceElements = document.getElementsByName("price");
    console.log(priceElements);
    
    for (let index = 0; index < priceElements.length; index++) {
      const rb = priceElements[index];
      if(rb.checked == true){
        if(rb.value == "low"){
// debugger;
await fetch("https://ecommerce-mern-be-2026.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        // debugger;
       let productsL = data.data.products;
       productsL.sort((a,b) => {return a.price - b.price});
        setProducts(productsL); // important
        console.log(productsL);
      })
      .catch((err) => console.log(err));

          
        }
        if(rb.value == "high"){
          // debugger;
          fetch("https://ecommerce-mern-be-2026.vercel.app/api/products")
      .then((res) => res.json())
      .then((data) => {
        // debugger;
       let productsH = data.data.products;
       productsH.sort((a,b) => {return b.price - a.price});
        setProducts(productsH); // important
        console.log(productsH);
      })
      .catch((err) => console.log(err));
        }
      }
    }

}

return(
<div>

      <h5>Filters</h5>

      <p>Category</p>

      <div>
        <input type="checkbox" id="fiction" value={"Fiction"} /> Fiction
      </div>

      <div>
        <input type="checkbox" id="selfhelp" value={"Self Help"} /> Self Help
      </div>

      <div>
        <input type="checkbox" id="finance" value={"Finance"} /> Finance
      </div>
<div>
        <input type="checkbox" id="programming" value={"Programming"} /> Programming
      </div>

      <div>
        <button onClick={onClearFilterClicked} > Clear Filters</button>
        <button onClick={onApplyFilterClicked} > Apply Filters</button>
      </div>
      <hr />

      <p>Sort Price</p>

      <div>
        <input type="radio" name="price" value="low" /> Low to High
      </div>

      <div>
        <input type="radio" name="price" value="high"  /> High to Low
      </div>
<div>
        <button onClick={onClearSortingClicked} > Clear Sorting</button>
        <button onClick={onApplySortingClicked} > Apply Sorting</button>
      </div>
      <hr />
    <p>Rating 4.7 & above: {rating}</p>

    <input
        type="range"
        min="0"
        max="5"
        step="0.1"
        value={rating}
        style={{ width: "300px" }}
        onChange={handleRatingChange}
      />
    </div>

)
}
export default Filters;