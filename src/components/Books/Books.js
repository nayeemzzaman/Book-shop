import Button from 'react-bootstrap/Button'
import React from 'react';
import { useHistory } from 'react-router';
import './Books.css'

const Books = ({event}) => {
    const history = useHistory();
    const handleBuyNow = key => {
        history.push(`/checkOut/${key}`);
    }
    const imageStyle ={
        height: '300px',
        border: '1px solid black',
        borderRadius: '10px',
    }
    return (
        <div className=" book-card">
            <div className="higher-part">
                <img style={imageStyle} src={event.image} alt=""/>
                <h5 className='book-name'>{event.bookName}</h5>
                <p className='author-name'>{event.authorName}</p>
            </div>
            <div className= 'lower-part'>
                <h5 className='price'>{event.price}</h5>
                 <Button className='button' onClick={() => handleBuyNow(event._id)}>Buy Now</Button>
            </div>
        </div>
    );
};

export default Books;