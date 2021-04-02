import Button from 'react-bootstrap/Button'
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { userContext } from '../../App';
import './Checkout.css'

const Checkout = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date(),
    });
    const {id} = useParams();
    const [item, setItem] = useState([]);
     const productKey = id;
     console.log(productKey);
    useEffect(()=> {
        fetch(`https://radiant-reef-79950.herokuapp.com/bookBy/${id}`)
        .then(res => res.json())
        .then(data => setItem(data[0]))
    }, [])
    const handleCheckOut =()=>{
        const orderDetails ={...loggedInUser, productInfo: item, orderTime: new Date()}

        fetch('https://radiant-reef-79950.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data)
                alert('Your order placed successfully.');
        })
    }
    console.log(item);
    return (
        <div className='container checkout'>
            <div className='row'>
                <div className="col-md-6">
                    <p>Description</p>
                    <hr/>
                    <h4>{item.bookName}</h4>
                </div>
                <div className="col-md-3">
                    <p>Quantity</p>
                    <hr/>
                    <h4>1</h4>
                </div>
                <div className="col-md-3">
                    <p>Price</p>
                    <hr/>
                    <h4>{item.price}</h4>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <Button className="confirmBtn" onClick={handleCheckOut}>CONFIRM ORDER</Button>
            </div>
        </div>
    );
};

export default Checkout;