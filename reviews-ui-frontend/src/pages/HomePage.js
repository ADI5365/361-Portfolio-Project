import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ReviewList from '../components/ReviewList';
import Sort from '../components/Sort';
import Options from '../components/Options';

function HomePage({ setReview }) {

    const history = useHistory();
    const [reviews, setReviews] = useState([]);

    const loadReviews = async () => {
        const response = await fetch('/reviews');
        const reviews = await response.json();
        setReviews(reviews);
    } 

    const onEditReview = async review => {
        setReview(review);
        history.push("/edit-review");
    }

    const onDeleteReview = async _id => {
        const response = await fetch(`/reviews/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/reviews');
            const reviews = await getResponse.json();
            setReviews(reviews);
        } else {
            console.error(`Failed to delete review with _id = ${_id}, status code = ${response.status}`)
        }
    }

    useEffect(() => {
        loadReviews();
    }, []);

    return (
        <article>
            <h2>Welcome to Thingamabob Reviews!</h2>
            <section>
                <p>
                    We're glad you're here. Feel free to use the form under  
                    "Add Review" to post a review about any and all products 
                    you have used and you feel strongly about letting others 
                    know how it works (or doesn't). 
                </p>
                <p>
                    Don't forget to check out reviews posted by others 
                    down below for anything ranging from hair dryers to 
                    refrigerators! To sort the reviews by increasing or 
                    decreasing ratings use the sort buttons to the left.
                </p>
            </section>
            
            <main className='row'>
                <div className='column'>
                    <Sort />
                    <Options />
                </div>

                <div className='column'>
                    <ReviewList 
                        reviews={reviews} 
                        onEdit={onEditReview} 
                        onDelete={onDeleteReview}
                    />
                </div>
            </main>
            
        </article>
    );
}

export default HomePage;