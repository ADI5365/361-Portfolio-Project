// import dependencies and components to be displayed on the home page
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import ReviewList from '../components/ReviewList';
import Review from '../components/Review';

function HomePage({ setReview }) {

    const history = useHistory();
    const [reviews, setReviews] = useState([]);

    // calls a retrieve model to receive and display all reviews
    const loadReviews = async () => {
        const response = await fetch('/reviews');
        const reviews = await response.json();
        setReviews(reviews);

        let counter = 0;
        for(let i=0; i<reviews.length; i++) {
            counter++;
        };

        console.log(`There are currently ${counter} user reviews.`);
    } 

    // calls the update model to edit a review
    const onEditReview = async review => {
        setReview(review);
        history.push("/edit-review");
    }

    // calls the delete model to delete a review
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

    // event handler for the buttons to sort reviews by rating
    const onSortReviews = async (rating) => {
        let sortedReviews = [...reviews];
        
        if(rating === 'highToLow') {
            sortedReviews.sort((a, b) => b.rating - a.rating);
        } else if(rating === 'lowToHigh') {
            sortedReviews.sort((a,b) => a.rating - b.rating);
        }

        sortedReviews.map((review, i) => 
            <Review 
                review={review} 
                key={i}
                onDelete={onDeleteReview}
                onEdit={onEditReview} 
            />)
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
            
            <main>
                <ReviewList 
                    reviews={reviews}
                    onEdit={onEditReview}
                    onDelete={onDeleteReview}
                    onSort={onSortReviews}/>
            </main>
            
        </article>
    );
}

export default HomePage;