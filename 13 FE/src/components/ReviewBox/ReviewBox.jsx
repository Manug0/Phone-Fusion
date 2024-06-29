import React from "react";
import styled from "styled-components";
import StarsReview from "../StarsReview/StarsReview";

const ReviewContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	margin-top: var(--size-6xl);
	background-color: #fafafa;
	width: 80%;
`;

const Rating = styled.p`
	font-size: 16px;
	font-weight: 500;
`;

const Reviews = styled.p`
	font-size: 16px;
	font-weight: 500;
`;

const ReviewsBox = ({ reviews }) => {
	const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

	return (
		<ReviewContainer>
			<Rating averageRating={averageRating} reviewCount={reviews.length} />
			{reviews.map((rev, index) => (
				<Reviews key={index}>
					<strong>{rev.clientPublicName}:</strong> {rev.review} (Puntuación:{" "}
					<StarsReview count={rev.rating} />)
				</Reviews>
			))}
		</ReviewContainer>
	);
};

export default ReviewsBox;
