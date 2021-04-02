import React, { useEffect, useState } from 'react';
import deleteIcon from '../../images/delete.png';
import loading from '../../images/loading.gif'
const BookDetails = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch('https://radiant-reef-79950.herokuapp.com/manageBook', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [books])
    const iconStyle = {
        height: '30px',
        width: '30px'
    }
    const buttonStyle = {
        border: 'none',
        backgroundColor: 'white'
    }
    const handleDeleteBook=(id)=>{
        fetch(`https://radiant-reef-79950.herokuapp.com/delete/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            console.log("Delete successfully")
        })
    }
    const loadingStyle ={
        height: '150px',
        marginLeft: '30%'
    }
    return (
        <div className="container ml-5 ">
            <div className='row mt-5'>
                <div className="col-md-4">
                    <h5>Book Name</h5>
                </div>
                <div className="col-md-4">
                    <h5>Author Name</h5>
                </div>
                <div className="col-md-2">
                    <h5>Price</h5>
                </div>
                <div className="col-md-2">
                    <h5>Action</h5>
                </div>
            </div>
            <hr/>
            {
                books.length===0 && <img style={loadingStyle} src={loading} alt=""/>
            }
            {
                books.map(book =>
                    <div className="row mt-3">
                        <div className="col-md-4">
                            <   p>{book.bookName}</p>
                        </div>
                        <div className="col-md-4">
                            <p>{book.authorName}</p>
                        </div>
                        <div className="col-md-2">
                            <p>{book.price}</p>
                        </div>
                        <div className="col-md-2">
                            <button onClick={()=>handleDeleteBook(`${book._id}`)} style={buttonStyle}><img style={iconStyle} src={deleteIcon} alt="" /></button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default BookDetails;