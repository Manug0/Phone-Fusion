import React from "react";
import { useHeart } from "../../contexts/HeartContext";
import styled from "styled-components";
import { Button, IconButton } from "@chakra-ui/react";
import { ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const FavoritesContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
	min-height: calc(100vh - 300px);
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

const FavItemContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	border-bottom: 1px solid var(--color-dark);
	padding: 10px;
`;

const FavItem = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	padding: 10px 0;
	.product-info {
		display: flex;
		flex-direction: column;
	}
	.product-name {
		font-weight: var(--font-weight-medium);
	}
	.product-price {
		color: var(--color-primary);
		font-weight: var(--font-weight-bold);
	}
`;

const Favorites = () => {
	const { heart, removeHeart } = useHeart();

	const navigate = useNavigate();

	const goToPhones = () => navigate("/phones");
	return (
		<FavoritesContainer>
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
				heart.map((phone) => (
					<FavItemContainer key={phone.id}>
						<FavItem>
							<img src={phone.imageUrl} alt="phone" width="100" />
							<div className="product-info">
								<p className="product-name">{phone.name}</p>
								<p className="product-price">{phone.price}€</p>
							</div>
							<IconButton
								className="delete-button"
								icon={<DeleteIcon />}
								onClick={() => removeHeart(phone)}
								size="sm"
							/>
						</FavItem>
					</FavItemContainer>
				))
			)}
		</FavoritesContainer>
	);
};

export default Favorites;
