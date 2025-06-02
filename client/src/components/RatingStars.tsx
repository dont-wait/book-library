const RatingStars = ({ rating }: { rating: number }) => {
  const generateStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      "★".repeat(fullStars) + (hasHalfStar ? "☆" : "") + "☆".repeat(emptyStars)
    );
  };

  return <span className='rating-stars'>{generateStars(rating)}</span>;
};

export default RatingStars;
