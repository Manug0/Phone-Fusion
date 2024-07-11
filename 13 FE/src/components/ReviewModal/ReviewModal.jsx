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
	FormControl,
	FormErrorMessage,
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
		formState: { errors, isSubmitted },
		trigger,
		clearErrors,
	} = useForm({
		defaultValues: {
			rating: 0,
		},
	});

	useEffect(() => {
		register("rating", { required: "La calificación es obligatoria", min: 1 });
	}, [register]);

	useEffect(() => {
		let storedUser = JSON.parse(localStorage.getItem("user"));
		setUserName(storedUser.name);
		setValue("name", storedUser.name);
	}, [setValue]);

	const rating = watch("rating", 0);

	const resetForm = () => {
		setValue("name", "");
		setValue("rating", 0);
		setValue("review", "");
		setUserName("");
		setHover(0);
		clearErrors();
	};

	const writeReview = async (data) => {
		if (data.rating === 0) {
			setValue("rating", 0, { shouldValidate: true });
			return;
		}
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
			handleClose();
		} catch (error) {
			console.error("Error submitting review", error);
		}
	};

	const handleRatingClick = (index) => {
		setValue("rating", index, { shouldValidate: true });
		trigger("rating");
	};

	const handleClose = () => {
		resetForm();
		onClose();
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={handleClose} size="xl">
				<ModalOverlay />
				<ModalContent as="form" onSubmit={handleSubmit(writeReview)}>
					<ModalHeader>
						¿Cómo calificarías este producto? <span style={{ color: "red" }}>*</span>
					</ModalHeader>
					<ModalCloseButton onClick={handleClose} />
					<ModalBody>
						<div>
							<input
								type="hidden"
								{...register("rating", { required: "La calificación es obligatoria", min: 1 })}
							/>
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
							{(errors.rating || (isSubmitted && !rating)) && (
								<ErrorMessage>
									{errors.rating?.message || "La calificación es obligatoria"}
								</ErrorMessage>
							)}
						</div>
						<FormControl isInvalid={errors.name}>
							<FormLabel>
								Nombre público <span style={{ color: "red" }}>*</span>
							</FormLabel>
							<Input
								{...register("name", { required: "El nombre es obligatorio" })}
								size="md"
								style={{ padding: "var(--size-xs)" }}
							/>
							<FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
						</FormControl>
						<FormControl
							style={{
								marginTop: "var(--size-xl)",
							}}>
							<FormLabel>Comparte tu experiencia</FormLabel>
							<Input
								{...register("review")}
								style={{
									height: "var(--size-6xl)",
									padding: "var(--size-xs)",
								}}
								placeholder="Me ha encantado!"
							/>
						</FormControl>
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
