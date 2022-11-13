import React, {useEffect, useState} from 'react';
import ReviewList from './ReviewList';

function Sort(){

    const [reviewList, setReviewList] = useState([]);

    useEffect(() => {
        setReviewList(ReviewList.reviewList)
    }, [])

    // function to sort reviews from highest to lowest ratings
    let sortHighToLow = async () => {
        const sortedHighLow = [...reviewList].sort((a,b) => {
            return a.rating > b.rating ? 1 : -1;
        })

        setReviewList(sortedHighLow);
    }

    // function to sort reviews from lowest to highest ratings
    let sortLowToHigh = async () => {
        const sortedLowHigh = [...reviewList].sort((a,b) => {
            return a.rating < b.rating ? 1 : -1
        })

        setReviewList(sortedLowHigh);
    }

    return (
        <form>
            <fieldset>
                <legend><h2>Sort by:</h2></legend>

                <button id="hightolow" onClick={sortHighToLow}>High to Low</button><br/><br/>
                <label for="hightolow">Sort from highest to lowest ratings</label><br/><br/>
            
                <button id="lowtohigh" onClick={sortLowToHigh}>Low to High</button><br/><br/>
                <label for="lowtohigh">Sort from lowest to highest ratings</label><br/><br/>
            </fieldset>
        </form>
    )
}

export default Sort;
