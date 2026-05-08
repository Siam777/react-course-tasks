const Star = ({star, rating, hover, color, ratingClick, hoverEnter, hoverLeave}) => {
    return (
        <span className="star" style={{ color: star <= (hover || rating) ? color : 'gray' }}
            onClick={() => ratingClick(star)}
            onMouseEnter={() => hoverEnter(star)}
            onMouseLeave={hoverLeave}
        >
            {'\u2605'}
        </span>
    )
}

export default Star;