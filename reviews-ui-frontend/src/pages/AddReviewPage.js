// import dependencies
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

export const AddReviewPage = () => {

    // establish states and setting states for all portions of a review
    const [username, setUsername] = useState('');
    const [product, setProduct] = useState('');
    const [rating, setRating] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    
    const history = useHistory();
    const [imgPath, setImgPath] = useState('');

    // call the backend to use random image generator microservice
    const loadImg = async () => {
        const response = await fetch('/reviews');
        const filePath = response.text();
        setImgPath(filePath);
    }

    useEffect(() => {
        loadImg();
    }, []);

    // calls create model to create and add review to the database
    const addReview = async () => {
        const newReview = { username, product, rating, text, date };
        const response = await fetch('/reviews', {
            method: 'post',
            body: JSON.stringify(newReview),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // whether review is successfully added or not, reroutes immediately to home page
        if(response.status === 201){
            alert("Successfully added the review!");
        } else {
            alert(`Failed to add movie, status code = ${response.status}`);
        }
        history.push("/");
    };

    return (
        <>
        <article>
            <h2>Submit your review</h2>
            <ol>
                <li>Enter a username of your choosing and the product name in their respective fields.</li>
                <li>Enter a numerical rating from 1 to 5.</li>
                <li>In the text area write your review of the product.</li>
                <li>You're all done! Click "submit" and your review will appear alongside others under User Reviews.</li>
            </ol>

            <main className='row'>
                <div className='column' onLoad={loadImg}>
                    <img src={imgPath} alt='Random household item'></img>
                </div>
                <div className='column'>
                    <form onSubmit={(e) => { e.preventDefault();}}>
                        <fieldset>
                            <legend>What are you reviewing?</legend>
                            <label htmlFor="username">Username: </label>
                            <input
                                type="text"
                                placeholder="Your screen name"
                                value={username}
                                onChange={e => setUsername(e.target.value)} 
                                id="username" />
                    
                            <label htmlFor="product">Product: </label>
                            <input
                                type="text"
                                value={product}
                                placeholder="Product name"
                                onChange={e => setProduct(e.target.value)} 
                                id="product" />

                            <label htmlFor="rating">Rating: </label>
                            <input
                                type="text"
                                placeholder="Rating out of 5"
                                value={rating}
                                onChange={e => setRating(e.target.value)} 
                                id="rating" />

                            <label htmlFor="text">Write your review: </label>
                            <input
                                type="textarea"
                                placeholder="Item review goes here..."
                                value={text}
                                onChange={e => setText(e.target.value)} 
                                id="text" />

                            <label htmlFor="date">Date Used: </label>
                            <input
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                id="date"
                                required="required" />

                            <label htmlFor="submit">
                            <button
                                type="submit"
                                onClick={addReview}
                                id="submit"
                            >Add</button> your review</label>
                        </fieldset>
                    </form>
                </div>
            </main>
        </article>
        </>
    );
}

export default AddReviewPage;