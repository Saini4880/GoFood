import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

function Card(props) {
  let data = useCart();
  const priceRef=useRef();
  let dispatch=useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options || {});
  const[qty,setQty]=useState(1);
  const[size,setSize]=useState("");

  const handleAddtoCart = async () => {
    let food = null; // Initialize as null, assuming you're expecting an object
  
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        console.log(item);
        break;
      }
    }
  
    console.log(food);
  
    if (food !== null) {
      console.log(food.size);
  
      // Check if the 'size' property exists in 'food'
      if ('size' in food) {
        if (food.size === size) {
          console.log("Food=size");
          await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
          return;
        } else if (food.size !== size) {
          console.log("Food!=size");
          await dispatch({
            type: "ADD",
            id: props.foodItem._id,
            name: props.foodItem.name,
            price: finalPrice,
            qty: qty,
            size: size,
          });
          return;
        }
      } else {
        console.log("'size' property not found in food");
      }
    }
  
    console.log("first order");
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };
 

  let finalPrice= qty*parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])

  return (
    <div className="container mb-3">
     <div className="card mt-3" style={{ width: "16rem", maxHeight: "600px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="Burger" style={{height:"200px",objectFit:"fill"}}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="d-flex flex-column">
            <select className="form-select m-2 p-2" onChange={(e)=>setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select className="form-select m-2 p-2" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
              {priceOptions.map((data)=>{
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
            <div className="d-inline fs-5 mt-auto">{finalPrice}/-</div>
            <hr></hr>
            <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddtoCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
