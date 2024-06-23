import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { CounterContext } from "./contexts/CounterContext.jsx";
import { CartContext } from "./contexts/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<ChakraProvider>
		<BrowserRouter>
			<CartContext>
				<CounterContext>
					<App />
				</CounterContext>
			</CartContext>
		</BrowserRouter>
	</ChakraProvider>
);
