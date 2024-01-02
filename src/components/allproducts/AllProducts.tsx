"use client";

import { FC } from "react";
import Center from "../Center";
import Heading from "../Heading";
import ProductsGrid from "../ProductsGrid";

interface AllProductsProps {}

const AllProducts: FC<AllProductsProps> = ({products}:any) => {
  return (
    <Center>
      <Heading>All products</Heading>
      <ProductsGrid products={products} />
    </Center>
  );
};

export default AllProducts;
