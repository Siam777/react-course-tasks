const Rating = () => {
    const stars = Array.from({ length: 5 }, (_, index) => index + 1);

    const clicked = (index) => {
       console.log('clicked', index);
    }

     const hovered = (action) => {
       console.log('hovered', action);
    }

    return (
        <div className="rating-container">
            <h2> Rate Your Experience </h2>
            {stars.map((star, index) => (
                <span key={star} className="star"
                 onClick={() => clicked(index)}
                 onMouseEnter={() => hovered('enter')}
                 onMouseLeave={() => hovered('leave')}>
                    {'\u2605'}
                </span>
            ))}
        </div>
    );
}

export default Rating;