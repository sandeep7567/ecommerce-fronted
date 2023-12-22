import { FC, InputHTMLAttributes, ReactComponentElement } from 'react';
import styled from 'styled-components';

const StyleInput = styled.input`
  width: 100%;
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline-style: none;
  box-sizing: border-box;
`;

interface InputI extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputI> = (props) => {
  return <StyleInput {...props} />
}

export default Input