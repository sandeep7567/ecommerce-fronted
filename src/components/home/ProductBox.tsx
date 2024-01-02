import Image from "next/image";
import { FC, useContext } from "react";
import styled from "styled-components";
import Button from "../Button";
import { CartContext } from "../provider/CartProvider";

import Link from "next/link";

const ProductWrapper = styled.div`
  /* width: 100%;
  text-align: center;
  justify-content: center; */
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 15px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const Title = styled.h2`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  font-weight: normal;
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
  @media screen and (min-width: 768px) {
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const ProductBox: FC<any> = ({ _id, title, description, price, images }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return;
  };

  const { addProduct } = cartContext;

  const url = `/product/${_id}`;

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div className="">
          <Image
            src={images[0]}
            width={100}
            height={100}
            quality={100}
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "contain",
            }}
            alt="image"
          />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button onClick={() => addProduct(_id)} primary outline>
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
