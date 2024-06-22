import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Phones from "./pages/Products/Phones";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginForm from "./pages/Forms/LoginForm";
import RegisterForm from "./pages/Forms/RegisterForm";

function App() {
	return (
		<div className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/phones" element={<Phones />}></Route>
				<Route path="/login" element={<LoginForm />}></Route>
				<Route path="/register" element={<RegisterForm />}></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
