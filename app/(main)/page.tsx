import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Cart from './cart';
import { Product as ProductType } from '@/types';
import Image from 'next/image';
import Footer from '../components/footer';


export default async function Home() {
  await dbConnect();
  // const products: ProductType[] = await Product.find({});

  const products: ProductType[] = JSON.parse(JSON.stringify(await Product.find({}).lean()));
  return (
    <div className=''>
      <div className='bg-gray-800 px-10 flex flex-row justify-between py-2'>
        <h2 className='text-gray-200 font-bold '>
        RoboFlyBD
        </h2>
        <h4 className='text-sky-300 font-semibold'>Invoice Generator</h4>
      </div>
      <div className='px-10'>
        <Cart products={products}/>
      </div>

    </div>
  );
}