import React from "react";
import StarsReview from "../StarsReview/StarsReview";

const Rating = ({ averageRating, reviewCount }) => (
	<div style={{ display: "Flex", alignItems: "center", gap: "4px" }}>
		<StarsReview count={Math.round(averageRating)} />
		<p>({reviewCount})</p>
	</div>
);

export default Rating;
