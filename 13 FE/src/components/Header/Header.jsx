import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../../contexts/CartContext";
import { useHeart } from "../../contexts/HeartContext";

const StyledHeader = styled.header`
	position: fixed;
	display: flex;
	z-index: 3;
	width: 100%;
	height: 6rem;
	top: 0;
	left: 0;
	box-shadow: 0 4px 8px 0 rgba(136, 136, 136, 0.1), 0 4px 20px 0 rgba(141, 141, 141, 0.19);
	background-color: var(--color-light);
`;

const HeaderContent = styled.div`
	display: flex;
	align-items: center;
`;

const Logo = styled.img`
	position: absolute;
	left: 50px;
	height: var(--size-6xl);
	transition: height 0.4s ease;
	cursor: pointer;
`;

const Nav = styled.nav`
	display: flex;
	position: absolute;
	right: 40px;
	gap: var(--size-3xl);
	justify-content: center;
	padding: var(--size-3xl);
	font-size: var(--size-xl);
	color: var(--color-dark);
`;

const StyledNavLink = styled(NavLink)`
	cursor: pointer;
	transition: var(--trasition-fast);
	&:hover {
		color: var(--color-secondary);
	}
`;

const HeartIcon = styled.i.attrs({ className: "ri-heart-line" })`
	cursor: pointer;
`;

const SearchIcon = styled.i.attrs({ className: "ri-search-line" })`
	cursor: pointer;
`;

const CartIcon = styled.i.attrs({ className: "ri-shopping-cart-line" })`
	cursor: pointer;
`;

const Counter = styled.span`
	position: absolute;
	cursor: pointer;

	position: absolute;
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

	const navigate = useNavigate();

	const goToHome = () => navigate("/");

	return (
		<StyledHeader>
			<HeaderContent>
				<Logo src="/src/assets/logo.png" alt="logo" onClick={goToHome} />
				<Nav>
					<SearchIcon />

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
			</HeaderContent>
		</StyledHeader>
	);
};

export default Header;
