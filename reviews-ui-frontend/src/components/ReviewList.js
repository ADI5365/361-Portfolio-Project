import React from 'react';
import Review from './Review';
import Options from './Options';

function ReviewList({ reviews, onDelete, onEdit}) {

    // sets up container for all reviews to be displayed in one place
    return (
        <article className='row'>
            <div className='column'>
                <form id="sortbuttons">
                    <fieldset>
                        <legend><h2>Sort by:</h2></legend>

                        <button id="hightolow">High to Low</button><br/><br/>
                        <label htmlFor="hightolow">Sort from highest to lowest ratings</label><br/><br/>
            
                        <button id="lowtohigh">Low to High</button><br/><br/>
                        <label htmlFor="lowtohigh">Sort from lowest to highest ratings</label><br/><br/>
                    </fieldset>
                </form>
                <Options />
            </div>

            <div className='column'>
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
        </article>
    );
}

export default ReviewList;
