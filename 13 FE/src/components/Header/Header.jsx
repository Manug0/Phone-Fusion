import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../../contexts/CartContext";
import { useHeart } from "../../contexts/HeartContext";
import { fetchPhones } from "../../services/Api";
import UserAccounticon from "../UserAccountIcon/UserAccountIcon";
import logo from "/public/logo.png";

const StyledHeader = styled.header`
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 1000;
	width: 100%;
	height: 6rem;
	top: 0;
	left: 0;
	box-shadow: 0 4px 8px 0 rgba(136, 136, 136, 0.1), 0 4px 20px 0 rgba(141, 141, 141, 0.19);
	background-color: var(--color-light);
	padding: 0 20px;

	@media (max-width: 768px) {
		padding: 0 10px;
	}
`;

const Logo = styled.img`
	height: var(--size-6xl);
	transition: height 0.4s ease;
	cursor: pointer;

	@media (max-width: 768px) {
		height: var(--size-5xl);
	}
`;

const SearchBarContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	margin-left: auto;
	margin-right: 20px;

	@media (max-width: 768px) {
		margin-right: 10px;
	}
`;

const SearchBar = styled.div`
	display: flex;
	align-items: center;
	background-color: var(--color-light);
	border-radius: 50px;
	overflow: hidden;
	width: ${(props) => (props.open ? "400px" : "0")};
	transition: width 0.3s ease-in-out;
	border: none;

	@media (max-width: 768px) {
		width: ${(props) => (props.open ? "200px" : "0")};
	}
`;

const SearchInput = styled.input`
	flex: 1;
	padding: 10px 1rem;
	border: none;
	outline: none;
	box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1);
	box-sizing: border-box;
	background-color: var(--color-light);
	border-radius: 50px;
`;

const SuggestionsList = styled.ul`
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background-color: var(--color-primary);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	border-radius: 4px;
	list-style: none;
	margin: 0;
	padding: 0;
	max-height: 150px;
	overflow-y: auto;
`;

const SuggestionItem = styled.li`
	display: flex;
	align-items: center;
	padding: 10px;
	cursor: pointer;
	&:hover {
		background-color: #f0f0f0;
	}
`;

const SuggestionImage = styled.img`
	width: 50px;
	height: 50px;
	margin-right: 10px;
`;

const Nav = styled.nav`
	display: flex;
	align-items: center;
	gap: var(--size-3xl);
	font-size: var(--size-xl);
	color: var(--color-dark);

	@media (max-width: 768px) {
		flex-direction: column;
		position: fixed;
		top: 0;
		right: ${(props) => (props.open ? "0" : "-100%")};
		width: 70%;
		height: 100vh;
		background-color: var(--color-light);
		transition: right 0.3s ease-in-out;
		padding: 6rem 20px 20px;
		box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
	}
`;

const StyledNavLink = styled(NavLink)`
	cursor: pointer;
	transition: var(--transition-fast);
	&:hover {
		color: #24a7a7;
	}
	&[href="/favorites"]:hover {
		color: inherit;
	}

	@media (max-width: 768px) {
		margin: 10px 0;
	}
`;

const HeartIcon = styled.i.attrs({ className: "ri-heart-line" })`
	cursor: pointer;
`;

const SearchIcon = styled.i.attrs({ className: "ri-search-line" })`
	cursor: pointer;
	font-size: var(--size-2xl);
`;

const CartIcon = styled.i.attrs({ className: "ri-shopping-cart-line" })`
	cursor: pointer;
`;

const Counter = styled.span`
	position: absolute;
	cursor: pointer;
	color: var(--color-primary);
	background-color: red;
	padding: 1px 6px;
	border-radius: 50%;
	font-size: 10px;
	top: -15%;
	right: -45%;
	width: var(--size-md);
	height: var(--size-md);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const BurgerIcon = styled.div`
	display: none;
	cursor: pointer;
	flex-direction: column;
	gap: 5px;

	@media (max-width: 768px) {
		display: flex;
	}

	div {
		width: 25px;
		height: 3px;
		background-color: var(--color-dark);
		transition: all 0.3s linear;
	}
`;

const CloseNavIcon = styled.i.attrs({ className: "ri-close-line" })`
	display: none;
	cursor: pointer;
	font-size: var(--size-2xl);
	position: absolute;
	top: 20px;
	right: 20px;

	@media (max-width: 768px) {
		display: block;
	}
`;

const Overlay = styled.div`
	display: ${(props) => (props.open ? "block" : "none")};
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 999;
`;

const Header = ({ onOpen }) => {
	const { cartCount } = useCart();
	const { heartCount } = useHeart();
	const [search, setSearch] = useState(false);
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [navOpen, setNavOpen] = useState(false);
	const navigate = useNavigate();
	const searchInputRef = useRef(null);
	const searchBarRef = useRef(null);
	const navRef = useRef(null);

	const goToHome = () => navigate("/");
	const goToLogin = () => navigate("/login");

	const searchIconClick = () => {
		setSearch(!search);
		setTimeout(() => {
			if (searchInputRef.current) {
				searchInputRef.current.focus();
			}
		}, 300);
	};

	const closeSearch = () => {
		setSearch(false);
		setQuery("");
		setSuggestions([]);
	};

	const handleInputChange = async (e) => {
		const value = e.target.value;
		setQuery(value);
		if (value.length > 0) {
			const response = await fetchPhones(1, 100);
			const filteredPhones = response.data.phones.filter(
				(phone) =>
					phone.name.toLowerCase().includes(value.toLowerCase()) ||
					phone.brand.toLowerCase().includes(value.toLowerCase())
			);
			setSuggestions(filteredPhones.slice(0, 5));
		} else {
			setSuggestions([]);
		}
	};

	const handleSuggestionClick = (phoneId) => {
		setQuery("");
		setSuggestions([]);
		navigate(`/phone/${phoneId}`);
	};

	const handleClickOutside = (event) => {
		if (
			searchBarRef.current &&
			!searchBarRef.current.contains(event.target) &&
			searchInputRef.current !== event.target
		) {
			closeSearch();
		}

		if (navRef.current && !navRef.current.contains(event.target) && navOpen) {
			setNavOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [navOpen]);

	return (
		<>
			<Overlay open={navOpen} onClick={() => setNavOpen(false)} />
			<StyledHeader>
				<Logo src={logo} alt="logo" onClick={goToHome} />
				<SearchBarContainer ref={searchBarRef}>
					<SearchBar open={search}>
						<SearchInput
							type="text"
							placeholder="Buscar..."
							value={query}
							onChange={handleInputChange}
							ref={searchInputRef}
						/>
					</SearchBar>
					<SearchIcon onClick={searchIconClick} />
					{suggestions.length > 0 && (
						<SuggestionsList>
							{suggestions.map((phone) => (
								<SuggestionItem key={phone._id} onClick={() => handleSuggestionClick(phone._id)}>
									<SuggestionImage src={phone.imageUrl} alt={phone.name} />
									{phone.name} - {phone.brand}
								</SuggestionItem>
							))}
						</SuggestionsList>
					)}
				</SearchBarContainer>
				<BurgerIcon onClick={() => setNavOpen(!navOpen)}>
					<div></div>
					<div></div>
					<div></div>
				</BurgerIcon>
				<Nav open={navOpen} ref={navRef}>
					<CloseNavIcon onClick={() => setNavOpen(false)} />
					<StyledNavLink to="/" onClick={() => setNavOpen(false)}>
						Inicio
					</StyledNavLink>
					<StyledNavLink to="/phones" onClick={() => setNavOpen(false)}>
						Móviles
					</StyledNavLink>
					<StyledNavLink to="/about" onClick={() => setNavOpen(false)}>
						Sobre nosotros
					</StyledNavLink>
					<div style={{ position: "relative" }}>
						<StyledNavLink to="/favorites" onClick={() => setNavOpen(false)}>
							<HeartIcon />
							{heartCount > 0 && <Counter>{heartCount}</Counter>}
						</StyledNavLink>
					</div>
					<div style={{ position: "relative" }}>
						<CartIcon
							onClick={() => {
								onOpen();
								setNavOpen(false);
							}}
						/>
						{cartCount > 0 && (
							<Counter
								onClick={() => {
									onOpen();
									setNavOpen(false);
								}}>
								{cartCount}
							</Counter>
						)}
					</div>
					<UserAccounticon
						onClick={() => {
							goToLogin();
							setNavOpen(false);
						}}
					/>
				</Nav>
			</StyledHeader>
		</>
	);
};

export default Header;
