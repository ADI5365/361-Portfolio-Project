import React from 'react';
import Review from './Review';

function ReviewList({ reviews, onDelete, onEdit}) {

    // sets up container for all reviews to be displayed in one place
    return (
        <div id="reviews">
            <h2>User Reviews</h2>
            <div id="reviewscontainer">
                {reviews.map((review, i) => 
                    <Review 
                        review={review} 
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit} 
                    />)}
            </div>
        </div>
    );
}

export default ReviewList;
