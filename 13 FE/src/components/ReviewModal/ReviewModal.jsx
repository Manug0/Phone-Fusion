import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
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
} from "@chakra-ui/react";
import styled from "styled-components";
import { updatePhone } from "../../services/Api";
import { useParams } from "react-router-dom";

// const WriteReview = styled(Button)`
// 	background-color: var(--color-quaternary);
// 	position: absolute;
// 	right: var(--size-xl);
// 	padding: var(--size-xs);
// 	border-radius: 8px;
// 	border: 1px solid var(--color-secondary);
// 	font-weight: var(--font-weight-medium);

// 	&:hover {
// 		background-color: var(--color-tertiary);
// 	}
// `;

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

const ReviewModal = ({ setPhone, phone, disclosure }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { id } = useParams();
	const [hover, setHover] = useState(0);
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm();

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
			disclosure.onClose();
		} catch (error) {
			console.error("Error submitting review", error);
		}
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
										onClick={() => setValue("rating", index)}
										onMouseEnter={() => setHover(index)}
										onMouseLeave={() => setHover(rating)}>
										<Star className="star">&#9733;</Star>
									</StarButton>
								);
							})}
						</StarRatingContainer>
						<Input
							style={{ height: "var(--size-6xl)", padding: "var(--size-xl)" }}
							placeholder="Comparte tu experiencia"
							{...register("review")}
						/>
						<Input
							style={{ padding: "var(--size-xl)" }}
							size="md"
							placeholder="Nombre público que aparecerá ante otros clientes"
							{...register("name", { required: true })}
						/>
						{errors.name && <span>El nombre es obligatorio</span>}
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
