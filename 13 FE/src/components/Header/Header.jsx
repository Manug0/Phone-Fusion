import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

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
	/* transition: padding-right 0.3s ease; */
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

const BagIcon = styled.i.attrs({ className: "ri-shopping-cart-line" })`
	margin-right: 40px;
	cursor: pointer;
`;

const UserIcon = styled.i.attrs({ className: "ri-user-3-line" })`
	cursor: pointer;
`;
const Header = ({ onOpen, isOpen }) => {
	return (
		<StyledHeader>
			<HeaderContent>
				<Logo src="/src/assets/logo.png" alt="logo"></Logo>
				<Nav style={{ paddingRight: isOpen ? "8px" : "0px" }}>
					<StyledNavLink to="/">Inicio</StyledNavLink>
					<StyledNavLink to="/phones">Móviles</StyledNavLink>
					<StyledNavLink to="/about">Sobre nosotros</StyledNavLink>
					<SearchIcon />
					<HeartIcon />
					<BagIcon onClick={onOpen} />
					<StyledNavLink to="/login">
						<UserIcon />
					</StyledNavLink>
				</Nav>
			</HeaderContent>
		</StyledHeader>
	);
};

export default Header;
