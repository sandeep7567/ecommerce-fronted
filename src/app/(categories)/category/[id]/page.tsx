import CategoryListById from "@/components/categories/CategoryListById";
import { Category } from "@/models/Categories";
import { Product } from "@/models/Product";
import React from "react";

const SpecificCategoryList = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const category = JSON.parse(JSON.stringify(await Category.findById(id)));

  const subCategoryId = JSON.parse(
    JSON.stringify(await Category.find({ parent: category?._id }))
  ).map((sub: any) => sub?._id);
  // console.log(subCategoryId);

  const catIds = [category?._id, ...subCategoryId]

  const products = JSON.parse(
    JSON.stringify(await Product.find({category: catIds}))
  );

  return (
    <React.Fragment>
      <CategoryListById category={category} subCategories={subCategoryId} products={products} />
    </React.Fragment>
  );
};

export default SpecificCategoryList;