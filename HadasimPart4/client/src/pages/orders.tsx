

import React, { useState, useEffect } from 'react';
import { getDataById } from '../fetch';
import './orders.css';


type order = {
    order_id: number;
    product_id: number;
    product_name: string
    status: string
    minimum_items_for_order: number

};

const Orders = () => {
    const id = 0;
    const [orders, setOrders] = useState<order[]>([]);
    const [noOrders, setNoOrders] = useState(false);
    useEffect(() => {
        getDataById("orders", id)
            .then((data) => {
                console.log("orders length:", data.length);
                if(data.length>0){
                const adaptedData = data.map((item: any) => ({
                    order_id: item.order_id,
                    product_id: item.product_id,
                    status: item.status,
                    product_name: item.product_name,
                    minimum_items_for_order: item.minimum_items_for_order
                }))
                setOrders([...adaptedData])}
                else
                setNoOrders(true)

            });
    }, []);
    return (
        <>
        <div className="welcome"><h4>Welcome!</h4></div>
            {noOrders && <div className="noOrders"><h3>No orders yet...</h3></div>}
            {!noOrders && <div className="product-container">
                <h1>Orders:</h1>
                {orders.map((order, index) => (
                    <div key={order.order_id} className="product-item">{order.product_id} : {order.product_name} <p>{order.status}</p></div>
                ))}
            </div>}
        </>
    );
}

export default Orders;
