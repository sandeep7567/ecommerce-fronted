import Image from "next/image";
import { FC, useContext } from "react";
import styled from "styled-components";
import Button from "../Button";
import Link from "next/link";
import { CartContext } from "../provider/CartProvider";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 15px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  /* img {
    max-width: 100%;
    max-height: 80px;
  } */
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
  font-size: 1.25rem;
  font-weight: 600;
`;

const ProductBox: FC<any> = ({ _id, title, description, price, images }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return;
  };

  const {addProduct} = cartContext;
  
  const url = `product/${_id}`
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
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
          <Price>
            ${price}
          </Price>
          <Button onClick={() => addProduct(_id)} primary outline>
          Add to cart
        </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
};

export default ProductBox;
