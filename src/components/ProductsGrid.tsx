import { FC } from "react";
import ProductBox from "@/components/home/ProductBox";
import styled from "styled-components";
import Heading from "./Heading";
import Center from "./Center";

// interface ProductsGridProps {
//   image: string[];
//   title: string;
//   amount: string;
// };

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    
  }
`;

const ProductsGrid = ({products}:any) => {
  return (
    <StyledProductsGrid>
      {products.length > 0 && products.map((product: any) => (
        <ProductBox {...product} />
      ))}
    </StyledProductsGrid>
  );
};

export default ProductsGrid;