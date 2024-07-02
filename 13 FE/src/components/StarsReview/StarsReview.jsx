import React from "react";
import styled from "styled-components";

const Star = styled.span`
	color: gold;
	font-size: 1.5rem;
	margin-right: 0.1rem;
`;

const EmptyStar = styled(Star)`
	color: lightgray;
`;

const StarsReview = ({ count }) => {
	const fullStars = Math.floor(count);
	const hasHalfStar = count % 1 >= 0.25 && count % 1 < 0.75;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	return (
		<span>
			{[...Array(fullStars)].map((_, i) => (
				<Star key={i}>&#9733;</Star>
			))}
			{hasHalfStar && <Star>&#9733;</Star>}
			{[...Array(emptyStars)].map((_, i) => (
				<EmptyStar key={i}>&#9733;</EmptyStar>
			))}
		</span>
	);
};

export default StarsReview;
