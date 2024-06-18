import React from "react";
import { Box, Heading, Flex, Image } from "@chakra-ui/react";
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
	margin: auto;
	height: 6rem;
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
`;

const StyledNavLink = styled(NavLink)`
	cursor: pointer;
	transition: var(--trasition-fast);
	&:hover {
		color: var(--color-secondary);
	}
`;

const BagIcon = styled.i.attrs({ className: "ri-shopping-bag-line" })`
	margin-right: 40px;
	cursor: pointer;
`;

const UserIcon = styled.i.attrs({ className: "ri-user-3-line" })`
	cursor: pointer;
`;
const Header = () => {
	return (
		<StyledHeader>
			<HeaderContent>
				<Logo src="/src/assets/logo.png" alt="logo"></Logo>
				<Nav>
					<StyledNavLink to="/">Inicio</StyledNavLink>
					<StyledNavLink to="/phones">Móviles</StyledNavLink>
					<StyledNavLink to="/contact">Contacto</StyledNavLink>
					<BagIcon />
					<UserIcon />
				</Nav>
			</HeaderContent>
		</StyledHeader>
	);
};

export default Header;
