import React from 'react';

function Sort(){

    let sortHighToLow = async(e) => {
        e.preventDefault();

        // grabs all cards and puts them into array to be sorted
        const reviewCards = document.querySelectorAll('card');
        const cardsArray = Array.from(reviewCards);

        // sort cards from highest to lowest ratings
        let sorted = cardsArray.sort(cardCompareDescend);
        sorted.forEach(newCard => {document.querySelector('#reviewcardslist').appendChild(newCard)});

        function cardCompareDescend(item1, item2) {
            if(item1.dataset.subject < item2.dataset.subject) {return 1;} 
            else if(item1.dataset.subject > item2.dataset.subject) {return -1;} 
            else {return 0;}
        };
    };

    let sortLowToHigh = async(e) => {
        e.preventDefault();

        // grabs all cards and puts them into array to be sorted
        const reviewCards = document.querySelectorAll('card');
        const cardsArray = Array.from(reviewCards);

        // sort cards from lowest to highest ratings
        let sorted = cardsArray.sort(cardCompareAscend);
        sorted.forEach(newCard => {document.querySelector('#reviewcardslist').appendChild(newCard)});

        function cardCompareAscend(item1, item2) {
            if(item1.dataset.subject < item2.dataset.subject) {return -1;} 
            else if(item1.dataset.subject > item2.dataset.subject) {return 1;} 
            else {return 0;}
        };
    };

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