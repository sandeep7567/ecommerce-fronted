import React from 'react';

import { ChildrenI } from '@/types/types';
import styled, { css } from 'styled-components';
import { primary } from '@/lib/colors';

interface ButtonI extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  white?: boolean | 1 | 0;
  primary?: boolean | 1 | 0;
  outline?: boolean | 1 | 0;
  block?: boolean | 1 | 0;
  size?: 'l';
  black?: boolean | 1 | 0;
};

export const ButtonStyle = css<ChildrenI>`
  border: 0;
  padding: 8px 10px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;

  svg{
    height: 16px;
    margin-right: 5px;
  }
  ${props => props.block && css`
    display: block;
    width: 100%;
  `}
  ${props => props.black && !props.outline && css`
    background-color: #000;
    &:hover {
    opacity: 0.8;
  }
    color: #fff;
  `}
  ${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}
  ${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000;
  `}
  ${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
  `}
  ${props => props.primary && !props.outline && css`
    background-color: ${primary};
    border: 1px solid ${primary};
    color: #fff;
  `}
  ${props => props.primary && props.outline && css`
    background-color: transparent;
    border: 1px solid ${primary};
    color: ${primary};
  `}
  ${props => props.size === "l" && css`
    font-size: 1.2rem;
    padding: 10px 20px;
    svg{
    height: 20px;
    /* width: 10px; */
  }
  `}
`;

const StyledButton = styled.button<ChildrenI>`
  ${ButtonStyle}
`;

const Button:React.FC<ButtonI> = ({children, ...props}:ButtonI ) => {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  )
};

export default Button;