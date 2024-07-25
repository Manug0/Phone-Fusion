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
	const safeCount = Math.max(0, Math.min(5, Number(count) || 0));

	const fullStars = Math.floor(safeCount);
	const hasHalfStar = safeCount % 1 >= 0.5;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	return (
		<span>
			{[...Array(fullStars)].map((_, i) => (
				<Star key={`full-${i}`}>&#9733;</Star>
			))}
			{hasHalfStar && <Star key="half">&#9733;</Star>}
			{[...Array(emptyStars)].map((_, i) => (
				<EmptyStar key={`empty-${i}`}>&#9733;</EmptyStar>
			))}
		</span>
	);
};

export default StarsReview;
