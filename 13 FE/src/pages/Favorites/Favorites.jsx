import React, { useEffect, useState } from "react";
import { useHeart } from "../../contexts/HeartContext";
import styled from "styled-components";
import { Button, IconButton } from "@chakra-ui/react";
import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "../../components/AddToCartButton/AddToCartButton";

const FavoritesContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: ${(props) => (props.hasItems ? "center" : "center")};
	justify-content: ${(props) => (props.hasItems ? "flex-start" : "center")};
	padding: 20px;
	min-height: 100vh;
	background-color: #f5f5f5;
`;

const NoFavoritesMessage = styled.p`
	font-size: var(--size-xl);
	font-weight: var(--font-weight-semibold);
	text-align: center;
	width: 100%;
`;

const ShopPhonesButton = styled(Button)`
	background-color: var(--color-quaternary);
	margin-top: var(--size-4xl);

	&:hover {
		background-color: var(--color-dark);
	}
`;

const Message = styled.h2`
	font-size: 1.5rem;
	font-weight: var(--font-weight-semibold);
	margin-bottom: 20px;
	text-align: left;
	width: 100%;
	color: #333;
`;

const FavoritesListContainer = styled.div`
	width: 70%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
	gap: 20px;
	margin: 0 auto;
`;

const FavItemContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 20px;
	background-color: var(--color-primary);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
	transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	}
`;

const FavItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	padding: 10px 0;
	cursor: pointer;

	.product-info {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.product-name {
		font-weight: var(--font-weight-medium);
		color: #333;
		font-size: 1.2rem;
	}

	.product-brand {
		color: #666;
		font-size: 1rem;
	}

	.product-price {
		color: var(--color-dark);
		font-weight: var(--font-weight-bold);
		font-size: 1.1rem;
	}

	img {
		width: 150px;
		height: auto;
	}
`;

const ActionsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
`;

const Favorites = ({ onOpen }) => {
	const { heart, setHeart, removeHeart } = useHeart();
	const [selected, setSelected] = useState("6GB x 128GB");
	const navigate = useNavigate();

	useEffect(() => {
		if (heart.length === 0) {
			const savedHeart = localStorage.getItem("heart");
			if (savedHeart) {
				setHeart(JSON.parse(savedHeart));
			}
		}
	}, [heart, setHeart]);

	useEffect(() => {
		const savedHeart = localStorage.getItem("heart");
		if (savedHeart) {
			setHeart(JSON.parse(savedHeart));
		}
	}, [localStorage.getItem("heart")]);

	const handleRemoveFromFavorites = (phone, e) => {
		e.stopPropagation();
		removeHeart(phone);
	};

	const goToPhones = () => navigate("/phones");
	const goToPhone = (phone) => navigate(`/phone/${phone._id}`);

	return (
		<FavoritesContainer hasItems={heart.length > 0}>
			{heart.length === 0 ? (
				<div>
					<NoFavoritesMessage>No hay nada en tus favoritos</NoFavoritesMessage>
					<ShopPhonesButton
						onClick={goToPhones}
						rightIcon={<ArrowForwardIcon />}
						variant="outline"
						size="lg">
						Ir a móviles
					</ShopPhonesButton>
				</div>
			) : (
				<>
					<Message>Tus móviles favoritos</Message>
					<FavoritesListContainer>
						{heart.map((phone) => (
							<FavItemContainer key={phone._id} onClick={() => goToPhone(phone)}>
								<FavItem>
									<img src={phone.imageUrl} alt="phone" />
									<div className="product-info">
										<p className="product-name">{phone.name}</p>
										<p className="product-brand">{phone.brand}</p>
										<p className="product-price">{phone.price}€</p>
									</div>
									<ActionsContainer>
										<IconButton
											className="delete-button"
											icon={<CloseIcon />}
											onClick={(e) => handleRemoveFromFavorites(phone, e)}
											size="sm"
											colorScheme="red"
										/>
										<AddToCartButton
											phone={phone}
											onOpen={onOpen}
											selectedOption={selected}
											isIconButton={true}
										/>
									</ActionsContainer>
								</FavItem>
							</FavItemContainer>
						))}
					</FavoritesListContainer>
				</>
			)}
		</FavoritesContainer>
	);
};

export default Favorites;
