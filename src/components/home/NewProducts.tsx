"use client";
import { FC } from "react";
import styled from "styled-components";
import Center from "@/components/Center";
import ProductBox from "@/components/home/ProductBox";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
`;

const NewProducts: FC<any> = ({ products }) => {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid>
        {products.map((product: any) => (
          <ProductBox {...product} />
        ))}
      </ProductsGrid>
    </Center>
  );
};

export default NewProducts;
