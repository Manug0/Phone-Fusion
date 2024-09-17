import React from "react";
import styled from "styled-components";
import StarsReview from "../StarsReview/StarsReview";

const ReviewContainer = styled.div`
	display: flex;
	flex-direction: column-reverse;
	align-items: center;
	gap: 4px;
	margin-top: var(--size-6xl);
	width: 80%;
	margin: auto;
`;

const Reviews = styled.p`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: start;
	background-color: #f2f2f2;
	padding: var(--size-xl);
	font-size: var(--size-md);
	font-weight: var(--font-weight-normal);
	border-radius: 8px;
`;

const ReviewsBox = ({ reviews }) => {
	return (
		<ReviewContainer>
			{reviews.map((rev, index) => (
				<Reviews key={index}>
					<div style={{ display: "flex", gap: "var(--size-md)", alignItems: "center" }}>
						<strong>{rev.clientPublicName}</strong>
						<StarsReview count={rev.rating} />
					</div>
					<p>{rev.reviewDate}</p>
					<p>{rev.review}</p>
				</Reviews>
			))}
		</ReviewContainer>
	);
};

export default ReviewsBox;
