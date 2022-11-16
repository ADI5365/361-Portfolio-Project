import 'dotenv/config';
import express from 'express';
import * as reviews from './reviews-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// calls microservice on AddReviewPage to show random photo on load
app.post('/reviews', (req, res) => {
    const fs = require('fs');
    let imgPath;

    fs.writeFile('./microservice/Request.txt', '1', (err) => {
        if(err) {
            return console.error(err);
        }

        console.log('Microservice called')
    });

    fs.readFile('./microservice/PhotoFilename.txt', (err, data) => {
        if(err) {
            return console.error(err);
        }

        imgPath = data.toString();
    })
        .then(imgPath => {
            res.send(imgPath);
        })
    
});

// CREATE controller - creates user review
app.post ('/reviews', (req,res) => { 
    reviews.createReview(
        req.body.username, 
        req.body.product, 
        req.body.rating,
        req.body.text,
        req.body.date
        )
        .then(review => {
            res.status(201).json(review);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ error: 'Creation of a document failed due to invalid syntax.' });
        });
});


// RETRIEVE controllers

// retrieves a review by its ID, for editing purposes
app.get('/reviews/:_id', (req, res) => {
    const reviewId = req.params._id;
    reviews.findReviewById(reviewId)
        .then(review => { 
            if (review !== null) {
                res.json(review);
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }         
         })
        .catch(error => {
            res.status(400).json({ Error: 'Request to retrieve document failed' });
        });

});

// retrieves all reviews to display on home page
app.get('/reviews', (req, res) => {
    let filter = {};

    if(req.query.rating !== undefined){
        filter = { rating: req.query.rating };
    }

    if(req.query.product !== undefined){
        filter = { product: req.query.product };
    }

    reviews.findReviews(filter, '', 0)
        .then(reviews => {
            res.send(reviews);
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: 'Request to retrieve documents failed' });
        });

});

// DELETE Controller - deletes a review by its ID
app.delete('/reviews/:_id', (req, res) => {
    reviews.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});

// UPDATE controller - updates a review that has been pulled by its ID
app.put('/reviews/:_id', (req, res) => {
    reviews.replaceReview(
        req.params._id, 
        req.body.username, 
        req.body.product, 
        req.body.rating,
        req.body.text,
        req.body.date
    )

    .then(numUpdated => {
        if (numUpdated === 1) {
            res.json({ 
                _id: req.params._id, 
                username: req.body.username, 
                product: req.body.product, 
                rating: req.body.rating,
                text: req.body.text,
                date: req.body.date
            })
        } else {
            res.status(404).json({ Error: 'Document not found' });
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({ Error: 'Request to update a document failed' });
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});