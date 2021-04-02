import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import Table from 'react-bootstrap/Table'
import loading from '../../images/loading@.gif'
import './Orders.css'
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    console.log(loggedInUser);
    useEffect(() => {
        fetch('https://radiant-reef-79950.herokuapp.com/orders?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [])
    const loadingStyle ={
        height: '150px',
        marginLeft: '90%'
    }
    return (
        <Table  className="container order-table" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Book Name</th>
                    <th>Author's Name</th>
                    <th>Book Price</th>
                    <th>Order Time</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.length === 0 && <img style={loadingStyle} src={loading} alt=""/>
                }
                {
                    orders.map(order => 
                    <tr>
                        <td>{order.productInfo.bookName}</td>
                        <td>{order.productInfo.authorName}</td>
                        <td>{order.productInfo.price}</td>
                        <td>{new Date(order.orderTime).toDateString('dd/MM/yyy')}</td>
                    </tr>
                    
                    )
                }
                
            </tbody>
        </Table>
    );
};

export default Orders;