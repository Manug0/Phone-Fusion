import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Input,
	Text,
	FormLabel,
} from "@chakra-ui/react";
import styled from "styled-components";
import { updatePhone } from "../../services/Api";
import { useParams } from "react-router-dom";

const StarRatingContainer = styled.div`
	display: flex;
`;

const StarButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	padding: 0;
	margin: 0 5px;

	&.on .star {
		color: gold;
	}

	&.off .star {
		color: lightgray;
	}
`;

const Star = styled.span`
	font-size: 2rem;
`;

const ErrorMessage = styled(Text)`
	color: red;
	font-size: 0.8rem;
`;

const ReviewModal = ({ setPhone, phone, disclosure }) => {
	const { isOpen, onClose } = disclosure;
	const { id } = useParams();
	const [hover, setHover] = useState(0);
	const [userName, setUserName] = useState("");

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		trigger,
	} = useForm();

	useEffect(() => {
		let storedUser = JSON.parse(localStorage.getItem("user"));
		setUserName(storedUser.user.name);
		setValue("name", storedUser.user.name);
	}, [setValue]);

	const rating = watch("rating", 0);

	const writeReview = async (data) => {
		try {
			let rawDate = new Date();
			let options = { year: "numeric", month: "2-digit", day: "2-digit" };
			let date = rawDate.toLocaleDateString("es-ES", options);

			const reviewData = {
				review: data.review,
				rating: data.rating,
				clientPublicName: data.name,
				reviewDate: date,
			};
			await updatePhone(id, { $push: { reviews: reviewData } });
			setPhone({ ...phone, reviews: [...phone.reviews, reviewData] });
			onClose();
		} catch (error) {
			console.error("Error submitting review", error);
		}
	};

	const handleRatingClick = (index) => {
		setValue("rating", index);
		trigger("rating");
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} size="xl">
				<ModalOverlay />
				<ModalContent as="form" onSubmit={handleSubmit(writeReview)}>
					<ModalHeader>¿Cómo calificarías este producto?</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<StarRatingContainer style={{ marginBottom: "var(--size-lg)" }}>
							{[...Array(5)].map((_, index) => {
								index += 1;
								return (
									<StarButton
										type="button"
										key={index}
										className={index <= (hover || rating) ? "on" : "off"}
										onClick={() => handleRatingClick(index)}
										onMouseEnter={() => setHover(index)}
										onMouseLeave={() => setHover(rating)}>
										<Star className="star">&#9733;</Star>
									</StarButton>
								);
							})}
						</StarRatingContainer>
						{errors.rating && <ErrorMessage>La calificación es obligatoria</ErrorMessage>}
						<FormLabel>Nombre público que aparecerá ante otros clientes</FormLabel>
						<Input
							style={{
								padding: "var(--size-xl)",
								borderColor: errors.name ? "red" : "initial",
							}}
							size="md"
							value={userName}
							onChange={(e) => {
								setUserName(e.target.value);
								setValue("name", e.target.value);
							}}
						/>
						{errors.name && <ErrorMessage>El nombre es obligatorio</ErrorMessage>}
						<FormLabel>Comparte tu experiencia</FormLabel>
						<Input
							style={{
								height: "var(--size-6xl)",
								padding: "var(--size-xl)",
								borderColor: errors.review ? "red" : "initial",
							}}
							placeholder="Me ha encantado!"
							{...register("review")}
						/>
					</ModalBody>
					<ModalFooter>
						<Button variant="ghost" type="submit">
							Finalizar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ReviewModal;
