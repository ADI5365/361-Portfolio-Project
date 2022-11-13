import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const AddReviewPage = () => {

    const [username, setUsername] = useState('');
    const [product, setProduct] = useState('');
    const [rating, setRating] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    
    const history = useHistory();

    const addReview = async () => {
        const newReview = { username, product, rating, text, date };
        const response = await fetch('/reviews', {
            method: 'post',
            body: JSON.stringify(newReview),
            headers: {
                'Content-Type': 'application/json',
            },
        });
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

            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>What are you reviewing?</legend>
                    <label for="username">Username: </label>
                    <input
                        type="text"
                        placeholder="Your screen name"
                        value={username}
                        onChange={e => setUsername(e.target.value)} 
                        id="username" />
                    
                    <label for="product">Product: </label>
                    <input
                        type="text"
                        value={product}
                        placeholder="Product name"
                        onChange={e => setProduct(e.target.value)} 
                        id="product" />

                    <label for="rating">Rating: </label>
                    <input
                        type="text"
                        placeholder="Rating out of 5"
                        value={rating}
                        onChange={e => setRating(e.target.value)} 
                        id="rating" />

                    <label for="text">Write your review: </label>
                    <input
                        type="textarea"
                        placeholder="Item review goes here..."
                        value={text}
                        onChange={e => setText(e.target.value)} 
                        id="text" />

                    <label for="date">Date Used: </label>
                    <input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        id="date"
                        required="required" />

                    <label for="submit">
                    <button
                        type="submit"
                        onClick={addReview}
                        id="submit"
                    >Add</button> your review</label>
                </fieldset>
                </form>
            </article>
        </>
    );
}

export default AddReviewPage;