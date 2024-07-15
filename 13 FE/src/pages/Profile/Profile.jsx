import React, { useEffect, useState } from "react";
import { getClientByUserId, getPhoneById } from "../../services/Api";
import styled from "styled-components";
import { getUserFromLocalStorage } from "../../utils/userHelper";

const ProfileWrapper = styled.div`
	display: flex;
	padding: 40px;
	background-color: #f9f9f9;
	min-height: 80vh;
`;

const UserInfoSection = styled.div`
	width: 30%;
	margin-right: 40px;
`;

const UserInfo = styled.div`
	background-color: #fff;
	padding: 30px;
	border-radius: 15px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const AccountTitle = styled.h2`
	font-size: 24px;
	color: #333;
	margin-bottom: 20px;
	border-bottom: 2px solid #f0f0f0;
	padding-bottom: 10px;
`;

const UserName = styled.h1`
	font-size: 28px;
	font-weight: bold;
	margin: 0;
	color: #222;
`;

const UserEmail = styled.p`
	font-size: 16px;
	color: #666;
	margin: 10px 0 20px 0;
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
`;

const OrdersTitle = styled.h2`
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 20px;
	color: #222;
`;
const SalesList = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
	width: 100%;
`;

const SaleItem = styled.li`
	border: 1px solid #e0e0e0;
	margin-bottom: 20px;
	padding: 25px;
	background-color: #fff;
	border-radius: 12px;
	box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
	transition: all 0.3s ease;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
	margin-top: 15px;
	padding: 10px;
	background-color: #f8f8f8;
	border-radius: 8px;
`;

const PhoneImage = styled.img`
	width: 70px;
	height: 70px;
	border-radius: 8px;
	margin-right: 20px;
	object-fit: cover;
`;

const PhoneDetails = styled.div`
	display: flex;
	flex-direction: column;
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
	// const user = JSON.parse(localStorage.getItem("user"));
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
