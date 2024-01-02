"use client";

import React, { useContext } from "react";

import Image from "next/image";

import styled from "styled-components";

import Center from "../Center";
import Button from "@/components/Button";
import { Icons } from "../Icons";
import ButtonLink from "../ButtonLink";
import { cartProvider } from "../provider/CartProvider";

const Bg = styled.div`
  background-color: #222;
  color: white;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40;
  img {
    max-width: 100%;
    max-height: 350px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Featured: React.FC<any> = ({ product }) => {
  // @ts-ignore
  const { addProduct } = cartProvider();

  const { Cart } = Icons;
  const addFeatureToCart = () => {
    addProduct(product?._id);
  };

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product?.title}</Title>
              <Desc>{product?.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={`/product/${product?._id}`}
                  outline={1}
                  white={1}
                >
                  Read more
                </ButtonLink>
                <Button onClick={addFeatureToCart} white>
                  <Cart />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <Image
              src={
                "https://res.cloudinary.com/dcecteq0x/image/upload/v1702795475/Ecommerce-Dashboard-Project/hz6ogkqaxgbesleogjy5.png"
              }
              alt="image"
              width={350}
              height={350}
              sizes="100%"
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
