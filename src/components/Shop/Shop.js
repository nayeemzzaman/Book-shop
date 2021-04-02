import React, { useEffect, useState } from 'react';
import Books from '../Books/Books';
import './Shop.css'
import loading from '../../images/loading.gif'
const Shop = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('https://radiant-reef-79950.herokuapp.com/book')
        .then(res => res.json())
        .then(data => setEvents(data))
    }, [])
    
    console.log(events);
    return (
        <div className="container cards">
            {
                events.length === 0 && <img className="loadingStyle" src={loading} alt=""/>
            }
            {
                events.map(event => <Books key={event._id} event={event}></Books>)
            }
        </div>
    );
};

export default Shop;