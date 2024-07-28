import React from "react";
import styled from "styled-components";

const Container = styled.div`
	padding: var(--space-3);
	max-width: 900px;
	width: 80%;
	margin: 0 auto;
	font-family: var(--font-body);
	color: var(--color-dark);
	background-color: var(--color-primary);
	transition: var(--transition-main);

	@media (max-width: 756px) {
		padding: var(--space-2);
	}

	@media (max-width: 400px) {
		padding: var(--space-1);
	}
`;

const Section = styled.section`
	margin-bottom: var(--space-4);

	@media (max-width: 756px) {
		margin-bottom: var(--space-3);
	}

	@media (max-width: 400px) {
		margin-bottom: var(--space-2);
	}
`;

const Title = styled.h1`
	text-align: center;
	color: var(--color-secondary);
	font-size: var(--size-4xl);
	font-weight: var(--font-weight-bold);
	margin-bottom: var(--space-3);

	@media (max-width: 756px) {
		font-size: var(--size-3xl);
	}

	@media (max-width: 400px) {
		font-size: var(--size-2xl);
	}

	@media (max-width: 350px) {
		font-size: var(--size-xl);
	}
`;

const Subtitle = styled.h2`
	color: var(--color-tertiary);
	border-bottom: 2px solid var(--color-quaternary);
	padding-bottom: var(--space-2);
	font-size: var(--size-2xl);
	font-weight: var(--font-weight-semibold);

	@media (max-width: 756px) {
		font-size: var(--size-xl);
	}

	@media (max-width: 400px) {
		font-size: var(--size-lg);
	}

	@media (max-width: 350px) {
		font-size: var(--size-md);
	}
`;

const Paragraph = styled.p`
	line-height: 1.6;
	color: var(--color-dark);
	font-size: var(--size-md);
	margin: var(--space-3) 0;

	@media (max-width: 756px) {
		font-size: var(--size-sm);
		margin: var(--space-2) 0;
	}

	@media (max-width: 400px) {
		font-size: var(--size-xs);
		margin: var(--space-1) 0;
	}
`;

const List = styled.ul`
	list-style-type: disc;
	display: flex;
	flex-direction: column;
	align-items: start;
	gap: var(--space-2);
	padding-left: var(--space-2);
	color: var(--color-dark);
	font-size: var(--size-md);
	margin: var(--space-3) 0;

	@media (max-width: 756px) {
		font-size: var(--size-sm);
		gap: var(--space-1);
		margin: var(--space-2) 0;
	}

	@media (max-width: 400px) {
		font-size: var(--size-xs);
		gap: var(--space-1);
		margin: var(--space-1) 0;
	}
`;

const AboutUs = () => {
	return (
		<Container>
			<Title>Sobre Nosotros</Title>
			<Section>
				<Subtitle>Introducción a Phone Fusion</Subtitle>
				<Paragraph>
					Bienvenidos a <strong>Phone Fusion</strong>, su destino único para todos los dispositivos
					móviles de alta calidad. En Phone Fusion, nos apasiona la tecnología y estamos
					comprometidos a ofrecer una amplia gama de móviles de las marcas más reconocidas del
					mercado. Ya sea que esté buscando el último smartphone de gama alta o un modelo más
					accesible y funcional, lo tenemos cubierto.
				</Paragraph>
			</Section>

			<Section>
				<Subtitle>Nuestra Visión</Subtitle>
				<Paragraph>
					En <strong>Phone Fusion</strong>, nuestra visión es ser el líder en el sector de la
					tecnología móvil, proporcionando a nuestros clientes una experiencia de compra
					inigualable. Nos esforzamos por ofrecer productos de calidad, precios competitivos y un
					servicio al cliente excepcional.
				</Paragraph>
			</Section>

			<Section>
				<Subtitle>Nuestros Objetivos</Subtitle>
				<List>
					<li>
						Ofrecer una amplia gama de dispositivos móviles para satisfacer las diversas necesidades
						de nuestros clientes.
					</li>
					<li>Garantizar la calidad y autenticidad de todos nuestros productos.</li>
					<li>
						Proporcionar precios competitivos para que la tecnología avanzada sea accesible para
						todos.
					</li>
					<li>Brindar un servicio al cliente excepcional y asesoramiento experto.</li>
					<li>
						Fomentar la fidelización del cliente a través de programas de lealtad y servicios
						postventa de alta calidad.
					</li>
				</List>
			</Section>

			<Section>
				<Subtitle>Propuesta de Valor</Subtitle>
				<List>
					<li>
						<strong>Variedad de Marcas:</strong> Desde Apple hasta Xiaomi, cubrimos todas las marcas
						líderes en el mercado.
					</li>

					<li>
						<strong>Garantía de Calidad:</strong> Todos nuestros productos son originales y vienen
						con garantías oficiales.
					</li>
					<li>
						<strong>Servicio al Cliente:</strong> Nuestro equipo está siempre disponible para
						ayudarlo con cualquier consulta o problema.
					</li>
				</List>
			</Section>

			<Section>
				<Subtitle>Conclusión</Subtitle>
				<Paragraph>
					En <strong>Phone Fusion</strong>, no solo vendemos móviles, sino que también nos dedicamos
					a ofrecer una experiencia tecnológica completa y satisfactoria. Nuestra combinación de
					productos de alta calidad, precios accesibles y un servicio al cliente excepcional nos
					distingue en el mercado.
				</Paragraph>
			</Section>
		</Container>
	);
};

export default AboutUs;
