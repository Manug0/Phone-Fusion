import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { CounterContext } from "./contexts/CounterContext.jsx";
import { CartContext } from "./contexts/CartContext.jsx";
import { HeartContext } from "./contexts/HeartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<ChakraProvider>
		<BrowserRouter>
			<CartContext>
				<CounterContext>
					<HeartContext>
						<App />
					</HeartContext>
				</CounterContext>
			</CartContext>
		</BrowserRouter>
	</ChakraProvider>
);
