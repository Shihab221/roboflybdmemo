import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Cart from './cart';
import { Product as ProductType } from '@/types';



export default async function Home() {
  await dbConnect();
  // const products: ProductType[] = await Product.find({});

  const products: ProductType[] = JSON.parse(JSON.stringify(await Product.find({}).lean()));
  return (
    <div className=''>

      <div className='bg-gray-800 px-10 flex flex-row justify-between py-4'>
        <h2 className='text-green-400 text-2xl font-bold '>
        ROBO<span className='text-gray-200'>FLY</span>BD
        </h2>
        <div className=''>
        <h4 className='pl-1 text-green-400 text-xl font-semibold bg-gray-900 rounded-lg border border-green-400'>Invoice <span className='text-gray-900 bg-green-400 px-1 rounded-md'>Generator</span></h4>
        </div>
      </div>


      <div className='px-10'>
        <Cart products={products}/>
      </div>

    </div>
  );
}