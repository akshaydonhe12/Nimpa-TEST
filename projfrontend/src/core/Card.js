import React, {useState, useEffect} from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";



const Card = ({
        product,
        addtoCart = true,
        removeFromCart= false,
        setReload = f => f,
        //function(f) {return f}
        reload = undefined  
}) => {
        const [redirect, setRidrect] =useState(false);
        const [count, setCount] = useState(product.count);

        const cartTitle = product ? product.name : "A Photo from prexels";
        const cartDescription = product ? product.description : "Default description";
        const cartPrice = product ? product.price : "DEFAULT";
     
const getARidrect = (redirect) => {
        if(redirect) {
            return <Redirect to="/cart" />
    }
}

      

return (
    <div className="card text-white bg-dark border border-info ">
    <div className="card-header lead">{cartTitle}</div>
    <div className="card-body">
        {getARidrect(redirect)}
    <ImageHelper product = {product} />
        <p className="lead bg-success font-weight-normal text-wrap">
            {cartDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p>
            
    </div>
    </div>
           

    );
 };

 export default Card;