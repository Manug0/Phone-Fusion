import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

const ScrollTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.scrollY > 0) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	return (
		<Button
			onClick={scrollToTop}
			colorScheme="teal"
			borderRadius="full"
			boxShadow="lg"
			position="fixed"
			bottom="80px"
			right="50px"
			zIndex="1000"
			opacity={isVisible ? 0.9 : 0}
			transition="opacity 0.3s"
			pointerEvents={isVisible ? "auto" : "none"}>
			<ArrowUpIcon />
		</Button>
	);
};

export default ScrollTop;
