"use client";

import Link from "next/link";
import React, { useState } from "react";

import styled from "styled-components";

import Center from "@/components/Center";
import { cartProvider } from "./provider/CartProvider";
import { Icons } from "./Icons";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  position: relative;
  color: #fff;
  text-decoration: none;
  z-index: 4;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;

const StyledNav = styled.nav`
  ${(props) =>
    props.activeNav
      ? `
        display: flex;
        flex-direction: column;
    `
      : `
    display: none;
  `}
  /* flex-direction: column; */
  gap: 0.9375rem;
  position: fixed;
  inset: 0;
  z-index: 3;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  min-width: 30px;
  padding: 10px 0;
  svg{
    height: 20px;
  }
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  position: relative;
  z-index: 3;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  a{
    display: inline-block;
    min-width: 20px;
    color: white;
    svg {
      width: 14px;
      height: 14px;
    }
  }

  cursor: pointer;
  @media screen and (min-width: 768px) {
    /* display: none; */
  }
`;

const Header = () => {
  // @ts-ignore
  const { cartProducts } = cartProvider();
  const [activeNav, setActiveNav] = useState<boolean>(false);

  const { Search, NavToggle } = Icons;

  // console.log(activeNav);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>Ecommerce</Logo>
          <StyledNav
            activeNav={activeNav}
            onClick={() => setActiveNav((prev) => !prev)}
          >
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>

          <SideIcons>
          <Link href={"/search"}>
            <Search />
          </Link>

          <NavButton onClick={() => setActiveNav((prev) => !prev)}>
            <NavToggle />
          </NavButton>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
};

export default Header;
