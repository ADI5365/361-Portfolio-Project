import mongoose from 'mongoose';
import 'dotenv/config';

// connect to MongoDB established for this project
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500:Connection to the server failed.' });
    } else  {
        console.log('Successfully connected to MongoDB Reviews collection using Mongoose.');
    }
});

// define the review schema for the project then compile the model
const reviewSchema = mongoose.Schema({
	username: { type: String, required: true },
	product: { type: String, required: true },
	rating: { type: Number, required: true },
    text: { type: String, required: true },
    date: { type: Date, required: true }
});

const Review = mongoose.model("Review", reviewSchema);

// CREATE model - form and function of the review
const createReview = async (username, product, rating, text, date) => {
    const review = new Review({ 
        username: username,
        product: product,
        rating: rating,
        text: text,
        date: date
    });
    return review.save();
}

// RETRIEVE models 

// to find the reviews for display
const findReviews = async (filter) => {
    const query = Review.find(filter);
    return query.exec();
}

// to find a review based on its ID
const findReviewById = async (_id) => {
    const query = Review.findById(_id);
    return query.exec();
}


// DELETE model based on ID 
const deleteById = async (_id) => {
    const result = await Review.deleteOne({_id: _id});
    return result.deletedCount;
};


// REPLACE model - for updating parts of a review
const replaceReview = async (_id, username, product, rating, text, date) => {
    const result = await Review.replaceOne({_id: _id }, {
        username: username,
        product: product,
        rating: rating,
        text: text,
        date: date
    });
    return result.modifiedCount;
}


// Export our variables for use in the controller file.
export { createReview, findReviews, findReviewById, replaceReview, deleteById }