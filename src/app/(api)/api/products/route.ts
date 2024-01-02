import { dbConnect } from "@/lib/dbConnect";
import { Product as ProductType } from "@/models/Product";
import { NextRequest } from "next/server";

interface ProductsQueryI {
  category?: string[];
  $or?: { properties: { [key: string]: string } }[];
}

export async function GET(req: NextRequest) {
  await dbConnect();

  const searchParams = req.nextUrl.searchParams;

  // console.log();

  const productsQuery: ProductsQueryI = {};

  const orConditions: { properties: { [key: string]: string } }[] = [];

  let sort = "";

  // const phrase = searchParams.get("phrase");

  const [sortField, sortOrder]:any = searchParams.get("sort") ? searchParams.get("sort")?.split("-") : ["_id", "asc"];

    console.log(sortField, sortOrder);

  searchParams.forEach((value, key) => {
    console.log(key);
    if (key === "categories") {
      productsQuery.category = value?.split(",");
    } else if (key === "phrase") {
      console.log({ key, value });
      productsQuery["$or"] = [
        // @ts-ignore
        {title: {$regex: value, $options: "i"}}, {description: {$regex: value, $options:"i"}}
      ]
    } else if (key === "sort") {
      console.log(value);
      if (!value) {
        sort += "_id-asc"
      }
      // const sort = searchParams.get("sort");
      // const [sortField, sortOrder] = value?.split("-");
      sort += value;
    } else {
      const condition: any = {};
      condition[`properties.${key}`] = value;
      orConditions.push(condition);
    }
  });

  if (orConditions.length > 0) {
    productsQuery.$or = orConditions;
  }

  const data = await ProductType.find(productsQuery, null, {
    sort: { [sortField]: sortOrder === "desc" ? 1 : -1 },
  });
  console.log(data);

  return Response.json(data);
}
