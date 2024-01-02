"use client";

import { FC, useState } from "react";
import Center from "../Center";

import Heading from "../Heading";
import Button from "../Button";

import styled from "styled-components";
import Image from "next/image";
import WhiteBox from "../WhiteBox";
import { Icons } from "../Icons";
import { cartProvider } from "../provider/CartProvider";

interface ProductInfoI {
  _id: string;
  title: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  category?: string;
  properties: {
    [key: string]: string;
  };
  images: string[];
}

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: .8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const PriceRow = styled.div`
  gap: 20px;
  display: flex;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;

const SingleProductById: FC<{ product: ProductInfoI }> = ({
  product,
}: {
  product: ProductInfoI;
}) => {
  const { addProduct } = cartProvider();
  return (
    <Center>
      <ColWrapper>
        <WhiteBox>
          {/* <Heading>Product</Heading> */}
          <ImageBoard images={product?.images} />
        </WhiteBox>
        {/* <WhiteBox> */}
        <div>
          <Heading>{product?.title}</Heading>
          <p>{product?.description}</p>
          <PriceRow>
            <div>
              <Price>${product?.price}</Price>
            </div>
            <Button black={1} onClick={() => addProduct(product?._id)}>
              <Icons.Cart />
              Add to cart
            </Button>
          </PriceRow>
        </div>
        {/* </WhiteBox> */}
      </ColWrapper>
    </Center>
  );
};

export default SingleProductById;

const ImageColumn = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
`;
const ImageContainer = styled(Image)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-grow: 0;
`;

const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${(props) =>
    props.active
      ? `
    border-color: #ccc;
  `
      : `
    border-color: transparent;
    opacity: 0.8;
  `}
  height: 50px;
  width: fit-content;
  cursor: pointer;
  border-radius: 5px;
  padding: 2px;
  margin-left: 6px;
`;

export const ImageBoard = ({ images }: any) => {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <Image
        style={{
          // padding: "4px",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        src={activeImage}
        width={350}
        height={350}
        alt=""
        quality={100}
      />
      <ImageColumn>
        {images.length > 0 &&
          images.map((image: string) => {
            return (
              <ImageButton
                key={image}
                active={image === activeImage}
                onClick={() => setActiveImage(image)}
              >
                <ImageContainer
                  src={image}
                  width={35}
                  height={50}
                  alt=""
                  quality={100}
                />
              </ImageButton>
            );
          })}
      </ImageColumn>
    </>
  );
};
