import Center from "@/components/Center";
import AllCategory from "@/components/categories/AllCategories";
// import Heading from "@/components/Heading";
import { dbConnect } from "@/lib/dbConnect";
import { Category } from "@/models/Categories";
import { Product } from "@/models/Product";
import React from "react";

const CategoriesPage = async ({}) => {
  await dbConnect();
  const categories = JSON.parse(JSON.stringify(await Category.find()));
  const mainCategories = categories.filter((c: any) => !c.parent);

  const categoriesProducts = {};

  for (const mainCat of mainCategories) {
    const mainCatIds = mainCat?._id;
    const childCatIds = categories
      .filter((c: any) => c?.parent?.toString() === mainCatIds)
      .map((c: any) => c._id);

    const categoriesIds = [mainCatIds, ...childCatIds];

    const products = JSON.parse(
      JSON.stringify(
        await Product.find({ category: categoriesIds }, null, {
          limit: 3,
          sort: { _id: -1 },
        })
      )
    );

    // @ts-ignore
    categoriesProducts[mainCatIds] = products;
  }

  return (
    <React.Fragment>
      <AllCategory
        mainCategories={mainCategories}
        categoriesProducts={categoriesProducts}
      />
    </React.Fragment>
  );
};

export default CategoriesPage;
