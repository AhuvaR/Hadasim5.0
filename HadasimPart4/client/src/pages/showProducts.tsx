

import React, { useState, useEffect } from 'react';
import { getData } from '../fetch';
import './showProduct.css';


type Product = {
    id: number;
    supplierId: number
    name: string
    price: number

};

const ShowProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        getData("products")
            .then((data) => {
               
                const adaptedData = data.map((item: any) => ({
                    id: item.product_id,
                    supplierId: item.supplier_id,
                    name: item.product_name,
                    price: item.product_price
                }))
                setProducts([...adaptedData])
            });
    }, []);
    return (
        <>
            <div className="product-container">
                <h1>Products:</h1>
                {products.map((product, index) => (
                    <div key={product.id} className="product-item">{product.name} : {product.price} <p>{product.supplierId}</p></div>
                ))}
            </div>
        </>
    );
}

export default ShowProducts;
