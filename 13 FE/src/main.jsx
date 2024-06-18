import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	colors: {
		color: {
			light: "hsl(0, 0%, 92%)",
			dark: "rgb(2, 3, 31)",
			primary: "#ffff",
			secondary: "#38b2ac",
			tertiary: "#9f7aea",
			quaternary: "#ed64a6",
		},
	},
	fonts: {
		body: "'DM Sans', sans-serif",
	},
	fontWeights: {
		light: 300,
		normal: 400,
		medium: 500,
		semibold: 600,
		bold: 700,
	},
	sizes: {
		xs: "0.75rem",
		sm: "0.875rem",
		md: "1rem",
		lg: "1.125rem",
		xl: "1.25rem",
		"2xl": "1.5rem",
		"3xl": "1.875rem",
		"4xl": "2.25rem",
		"5xl": "3rem",
		"6xl": "4rem",
	},
	space: {
		1: "0.5rem",
		2: "1rem",
		3: "1.5rem",
		4: "2rem",
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<ChakraProvider theme={theme}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ChakraProvider>
);
