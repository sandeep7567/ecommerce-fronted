import Featured from "@/components/home/Featured";
import NewProducts from "@/components/home/NewProducts";
import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/Product";

export default async function Page() {
  // productById
  const featurePrductId = "657c6d9de8292d8cab045ea9";
  await dbConnect();
  const featurePrduct = JSON.parse(
    JSON.stringify(await Product.findById(featurePrductId))
  );

  // recent all products;
  const newProducts = JSON.parse(
    JSON.stringify(
      await Product.find({}, null, { sort: { _id: -1 }, limit: 10 })
    )
  );

  return (
    <div>
      <Featured product={featurePrduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}
