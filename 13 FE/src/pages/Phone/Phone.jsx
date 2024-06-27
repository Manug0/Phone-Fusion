import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPhoneById, getSaleById } from "../../services/Api";
import styled from "styled-components";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, position } from "@chakra-ui/react";
import CartIcon from "../../components/Cart/CartIcon";
import HeartSVG from "../../components/SVGs/HeartSVG";

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
	display: flex;
	flex-direction: column;
	margin: auto;
	margin-top: var(--size-6xl);
	width: 80%;
`;

const WriteReview = styled.button`
	background-color: #e3e8ff;
	position: absolute;
	right: var(--size-xl);
	padding: var(--size-md);
	border-radius: 8px;
	font-weight: var(--font-weight-semibold);
`;

const ReviewContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	background-color: #fafafa;
	width: 20%;
`;

const Rating = styled.p`
	font-size: 16px;
	font-weight: 500;
`;

const Reviews = styled.p`
	font-size: 16px;
	font-weight: 500;
`;

const Phone = ({ onOpen }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [phone, setPhone] = useState(null);
	const [loading, setLoading] = useState(true);
	const [selected, setSelected] = useState(null);
	const [extraPrice, setExtraPrice] = useState(null);

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

	const handleClick = (value) => {
		setSelected(value);
		if (!extraPrice) {
			setExtraPrice([50, 60, 70][Math.floor(Math.random() * 3)]);
		}
	};

	if (loading) {
		return <div>Cargando...</div>;
	}

	if (!phone) {
		return <div>No se encontró el teléfono.</div>;
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
					<Condition condition={phone.condition}>{phone.condition}</Condition>

					<div style={{ display: "flex", gap: "8px" }}>
						<Button
							colorScheme={selected === "6GB x 128GB" ? "blue" : "gray"}
							variant="outline"
							onClick={() => handleClick("6GB x 128GB")}>
							6GB x 128GB
						</Button>{" "}
						<Button
							colorScheme={selected === "8GB x 256GB" ? "blue" : "gray"}
							variant="outline"
							onClick={() => handleClick("8GB x 256GB")}>
							8GB x 256GB
						</Button>
					</div>
					<div>
						<p>
							<i class="ri-truck-line"></i> Envío gratis{" "}
						</p>
						<span style={{ fontWeight: "var(--font-weight-semibold)", color: "green" }}>
							Recíbelo mañana
						</span>{" "}
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
				<WriteReview>Escribe una reseña</WriteReview>
				{phone.review && phone.review.length > 0 ? (
					<ReviewContainer>
						<Rating>Rating: {phone.rating.join(", ")}</Rating>
						{phone.review.map((rev, index) => (
							<Reviews key={index}>{rev}</Reviews>
						))}
					</ReviewContainer>
				) : (
					<ReviewSection>Se el primero en comentar!</ReviewSection>
				)}
			</ReviewSection>
		</Container>
	);
};

export default Phone;
