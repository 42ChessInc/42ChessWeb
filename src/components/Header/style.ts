import styled from 'styled-components';

export const LoginButton = styled.button`
	padding: 0.4rem 1.2rem;
	max-width: 6rem;
	border-radius: 0.75rem;
	font-weight: bold;
	cursor: pointer;
	transition: 0.2s all ease-in-out;
	background-color: var(--color-button);
	color: var(--color-button-text);
	font-family: var(--font-primary);
	font-size: 1.3rem;
	letter-spacing: 0.1rem;

	&:hover {
		transform: scale(1.03);
	}
	&:active {
		transform: scale(1);
	}

	@media (min-width: 768px) {
		padding: 0.8rem 2rem;
		max-width: 10rem;
	}
`;
