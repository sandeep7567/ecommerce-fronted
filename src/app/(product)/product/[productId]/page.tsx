import SingleProductById from '@/components/allproducts/SingleProductById';
import { dbConnect } from '@/lib/dbConnect';
import { Product } from '@/models/Product';
import { FC } from 'react'

interface pageProps {
  params: {productId: string}
}

interface ProductInfoI {
  _id: string;
  title: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  category?: string;
  properties: {
    [key:string]: string;
  };
  images: string[];
};

const SingleProductShowPage: FC<pageProps> = async ({params}: pageProps) => {
  const {productId} = params;

  await dbConnect();

  const product:ProductInfoI = JSON.parse(JSON.stringify(await Product.findById(productId)));
  console.log(product);

  return (
    <SingleProductById product={product} />
  )
};

export default SingleProductShowPage;