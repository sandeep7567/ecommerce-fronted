import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  
}

const Header = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
`;

const Heading: FC<HeadingProps> = ({ children, ...props }: HeadingProps) => {
  return <Header {...props}>{children}</Header>;
};

export default Heading;
