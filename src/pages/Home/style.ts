import styled from 'styled-components';

export const Card = styled.a<{
	$cardColor?: string;
}>`
	height: 18rem;
	aspect-ratio: 1/1;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: space-between;
	padding: 2rem;
	background-color: ${(props) =>
		props.$cardColor == '1'
			? 'var(--color-card-1)'
			: 'var(--color-card-2)'};
	color: ${(props) =>
		props.$cardColor == '1'
			? 'var(--color-card-2)'
			: 'var(--color-card-1)'};
	border-radius: 0.75rem;
	box-shadow: 9px 7px 12.8px 0
		rgba(0, 0, 0, 0.25);
	transition: 0.1s all ease-in-out;
	cursor: pointer;

	&:hover {
		box-shadow: none;
		transform: translate(5px, 5px);
	}
`;
