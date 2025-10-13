import styled from "styled-components";

export const LoginButton = styled.button`
  padding: 0.8rem 2.5rem;
  border-radius: 1rem;
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
`;
