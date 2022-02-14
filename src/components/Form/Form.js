import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Button from './../Button/Button';

const Form = ({
  headerText,
  buttonText,
  buttonAction,
  wrongColorFormat,
  clearError,
}) => {
  const [enteredColor, setEnteredColor] = useState('');
  return (
    <Wrapper>
      <Header>{headerText}</Header>
      <Label htmlFor="colorInput">Color</Label>
      <Input
        id="colorInput"
        placeholder="Format: 317D74"
        type="text"
        value={enteredColor}
        wrongColorFormat={wrongColorFormat}
        onChange={e => setEnteredColor(e.target.value.toUpperCase())}
        onFocus={clearError}
      />
      <StyledButton color={enteredColor} onClick={buttonAction}>
        {buttonText}
      </StyledButton>
    </Wrapper>
  );
};

const animateForm = keyframes`
  0% {
    transform: translate(-50%,-70%);
    opacity: 0;
  }

  50% {
    transform: translate(-50%,-47%);
    opacity: 0.6;
  }

  100% {
    transform: translate(-50%,-50%);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.white};
  padding: 3rem 13rem;
  border-radius: 10px;
  position: fixed;
  z-index: 111;
  left: 50%;
  top: 50%;
  box-shadow: 2px 2px 5px 1px rgb(0 0 0 / 40%);
  z-index: 111111;
  animation: ${animateForm} 450ms ease-out forwards;
`;

const Header = styled.h2`
  text-align: center;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.colorPrimary};
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  border: 1px solid
    ${({ wrongColorFormat }) => (wrongColorFormat ? '#FF146F' : '#DDD')};
  margin-bottom: 4rem;
  padding: 0.5rem 1rem;
  border-radius: 3px;

  &:focus,
  &:active {
    outline: none;
    border: 1px solid #85ff8f;
  }
`;

const StyledButton = styled(Button)`
  width: min-content;
  margin: 0 auto;
  padding: 1rem 2.5rem;
`;

export default Form;
