import React, { useEffect, useState } from "react";
import { getClientByUserId, getPhoneById } from "../../services/Api";
import styled from "styled-components";
import { getUserFromLocalStorage } from "../../utils/userHelper";

const ProfileWrapper = styled.div`
	display: flex;
	padding: var(--space-4);
	background-color: var(--color-light);
	min-height: 100vh;

	@media (max-width: 756px) {
		flex-direction: column;
		padding: var(--space-2);
	}
`;

const UserInfoSection = styled.div`
	width: 30%;
	margin-right: var(--space-4);

	@media (max-width: 756px) {
		width: 100%;
		margin-right: 0;
		margin-bottom: var(--space-4);
	}
`;

const UserInfo = styled.div`
	background-color: var(--color-primary);
	padding: var(--space-3);
	border-radius: 15px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

	@media (max-width: 756px) {
		padding: var(--space-2);
	}
`;

const AccountTitle = styled.h2`
	font-size: 24px;
	color: #333;
	margin-bottom: 20px;
	border-bottom: 2px solid #f0f0f0;
	padding-bottom: 10px;
`;

const UserName = styled.h1`
	font-size: var(--size-3xl);
	font-weight: var(--font-weight-bold);
	margin: 0;
	color: var(--color-dark);

	@media (max-width: 756px) {
		font-size: var(--size-2xl);
	}
`;

const UserEmail = styled.p`
	font-size: var(--size-md);
	color: var(--color-dark);
	margin: var(--space-1) 0 var(--space-3) 0;

	@media (max-width: 756px) {
		font-size: var(--size-sm);
	}
`;
const UserInfoItem = styled.div`
	margin-bottom: 15px;
`;

const UserInfoLabel = styled.p`
	font-size: 14px;
	color: #888;
	margin-bottom: 5px;
`;

const UserInfoValue = styled.p`
	font-size: 16px;
	color: #333;
	font-weight: 500;
`;

const OrdersSection = styled.div`
	flex: 1;

	@media (max-width: 756px) {
		width: 100%;
	}
`;

const OrdersTitle = styled.h2`
	font-size: var(--size-2xl);
	font-weight: var(--font-weight-bold);
	margin-bottom: var(--space-3);
	color: var(--color-dark);

	@media (max-width: 756px) {
		font-size: var(--size-xl);
	}
`;

const SalesList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
	width: 100%;
`;

const SaleItem = styled.li`
	border: 1px solid var(--color-quintary);
	margin-bottom: var(--space-3);
	padding: var(--space-3);
	background-color: var(--color-primary);
	border-radius: 12px;
	box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
	transition: all var(--trasition-fast);

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
	}

	@media (max-width: 756px) {
		padding: var(--space-2);
	}
`;

const SaleDate = styled.p`
	font-size: 18px;
	font-weight: bold;
	color: #555;
	margin: 0 0 15px 0;
`;

const PhoneWrapper = styled.div`
	display: flex;
	align-items: center;
	margin-top: var(--space-2);
	padding: var(--space-1);
	background-color: var(--color-light);
	border-radius: 8px;

	@media (max-width: 756px) {
		flex-direction: row;
		align-items: flex-start;
	}
`;

const PhoneImage = styled.img`
	width: 70px;
	height: 70px;
	border-radius: 8px;
	margin-right: var(--space-3);
	object-fit: cover;

	@media (max-width: 756px) {
		margin-right: 0;
		margin-bottom: var(--space-2);
	}
`;

const PhoneDetails = styled.div`
	display: flex;
	flex-direction: column;

	@media (max-width: 756px) {
		gap: var(--space-1);
	}
`;

const PhoneName = styled.p`
	font-size: 18px;
	font-weight: 600;
	color: #333;
	margin: 0;
`;

const PhonePrice = styled.p`
	font-size: 16px;
	color: #888;
	margin: 5px 0 0 0;
`;

const NoOrdersMessage = styled.p`
	font-size: 18px;
	color: #666;
	text-align: center;
`;
const Profile = () => {
	const user = getUserFromLocalStorage();
	const [client, setClient] = useState(null);

	useEffect(() => {
		const fetchClient = async () => {
			try {
				const clientRes = await getClientByUserId(user._id);
				setClient(clientRes.data);
			} catch (error) {
				console.error("Error encontrando el cliente", error);
			}
		};

		fetchClient();
	}, [user._id]);

	let options = { year: "numeric", month: "2-digit", day: "2-digit" };

	return (
		<ProfileWrapper>
			<UserInfoSection>
				<UserInfo>
					<AccountTitle>Mi cuenta</AccountTitle>
					<UserName>{user.name}</UserName>
					<UserEmail>{user.email}</UserEmail>
					<UserInfoItem>
						<UserInfoLabel>Miembro desde</UserInfoLabel>
						<UserInfoValue>{new Date(user.createdAt).toLocaleDateString()}</UserInfoValue>
					</UserInfoItem>
					<UserInfoItem>
						<UserInfoLabel>Total de pedidos</UserInfoLabel>
						<UserInfoValue>{client?.saleId?.length || 0}</UserInfoValue>
					</UserInfoItem>
				</UserInfo>
			</UserInfoSection>
			<OrdersSection>
				<OrdersTitle>Mis Pedidos</OrdersTitle>
				{client && client.saleId && client.saleId.length > 0 ? (
					<SalesList>
						{client.saleId.map((sale, index) => {
							let date = new Date(sale.saleDate).toLocaleDateString("es-ES", options);
							return (
								<SaleItem key={index}>
									<SaleDate>Fecha de pedido: {date}</SaleDate>
									{sale.items.map((item, itemIndex) => (
										<PhoneWrapper key={itemIndex}>
											<PhoneImage src={item.phoneId[0].imageUrl} alt={item.phoneId[0].name} />
											<PhoneDetails>
												<PhoneName>{item.phoneId[0].name}</PhoneName>
												<PhonePrice>{item.price}€</PhonePrice>
												<p>Cantidad: {item.quantity}</p>
												<p>Opción: {item.selectedOption}</p>
											</PhoneDetails>
										</PhoneWrapper>
									))}
								</SaleItem>
							);
						})}
					</SalesList>
				) : (
					<NoOrdersMessage>No hay ventas registradas.</NoOrdersMessage>
				)}
			</OrdersSection>
		</ProfileWrapper>
	);
};

export default Profile;
