import axios from 'axios';
import Button from 'react-bootstrap/Button'
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './Admin.css'
import BookDetails from '../BookDetails/BookDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
const Admin = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [imageUrl, setImageUrl] = useState(null);
    const [clicked, setClicked] = useState(false);
    const onSubmit = data => {
        console.log(data);
        const formData = {
            bookName: data.bookName,
            image: imageUrl,
            authorName: data.authorName,
            price: data.price
        };
        const url = `http://localhost:4000/addBook`;
        console.log(formData);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => console.log("server side response", res))
    };
    const handleImageUpload = event => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', 'af71afe8731531b9a92c36fd7b847ee3');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImageUrl(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className=' row'>
            <div className='side-component  col-md-4 col-lg-3'>
                <div>
                    <h3>BOOK SHOP</h3>
                </div>
                <div className='buttons'>
                    <Button onClick={() => setClicked(false)}>Manage Books</Button>
                    <br />
                    <Button onClick={() => setClicked(true)}>Add Book</Button>
                </div>
            </div>
            <div className='col-md-8'>
                {
                    clicked ?
                        <div>
                            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                                <input name="bookName" placeholder="Book Name" ref={register} /><br />
                                <input name="authorName" placeholder="Author's Name" ref={register} /><br />
                                <input name="price" placeholder="Price" ref={register} /><br />
                                <label for="file-upload" class="custom-file-upload">
                                    <FontAwesomeIcon icon={faUpload}/> Upload Image</label>
                                <input id="file-upload" type="file" name="image" onChange={handleImageUpload} />
                                <br />
                                <Button className="addButton">Add Book</Button>
                            </form>
                        </div>
                        :
                        <div>
                            <BookDetails></BookDetails>
                        </div>
                }
            </div>
        </div>

    );
};

export default Admin;