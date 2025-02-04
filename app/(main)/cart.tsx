'use client';

import { useState } from 'react';
import { Product } from '@/types';
import Image from 'next/image';


type CartItem = {
    product: Product;
    quantity: number;
}
export default function Cart({ products }: { products: Product[] }) {
  const [cart, setCart] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [additional, setAdditional] = useState('');


//   const addToCart = (product: Product) => {
//     setCart([...cart, product]);
//   };
const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product._id === product._id);
    if (existingItem) {
      // If the product is already in the cart, increment its quantity
      setCart(
        cart.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const incrementQuantity = (productId: string)=>{
    setCart(
        cart.map((item)=>
        item.product._id === productId
        ?{...item, quantity:item.quantity + 1}
        :item
        )
    )
  }

  const decrementQuantity = (productId: string)=>{
    setCart(
        cart.map((item)=>
        item.product._id === productId
        ?{...item, quantity:item.quantity - 1}
        :item
        )
    )
  }


  const removeButton = (productId: string)=>{
    setCart(cart.filter((item)=> item.product._id !== productId));
  }
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalBill = cart.reduce((sum, item) => sum + item.product.price * item.quantity , 0);

  return (
    <div className='flex bg-dark sm:flex-row flex-col'>
      <div className="px-2 sm:px-4">
        <h1 className="text-lg text-green-400 py-2">Browse Products</h1>
        <div className="flex flex-row justify-between">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='bg-gray-900 border border-green-400 rounded-md px-2 py-1 min-w-[120px] sm:min-w-[350px]'
        />
        {/* <FaSearch 
        className='cursor-pointer bg-green-400 px-2 py-2 rounded-lg h-8 w-8 mx-2 hover:bg-gray-900 hover:border-green-400 border border-green-400 hover:scale-105 transition-transform'
        /> */}
        </div>
        {filteredProducts.map((product) => (
          <div key={product._id} className='border border-green-500 my-4 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-center'>
            <Image 
            src={product.image} 
            width={80} 
            height={80} 
            alt={product.name}
            className='rounded-sm ' 
            />
            <div className='flex flex-col px-2'>
            <h2 className='text-green-400 font-semibold text-xl'>{product.name}</h2>
            <p className='text-sm'>Model: {product.model}</p>
            </div>
            <div className='flex flex-row sm:flex-col'>
                <p className='bg-dark text-green-400 rounded-sm border border-green-600 my-1 sm:mx-0 mx-4 px-2 py-1 text-center text-sm'>{product.price} Tk</p>
                <button 
                    onClick={() => addToCart(product)}
                    className='bg-green-400 text-black text-sm px-2 py-1 rounded-sm hover:bg-gray-800 hover:text-green-400 hover:scale-105  transition-transform'
                >Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      <div className='sm:px-10 px-2'>
        <h1 className='text-xl text-green-400 py-2'>Components Bill</h1>
        {cart.map((item, index) => (
          <div key={index} className='border border-green-400 p-2 my-4 flex justify-between items-center rounded-md'>
            <h2 className='text-green-400'>{item.product.name}:</h2>
            {/* <p>Tk{item.product.price}</p> */}
            <p className='px-2'>{item.product.price * item.quantity} Tk</p>
            <div>
                <button onClick={()=> decrementQuantity(item.product._id)}
                    className='px-2  bg-gray-900 text-green-400 border border-green-400 rounded-sm font-bold'
                >
                    -
                </button>
            </div>
            <span className='px-2  text-green-400 '> {item.quantity}</span>
            <div>
                <button onClick={()=> incrementQuantity(item.product._id)}
                    className='px-2 bg-gray-900 text-green-400 border border-green-400 rounded-sm font-bold'>
                    +
                </button>
            </div>
            

            <button onClick={()=> removeButton(item.product._id)}
                className='bg-gray-900 text-red-500 text-sm  border border-red-500 px-2 py-1 rounded-sm ml-2'>
                Delete
            </button>
          </div>
        ))}
        <div className='my-2 flex flex-col sm:flex-row items-center'>
            Additional bill: 
            <input 
            type='number'
            placeholder='Enter additional charges if any'
            className='border border-green-500 rounded-md py-1 px-2 bg-gray-900 text-sm sm:min-w-[300px] min-w-sm mx-2'
            value={additional}
            onChange={(e) => setAdditional(e.target.value)}
            />
        </div>
        <h2 className='bg-green-400 my-4 py-2  px-4 rounded-sm text-black'>Total Bill: {totalBill+ Number(additional)} Tk.</h2>
      </div>
    </div>
  );
}
