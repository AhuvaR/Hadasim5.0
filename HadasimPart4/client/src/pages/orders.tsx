

import React, { useState, useEffect } from 'react';
import { getDataById } from '../fetch';
import './orders.css';


type order = {
    order_id: number;
    product_id:number;
    product_name: string
    status: string
    minimum_items_for_order:number
    
};

const Orders = () => {
    const id=1;
    const [orders, setOrders] = useState<order[]>([]);
    useEffect(() => {
        getDataById("orders",id)
            .then((data) => {
                console.log("orders length:", data.length);
                const adaptedData = data.map((item: any) => ({
                    order_id: item.order_id,
                    product_id: item.product_id,
                    status: item.status,
                    product_name: item.product_name,
                    minimum_items_for_order: item.minimum_items_for_order
                }))
                //[{"order_id":1,"product_id":1,"status":"ממתין לאישור","Column3":1,"supplier_id":1,"product_name":"כמון טחון","product_price":12.5}]
                setOrders([...adaptedData])
            });
    }, []);
    return (
        <>
            <div className="product-container">
                <h1>Orders:</h1>
                {orders.map((order, index) => (
                    <div key={order.order_id} className="product-item">{order.product_id} : {order.product_name} <p>{order.status}</p></div>
                ))}
            </div>
        </>
    );
}

export default Orders;
