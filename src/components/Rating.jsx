import { useState } from 'react';
import Star from './Star';
const Rating = ({ heading = 'Rating', color = 'gold' }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    const feedbackMessages = ['Terrible', 'Poor', 'Fair', 'Good', 'Excellent'];

    return (
        <div className="rating-container">
            <h2> {heading} </h2>
            <div className='stars'>
               {stars.map((star, index) => (
                    // <span key={star} className="star"
                    //     onClick={() => setRating(star)} 
                    //     onMouseEnter={() => setHover(star)}
                    //     onMouseLeave={() => setHover(0)}
                    //     className={`star ${star <= (hover || rating) ? 'active' : ''} ${color}`}>
                    //     {'\u2605'}
                    // </span>

                    //  <span key={star} className="star"
                    //     onClick={() => setRating(star)} 
                    //     onMouseEnter={() => setHover(star)}
                    //     onMouseLeave={() => setHover(0)}
                    //     className='star'
                    //     style={{ color: star <= (hover || rating) ? color : 'gray' }}
                    //     >
                    //     {'\u2605'}
                    // </span>
                   <Star key={star}
                       star={star}
                       rating={rating}
                       hover={hover}
                       color={color}
                       ratingClick={setRating}
                       hoverEnter={setHover}
                       hoverLeave={() => setHover(0)}
                   />
                ))} 
            </div>
            {rating > 0 && <p className="feedback">{feedbackMessages[rating - 1]}</p>}
        </div>
    );
}

export default Rating;