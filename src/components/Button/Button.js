import styled, { css } from 'styled-components';

const Button = styled.div`
  cursor: pointer;
  user-select: none;
  background-color: ${({ theme }) => theme.colorPrimary};
  border-radius: 10px;
  padding: 12px 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.white};
  transition: all 200ms;

  ${({ randomColor }) =>
    randomColor &&
    css`
      background-color: #31597d;
      align-self: center;
    `}

  &:hover {
    transform: translateY(-4%);
    box-shadow: 0 2px 5px 0 rgb(0 0 0 / 40%);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 3px 0 rgb(0 0 0 / 15%);
  }

  @media only screen and (max-width: 640px) {
    padding: 10px 18px;
    font-size: ${({ theme }) => theme.fontSize.xsmall};
  }
`;
export default Button;
