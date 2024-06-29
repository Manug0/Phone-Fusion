// Phone.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPhoneById } from "../../services/Api";
import styled from "styled-components";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, Spinner } from "@chakra-ui/react";
import CartIcon from "../../components/Cart/CartIcon";
import HeartSVG from "../../components/SVGs/HeartSVG";
import ReviewModal from "../../components/ReviewModal/ReviewModal";
import ReviewsBox from "../../components/ReviewBox/ReviewBox";
import Rating from "../../components/Rating/Rating";

const Container = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
`;

const BackButton = styled.button`
	position: absolute;
	display: flex;
	align-items: center;
	top: var(--size-4xl);
	left: var(--size-4xl);
	cursor: pointer;
`;

const StyledHeartSVG = styled(HeartSVG)`
	position: absolute;
	top: var(--size-4xl);
	cursor: pointer;
	width: 30px;
	height: 30px;
`;

const Image = styled.img`
	width: 500px;
	height: auto;
	border-radius: 10px;
	margin-bottom: 20px;
`;

const Details = styled.div`
	margin-top: var(--size-5xl);
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 80%;
	text-align: center;
	gap: var(--size-xl);
`;

const Brand = styled.p`
	font-size: 20px;
	font-weight: 500;
`;

const Price = styled.p`
	font-size: 22px;
	font-weight: 700;
	color: #333;
`;

const Condition = styled.p`
	font-size: 18px;
	font-weight: 500;
	color: ${(props) => (props.condition === "Usado" ? "#e0986e" : "green")};
`;

const ReviewSection = styled.section`
	position: relative;
	display: flex;
	flex-direction: column;
	margin: auto;
	margin-top: var(--size-6xl);
	width: 80%;
`;

const Phone = ({ onOpen }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [phone, setPhone] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState("6GB x 128GB");
	const [extraPrice, setExtraPrice] = useState(null);
	const [averageRating, setAverageRating] = useState(0);

	const backToPhones = () => navigate("/phones");

	useEffect(() => {
		const fetchPhone = async () => {
			try {
				const phoneRes = await getPhoneById(id);
				setPhone(phoneRes.data);
				setLoading(false);
			} catch (error) {
				console.error("Error consiguiendo el móvil:", error);
				setLoading(false);
			}
		};

		fetchPhone();
	}, [id]);

	useEffect(() => {
		if (phone) {
			const avgRating =
				phone.reviews.reduce((sum, review) => sum + review.rating, 0) / phone.reviews.length;
			setAverageRating(avgRating);
		}
	}, [phone]);

	const handleClick = (value) => {
		setSelected(value);
		if (!extraPrice) {
			setExtraPrice([50, 60, 70][Math.floor(Math.random() * 3)]);
		}
	};

	if (loading) {
		return <Spinner />;
	}

	return (
		<Container>
			<BackButton onClick={backToPhones}>
				<ArrowBackIcon boxSize={6} />
				Volver a móviles
			</BackButton>
			<div style={{ display: "flex", gap: "var(--size-5xl)" }}>
				<Image src={phone.imageUrl} alt={phone.name} />
				<StyledHeartSVG />
				<Details>
					<Brand>
						{phone.brand} {phone.name}
					</Brand>
					{selected === "8GB x 256GB" ? (
						<Price>{phone.price + extraPrice}€</Price>
					) : (
						<Price>{phone.price}€</Price>
					)}
					<Rating averageRating={averageRating} reviewCount={phone?.reviews?.length || 0} />{" "}
					<Condition condition={phone.condition}>{phone.condition}</Condition>
					<div style={{ display: "flex", gap: "8px" }}>
						<Button
							colorScheme={selected === "6GB x 128GB" ? "blue" : "gray"}
							variant="outline"
							onClick={() => handleClick("6GB x 128GB")}>
							6GB x 128GB
						</Button>
						<Button
							colorScheme={selected === "8GB x 256GB" ? "blue" : "gray"}
							variant="outline"
							onClick={() => handleClick("8GB x 256GB")}>
							8GB x 256GB
						</Button>
					</div>
					<div>
						<p>
							<i className="ri-truck-line"></i> Envío gratis
						</p>
						<span style={{ fontWeight: "var(--font-weight-semibold)", color: "green" }}>
							Recíbelo mañana
						</span>
					</div>
					<CartIcon
						phone={phone}
						onOpen={onOpen}
						colorScheme="gray"
						size="lg"
						styles={{ fontSize: "var(--size-xl)" }}
					/>
				</Details>
			</div>
			<ReviewSection>
				<ReviewModal />
				{phone.reviews && phone.reviews.length > 0 ? (
					<ReviewsBox reviews={phone.reviews} />
				) : (
					<p>Se el primero en comentar!</p>
				)}
			</ReviewSection>
		</Container>
	);
};

export default Phone;
