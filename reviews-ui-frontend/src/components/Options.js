import React from 'react';
import { MdOutlineNotInterested, MdOutlineDriveFileRenameOutline, MdFlag } from 'react-icons/md';
import {IconContext} from 'react-icons';

function Options(){

    let moreOptions = async(e) => {
        e.preventDefault();

        // set up box to provide more direction if the user wants to see it
        const dots = document.getElementById('dots');
        const moreText = document.getElementById('more');
        const btnText = document.getElementById('myBtn');
        
        // read more/read less button functionality
        if (dots.style.display === 'none') {
            dots.style.display = 'inline';
            btnText.innerHTML = 'Read more';
            moreText.style.display = 'none';
        } else {
            dots.style.display = 'none';
            btnText.innerHTML = 'Read less';
            moreText.style.display = 'inline';
        }
    }

    return (
        <div>
            <h3>Advanced Options</h3>
            <span id='dots'></span><span id='more'>
            <ul>
                <IconContext.Provider value={{className: 'top-react-icons'}}>
                    <li><MdOutlineNotInterested /> - users can delete their reviews</li>
                    <li><MdOutlineDriveFileRenameOutline /> - users can edit their reviews</li>
                    <li><MdFlag /> - users can flag an offensive or spam review for admins</li>
                </IconContext.Provider>
            </ul></span>
            <button id='myBtn' onClick={moreOptions}>Read more</button>
        </div>
    )
}

export default Options;