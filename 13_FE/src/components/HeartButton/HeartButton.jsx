import React from "react";
import styled, { keyframes } from "styled-components";
import HeartSVG from "../SVGs/HeartSVG";
import { useHeart } from "../../contexts/HeartContext";

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledHeartButton = styled.button`
	position: absolute;
	top: var(--size-4xl);
	cursor: pointer;
	width: 30px;
	height: 30px;
	user-select: none;
	outline: none;
	background: none;
	border: none;
	&:active {
		animation: ${pulse} 0.3s ease;
	}
`;

const HeartButton = ({ phone, className, style }) => {
	const { heart, addHeart, removeHeart } = useHeart();
	const isFavorite = heart.some((item) => item._id === phone._id);

	const handleHeartClick = (e) => {
		e.stopPropagation();
		if (isFavorite) {
			removeHeart(phone, e);
		} else {
			addHeart(phone);
		}
	};

	return (
		<StyledHeartButton onClick={handleHeartClick} className={className} style={style}>
			<HeartSVG fill={isFavorite ? "red" : "#d3d3d3"} />
		</StyledHeartButton>
	);
};

export default HeartButton;
