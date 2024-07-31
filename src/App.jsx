// app.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Product from './components/Product';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './components/ProductDetail';
import SearchItem from './components/SearchItem';
import Cart from './components/Cart';
import { items } from './components/Data';
import EditProduct from './components/editproduct';

const App = () => {
  const [data, setData] = useState([...items]);
  const [cart, setCart] = useState([]);

  const updateProduct = (updatedProduct) => {
    const updatedData = data.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setData(updatedData);
  };

  const deleteProduct = (id) => {
    const updatedData = data.filter(product => product.id !== id);
    setData(updatedData);
  };

  return (
    <>
      <Router>
        <Navbar cart={cart} setData={setData} />
        <Routes>
          <Route path="/" element={<Product cart={cart} setCart={setCart} items={data} updateProduct={updateProduct} deleteProduct={deleteProduct} />} />
          <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} />} />
          <Route path="/search/:term" element={<SearchItem cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/edit/:id" element={<EditProduct data={data} updateProduct={updateProduct} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
