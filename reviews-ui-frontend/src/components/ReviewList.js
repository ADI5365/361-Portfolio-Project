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
                        <legend><h2>Sort by:</h2></legend>

                        <button id="highToLow" onClick={event => ratingSort(event, 'highToLow')}>High to Low</button><br/>
                        <label htmlFor="highToLow">Sort from highest to lowest ratings</label><br/><br/>
            
                        <button id="lowToHigh" onClick={event => ratingSort(event, 'lowToHigh')}>Low to High</button><br/>
                        <label htmlFor="lowToHigh">Sort from lowest to highest ratings</label><br/><br/>

                        <button id="aToZ" onClick={event => productSort(event, 'aToZ')}>Alphabetically</button><br/>
                        <label htmlFor="aToZ">Sort alphabetically by product name</label><br/><br/>
            
                        <button id="zToA" onClick={event => productSort(event, 'zToA')}>Reverse Alphabetically</button><br/>
                        <label htmlFor="zToA">Sort reverse alphabetically by product name</label><br/><br/>
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
