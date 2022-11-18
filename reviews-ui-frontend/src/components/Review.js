import React from 'react';
import { MdOutlineNotInterested, MdOutlineDriveFileRenameOutline, MdFlag } from 'react-icons/md';
import {IconContext} from 'react-icons';

function Review({ review, onEdit, onDelete }) {

    return (

        // set up form of the review card to be displayed when submitted
        // includes icons for deleting, editing, and flagging a review
        <div className='card'>
            <h3>{review.product}</h3>
            <h4>Username: {review.username}</h4>
            <h4>Rating: {review.rating} / 5</h4>
            <p>{review.text}</p>
            <h6>Review date: {review.date.substring(0,10)}</h6>
            
            <IconContext.Provider value={{className: 'top-react-icons'}}>
                <button><MdOutlineNotInterested onClick={() => onDelete(review._id)} /></button>
                <button><MdOutlineDriveFileRenameOutline onClick={() => onEdit(review)} /></button>
                <button><MdFlag /></button>
            </IconContext.Provider>
        </div>
    );
}

export default Review;