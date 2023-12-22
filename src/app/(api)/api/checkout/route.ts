import { dbConnect } from "@/lib/dbConnect";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";

// stripe integration with a link
import Stripe from "stripe";
const stripe = new Stripe(`${process.env.STRIPE_SK}`);

export async function POST(req: Request) {
  await dbConnect();

  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = await req.json();

  const productsIds = cartProducts;

  // array of unique product Ids removing duplicate from cartProducts ids;
  const uniqueProductsIds = Array.from(new Set(productsIds));

  const productsInfos = await Product.find({ _id: uniqueProductsIds });

  let line_items = [];

  for (const productId of uniqueProductsIds) {
    // find out single product in the form of object from the array with the help of loop;
    const productInfo = productsInfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity =
      productsIds.filter((id: string) => id === productId)?.length || 0;
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: { orderId: orderDoc?._id.toString() },
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
  });

  return Response.json({
    url: session.url,
  });
}
