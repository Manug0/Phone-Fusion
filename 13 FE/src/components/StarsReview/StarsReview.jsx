import React from "react";
import styled from "styled-components";

const Star = styled.span`
	color: gold;
	font-size: 1.5rem;
	margin-right: 0.1rem;
`;

const StarsReview = ({ count }) => (
	<span>
		{[...Array(count)].map((_, i) => (
			<Star key={i}>&#9733;</Star>
		))}
	</span>
);

export default StarsReview;
