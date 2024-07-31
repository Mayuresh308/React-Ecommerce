// editproduct.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = ({ data, updateProduct }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const productToEdit = data.find((product) => product.id === parseInt(id));
    setProduct(productToEdit);
  }, [id, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProduct(product);
    toast.success('Product updated successfully', {
      position: "top-right",
      autoClose: 1500,
      theme: "dark",
    });
    navigate('/');
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" className="form-control" name="title" value={product.title} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" name="description" value={product.description} onChange={handleChange}></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input type="text" className="form-control" name="price" value={product.price} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Image Source</label>
            <input type="text" className="form-control" name="imgSrc" value={product.imgSrc} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Update</button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
