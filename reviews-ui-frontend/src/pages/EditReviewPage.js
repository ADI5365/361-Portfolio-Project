import React from 'react';
import { useHistory } from "react-router-dom";
import { useState } from 'react';

export const EditReviewPage = ({ review }) => {
 
    // set states of review portions that are already in the DB
    const [username, setUsername] = useState(review.username);
    const [product, setProduct] = useState(review.product);
    const [rating, setRating] = useState(review.rating);
    const [text, setText] = useState(review.text);
    const [date, setDate] = useState(review.date);
    
    const history = useHistory();

    // calls update model to update review and push changes to DB
    const editReview = async () => {
        const response = await fetch(`/reviews/${review._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                username: username,
                product: product,
                rating: rating,
                text: text,
                date: date
            }),
            headers: {'Content-Type': 'application/json',},
        });

        // whether successfully edited or not, reroutes immediately to home page
        if (response.status === 200) {
            alert("Successfully edited document!");
        } else {
            const errMessage = await response.json();
            alert(`Failed to update document. Status ${response.status}. ${errMessage.Error}`);
        }
        history.push("/");
    }

    return (
        <>
        <article>
            <h2>Edit your past review</h2>
            <p>Want to make an edit to a past review? You can do so here, just make sure to hit submit when done editing to save changes.</p>

            <form onSubmit={(e) => { e.preventDefault();}}>
                <fieldset>
                    <legend>Which review are you editing?</legend>
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
                        onClick={editReview}
                        id="submit"
                    >Save</button> updates to your review</label>
                </fieldset>
                </form>
            </article>
        </>
    );
}
export default EditReviewPage;