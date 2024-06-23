import React, { useRef, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Phones from "./pages/Products/Phones";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginForm from "./pages/Forms/LoginForm";
import RegisterForm from "./pages/Forms/RegisterForm";
import Cart from "./components/Cart/Cart";
import { useDisclosure } from "@chakra-ui/react";

function App() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();
	return (
		<div className="App">
			<Header onOpen={onOpen} />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/phones" element={<Phones onOpen={onOpen} />}></Route>
				<Route path="/login" element={<LoginForm />}></Route>
				<Route path="/register" element={<RegisterForm />}></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
			<Cart isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
			<Footer />
		</div>
	);
}

export default App;
