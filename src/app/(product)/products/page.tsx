import React from "react";

import AllProducts from "@/components/allproducts/AllProducts";
import { Product } from "@/models/Product";
import { dbConnect } from "@/lib/dbConnect";

const Products = async () => {
  await dbConnect();

  // recent all products;
  const allProducts = JSON.parse(
    JSON.stringify(await Product.find({}, null, { sort: { _id: -1 } }))
  );

  return <AllProducts products={allProducts} />;
};

export default Products;
