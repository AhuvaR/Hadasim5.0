import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import ShowProducts from './pages/showProducts';
import Login from './pages/login';
import Orders from './pages/orders';


function App() {

  // const [message, setMessage] = useState("");
  // useEffect(() => {
  //   fetch("http://localhost:8000/products")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data));
  // }, []);

  return (
    <Routes>
      <Route path='' element={<Login />}></Route>
      <Route path='/product' element={<ShowProducts />}></Route>
      <Route path='/orders' element={<Orders/>}></Route>
      {/* <Products></Products> */}
    </Routes>

  );
}

export default App;

