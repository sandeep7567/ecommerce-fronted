import { FC } from 'react';

import Link from 'next/link';
import styled from 'styled-components';
import { ButtonStyle } from './Button';
import { ChildrenI } from '@/types/types';

interface ButtonLinkProps extends React.ComponentProps<typeof Link>, ChildrenI {}

const StyledLink = styled(Link)<ButtonLinkProps>`
  ${ButtonStyle}
`;

export const ButtonLink: FC<ButtonLinkProps> = (props) => {
  return (
    <StyledLink {...props}/>
  )
}

export default ButtonLink;