import React from "react";
import StarsReview from "../StarsReview/StarsReview";

const Rating = ({ averageRating, reviewCount }) => (
	<div>
		Average Rating: <StarsReview count={Math.round(averageRating)} />
		<p>{reviewCount}</p>
	</div>
);

export default Rating;
