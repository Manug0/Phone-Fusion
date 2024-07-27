import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
	display: flex;
	flex-direction: column;
	gap: var(--size-xl);
	width: 100%;
	height: fit-content;
	background-color: var(--color-light);
	padding: 3rem 1rem;

	@media (max-width: 768px) {
		padding: 2rem 1rem;
	}
`;

const MainFooter = styled.div`
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	gap: var(--size-2xl);

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const FooterLinks = styled.div`
	display: flex;
	justify-content: space-between;
	gap: var(--size-3xl);

	@media (max-width: 576px) {
		flex-direction: column;
		gap: var(--size-xl);
	}
`;

const FooterH5 = styled.h5`
	font-size: var(--size-2xl);
	margin-bottom: var(--size-2xl);
`;

const SupportLinks = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--size-xl);
`;

const Newsletter = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--size-xl);
	max-width: 400px;

	@media (max-width: 768px) {
		max-width: 100%;
	}
`;

const NewsletterInput = styled.input`
	width: 100%;
	padding: 10px 20px;
	margin: 8px 0;
	border: none;
	border-bottom: 2px solid #555;
	outline: none;
	background-color: transparent;
	width: 70%;
	color: #555;
	font-size: var(--size-md);
	max-width: 300px;

	&:focus {
		border-bottom: 2px solid var(--color-secondary);
	}

	&::placeholder {
		color: #aaa;
	}

	@media (max-width: 576px) {
		max-width: 100%;
	}
`;

const SubscribeButton = styled.button`
	display: inline-block;
	padding: 10px 20px;
	margin: 10px;
	border: none;
	border-radius: 5px;
	background-color: var(--color-tertiary);
	color: white;
	font-size: var(--size-md);
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #283593;
	}

	&:active {
		background-color: #1a237e;
	}

	&:disabled {
		background-color: #aaa;
		cursor: not-allowed;
	}

	@media (max-width: 576px) {
		width: 100%;
	}
`;

const Subfooter = styled.div`
	display: flex;
	width: 100%;
	padding: var(--size-2xl) 0;
	gap: var(--size-xl);
	justify-content: space-between;
	border-top: 1px solid hsl(0, 0%, 25%);
	flex-wrap: wrap;

	@media (max-width: 576px) {
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
`;

const Footer = () => {
	return (
		<StyledFooter>
			<MainFooter>
				<FooterLinks>
					<SupportLinks className="support">
						<FooterH5>Soporte</FooterH5>
						<p>Asistencia</p>
						<p>FAQs</p>
						<p>Envíos</p>
						<p>Devoluciones</p>
					</SupportLinks>
					<SupportLinks className="legal">
						<FooterH5>Legal</FooterH5>
						<p>Política de privacidad</p>
						<p>Términos y condiciones</p>
						<p>Cookies</p>
					</SupportLinks>
				</FooterLinks>
				<Newsletter className="newslatter">
					<FooterH5>Newsletter</FooterH5>
					<p style={{ marginTop: "-1rem" }}>Suscríbete para estar al día de las últimas ofertas.</p>
					<div
						style={{
							display: "flex",
							gap: "var(--size-md)",
							flexWrap: "wrap",
							justifyContent: "center",
						}}>
						<NewsletterInput
							className="text-container"
							placeholder="Introduce tu email"
							type="email"
						/>
						<SubscribeButton>Suscribirse</SubscribeButton>
					</div>
					<p style={{ fontSize: "var(--size-sm)" }}>
						Al suscribirte, aceptas nuestra Política de Privacidad.
					</p>
				</Newsletter>
			</MainFooter>
			<Subfooter>
				<div
					style={{
						display: "flex",
						gap: "var(--size-md)",
						flexWrap: "wrap",
						justifyContent: "center",
					}}>
					<p>© Phone Fusion 2024. </p>
					<p>Made with ❤️ by Manu</p>
				</div>
				<div
					style={{
						display: "flex",
						gap: "var(--size-md)",
						fontSize: "var(--size-xl)",
						cursor: "pointer",
						justifyContent: "center",
					}}>
					<i class="ri-twitter-x-line"></i>
					<i class="ri-instagram-line"></i>
					<i class="ri-youtube-line"></i>
					<i class="ri-facebook-box-line"></i>
				</div>
			</Subfooter>
		</StyledFooter>
	);
};

export default Footer;
