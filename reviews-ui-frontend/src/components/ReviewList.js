import React from 'react';
import Review from './Review';
import Options from './Options';

function ReviewList({ reviews, onDelete, onEdit, ratingSort, productSort}) {
    
    // sets up container for all reviews to be displayed in one place
    return (
        <article className='row'>
            <div className='column'>
                <form id="sortbuttons">
                    <fieldset>
                        <legend><h2>Sort:</h2></legend>

                        <label htmlFor="highToLow">Highest to lowest ratings</label>
                        <button id="highToLow" onClick={event => ratingSort(event, 'highToLow')}>High to Low</button>
            
                        <label htmlFor="lowToHigh">Lowest to highest ratings</label>
                        <button id="lowToHigh" onClick={event => ratingSort(event, 'lowToHigh')}>Low to High</button>

                        <label htmlFor="aToZ">Alphabetically by product name</label>
                        <button id="aToZ" onClick={event => productSort(event, 'aToZ')}>Alphabetically</button>
            
                        <label htmlFor="zToA">Reverse alphabetically by product name</label>
                        <button id="zToA" onClick={event => productSort(event, 'zToA')}>Reverse Alphabetically</button>
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
