import React, { useRef, useEffect } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Phones from "./pages/Products/Phones";
import NotFound from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoginForm from "./pages/Forms/LoginForm";
import RegisterForm from "./pages/Forms/RegisterForm";
import Cart from "./components/Cart/Cart";
import { useDisclosure } from "@chakra-ui/react";
import Phone from "./pages/Phone/Phone";
import Favorites from "./pages/Favorites/Favorites";
import Profile from "./pages/Profile/Profile";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const PageContainer = styled(motion.div)`
	width: 100%;
`;

const RoutesContainer = styled.div`
	position: relative;
	min-height: 100vh;
	overflow: hidden;
`;

function App() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();
	let location = useLocation();

	useEffect(() => {
		setTimeout(() => {
			window.scrollTo(0, 0);
		}, 490);
	}, [location.pathname]);

	const pageVariants = {
		initial: {
			opacity: 0,
			y: 20,
		},
		in: {
			opacity: 1,
			y: 0,
		},
		out: {
			opacity: 0,
			y: -20,
		},
	};

	const pageTransition = {
		type: "tween",
		ease: "anticipate",
		duration: 0.5,
	};

	return (
		<div className="App">
			<Header onOpen={onOpen} isOpen={isOpen} />
			<RoutesContainer>
				<AnimatePresence mode="wait">
					<PageContainer
						key={location.pathname}
						initial="initial"
						animate="in"
						exit="out"
						variants={pageVariants}
						transition={pageTransition}>
						<Routes location={location}>
							<Route path="/" element={<Home />} />
							<Route path="/phones" element={<Phones onOpen={onOpen} />} />
							<Route path="/favorites" element={<Favorites onOpen={onOpen} />} />
							<Route path="/login" element={<LoginForm />} />
							<Route path="/register" element={<RegisterForm />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/phone/:id" element={<Phone onOpen={onOpen} />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</PageContainer>
				</AnimatePresence>
			</RoutesContainer>
			<Cart isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
			<Footer />
		</div>
	);
}

export default App;
