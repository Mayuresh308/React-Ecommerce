// productdetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { items } from './Data';
import Product from './Product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();
  
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const filterProduct = items.filter((product) => product.id === parseInt(id));
    setProduct(filterProduct[0]);

    const relatedProducts = items.filter((prod) => prod.category === filterProduct[0].category);
    setRelatedProducts(relatedProducts);
  }, [id]);

  const addToCart = (id, price, title, description, imgSrc) => {
    const obj = {
      id,
      price,
      title,
      description,
      imgSrc,
    };
    setCart([...cart, obj]);
    toast.success('Item added to cart', {
      position: 'top-right',
      autoClose: 1500,
      theme: 'dark',
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="container con">
        <div className="img">
          <img src={product.imgSrc} alt="" />
        </div>
        <div className="text-center">
          <h1 className="card-title">{product.title}</h1>
          <p className="card-text">{product.description}</p>
          <h5>Product Details</h5>
          <table className="table">
            <tbody>
              {product.details && Object.keys(product.details).map((key, index) => (
                <tr key={index}>
                  <td><strong>{key}</strong></td>
                  <td>{product.details[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h5>About this item</h5>
          <ul>
            {product.features && product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <button className="btn btn-primary mx-3">{product.price} ₹</button>
          <button
            onClick={() => addToCart(product.id, product.price, product.title, product.description, product.imgSrc)}
            className="btn btn-warning"
          >
            Add To Cart
          </button>
        </div>
      </div>
      <h1 className="text-center">Related Products</h1>
      <Product cart={cart} setCart={setCart} items={relatedProducts} />
    </>
  );
};

export default ProductDetail;
