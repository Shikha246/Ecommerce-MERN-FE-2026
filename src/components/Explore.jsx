
import { Link } from "react-router-dom";


function Explore({product}){
    const categories = [...new Set(product.map(p => p.category))];
return(

<div className="row">
  {categories.map((cat, index) => (
    <div className="col-12 col-sm-6 col-md-3 mb-3 mb-md-0" key={index}>
         <Link
        to={`/products?category=${cat.toString().toLowerCase()}`}
        className="text-decoration-none text-dark"
      >

<div className="card bgColor p-3 text-center shadow-sm">
        <h5>{cat}</h5>
      </div>

      </Link>
      
    </div>
  ))}
</div>

)

}

export default Explore;