import styled from "styled-components";

const ColorCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.white};
  background-color: ${({ color }) => color};

  position: relative;
  justify-self: center;
  cursor: pointer;

  @media only screen and (max-width: 500px) {
    &:last-of-type {
      position: absolute;
      bottom: 0;
    }
  }

  &::after {
    content: '';
    position: absolute;
    background-image: ${({ icon }) => `url(${icon})`};
    background-repeat: no-repeat;
    background-position: center;
    inset: 0;
    opacity: 0;
    transition: all 150ms ease-in;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
`;

export default ColorCircle;
