import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Phones from "./pages/Products/Phones";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";
import { Box } from "@chakra-ui/react";

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/phones" element={<Phones />}></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
		</div>
	);
}

export default App;
