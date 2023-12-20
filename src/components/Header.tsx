"use client";

import Link from "next/link";
import React, { useContext } from "react";

import styled from "styled-components";

import Center from "@/components/Center";
import { CartProvider } from "./provider/CartProvider";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 0.9375rem;
`;

const NavLink = styled.a`
  color: #aaa;
  text-decoration: none;
`;

const Header = () => {
  const {cartProducts} = useContext<any>(CartProvider);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
        <Logo href={"/"}>Ecommerce</Logo>
        <StyledNav>
          <NavLink href={"/"}>Home</NavLink>
          <NavLink href={"/products"}>All products</NavLink>
          <NavLink href={"/categories"}>Categories</NavLink>
          <NavLink href={"account"}>Account</NavLink>
          <NavLink href={"cart"}>Cart ({cartProducts.length})</NavLink>
        </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
};

export default Header;
