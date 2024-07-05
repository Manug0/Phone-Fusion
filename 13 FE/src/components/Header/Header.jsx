import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../../contexts/CartContext";
import { useHeart } from "../../contexts/HeartContext";
import { fetchPhones } from "../../services/Api";

const StyledHeader = styled.header`
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 3;
	width: 100%;
	height: 6rem;
	top: 0;
	left: 0;
	box-shadow: 0 4px 8px 0 rgba(136, 136, 136, 0.1), 0 4px 20px 0 rgba(141, 141, 141, 0.19);
	background-color: var(--color-light);
	padding: 0 20px;
`;

const Logo = styled.img`
	height: var(--size-6xl);
	transition: height 0.4s ease;
	cursor: pointer;
`;

const SearchBarContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	flex: 1;
	margin-left: 20px;
`;

const SearchBar = styled.div`
	display: flex;
	align-items: center;
	background-color: var(--color-light);
	border-radius: 50px;
	overflow: hidden;
	width: ${(props) => (props.open ? "100%" : "0")};
	transition: width 0.3s ease-in-out;
	border: none;
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

const CloseIcon = styled.i.attrs({ className: "ri-close-line" })`
	cursor: pointer;
	padding: 10px;
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
	padding: 0 1rem;
`;

const StyledNavLink = styled(NavLink)`
	cursor: pointer;
	transition: var(--transition-fast);
	&:hover {
		color: var(--color-secondary);
	}
`;

const HeartIcon = styled.i.attrs({ className: "ri-heart-line" })`
	cursor: pointer;
`;

const SearchIcon = styled.i.attrs({ className: "ri-search-line" })`
	cursor: pointer;
	transition: opacity 0.3s ease-in-out;
	opacity: ${(props) => (props.open ? 0 : 1)};
	pointer-events: ${(props) => (props.open ? "none" : "auto")};
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

const UserIcon = styled.i.attrs({ className: "ri-user-3-line" })`
	cursor: pointer;
`;

const Header = ({ onOpen }) => {
	const { cartCount } = useCart();
	const { heartCount } = useHeart();
	const [search, setSearch] = useState(false);
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const navigate = useNavigate();
	const searchInputRef = useRef(null);
	const searchBarRef = useRef(null);

	const goToHome = () => navigate("/");

	const searchIconClick = () => {
		setSearch(true);
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
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<StyledHeader>
			<Logo src="/src/assets/logo.png" alt="logo" onClick={goToHome} />
			<SearchBarContainer ref={searchBarRef}>
				<SearchBar open={search}>
					<SearchInput
						type="text"
						placeholder="Buscar..."
						value={query}
						onChange={handleInputChange}
						ref={searchInputRef}
					/>
					<CloseIcon onClick={closeSearch} />
					{suggestions.length > 0 ? (
						<SuggestionsList>
							{suggestions.map((phone) => (
								<SuggestionItem key={phone._id} onClick={() => handleSuggestionClick(phone._id)}>
									<SuggestionImage src={phone.imageUrl} alt={phone.name} />
									{phone.name} - {phone.brand}
								</SuggestionItem>
							))}
						</SuggestionsList>
					) : (
						query && (
							<SuggestionsList>
								<SuggestionItem>No hay sugerencias</SuggestionItem>
							</SuggestionsList>
						)
					)}
				</SearchBar>
			</SearchBarContainer>
			<Nav>
				<SearchIcon open={search} onClick={searchIconClick} />
				<StyledNavLink to="/">Inicio</StyledNavLink>
				<StyledNavLink to="/phones">Móviles</StyledNavLink>
				<StyledNavLink to="/about">Sobre nosotros</StyledNavLink>
				<div style={{ position: "relative" }}>
					<StyledNavLink to="/favorites">
						<HeartIcon />
						{heartCount > 0 && <Counter>{heartCount}</Counter>}
					</StyledNavLink>
				</div>
				<div style={{ position: "relative", width: "fit-content", marginRight: "40px" }}>
					<CartIcon onClick={onOpen} />
					{cartCount > 0 && <Counter onClick={onOpen}>{cartCount}</Counter>}
				</div>
				<StyledNavLink to="/login">
					<UserIcon />
				</StyledNavLink>
			</Nav>
		</StyledHeader>
	);
};

export default Header;
