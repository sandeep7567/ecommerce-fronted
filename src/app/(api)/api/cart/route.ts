import { dbConnect } from "@/lib/dbConnect";
import { Product } from "@/models/Product";

export async function POST(req:Request) {

  await dbConnect();
  
  // array of products ids
  const {ids} = await req.json();

  const data = await Product.find({_id: ids});

  return Response.json(data);
};