import React, { useEffect, useState } from 'react';
import Books from '../Books/Books';
import './Shop.css'
import loading from '../../images/loading.gif'
const Shop = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/book')
        .then(res => res.json())
        .then(data => setEvents(data))
    }, [])
    const loadingStyle ={
        marginTop: '30%',
        height: '200px',
        marginLeft: '70%'
    }
    console.log(events);
    return (
        <div className="container cards">
            {
                events.length === 0 && <img style={loadingStyle} src={loading} alt=""/>
            }
            {
                events.map(event => <Books key={event._id} event={event}></Books>)
            }
        </div>
    );
};

export default Shop;