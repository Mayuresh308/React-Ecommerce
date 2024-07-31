// product.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({ items, cart, setCart, updateProduct, deleteProduct }) => {

  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = { id, price, title, description, imgSrc };
    setCart([...cart, obj]);
    toast.success('Item added to cart', {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
    });
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    toast.success('Product has been deleted', {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="container my-5">
        <div className="row">
          {items.map((product) => (
            <div key={product.id} className="col-lg-4 col-md-6 my-3 text-center">
              <div className="card" style={{ width: "18rem" }}>
                <Link to={`/product/${product.id}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={product.imgSrc} className="card-img-top" alt="..." />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <button className="btn btn-primary mx-3">{product.price} ₹</button>
                  <button onClick={() => addToCart(product.id, product.price, product.title, product.description, product.imgSrc)} className="btn btn-warning">Add To Cart</button>
                  <Link to={`/edit/${product.id}`} className="btn btn-secondary mx-1">Edit</Link>
                  <button onClick={() => handleDelete(product.id)} className="btn btn-danger mx-1">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
