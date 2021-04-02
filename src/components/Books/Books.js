import Button from 'react-bootstrap/Button'
import React from 'react';
import { useHistory } from 'react-router';
import './Books.css'

const Books = ({event}) => {
    const history = useHistory();
    const handleBuyNow = key => {
        history.push(`/checkOut/${key}`);
    }
    return (
        <div className=" book-card">
            <div className="higher-part">
                <img style={{height: '300px'}} src={event.image} alt=""/>
                <h5>{event.bookName}</h5>
                <p>{event.authorName}</p>
            </div>
            <div className= 'lower-part'>
                <h5>{event.price}</h5>
                 <Button onClick={() => handleBuyNow(event._id)}>Buy Now</Button>
            </div>
        </div>
    );
};

export default Books;