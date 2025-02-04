"use client";

import { useState } from "react";
import {useSession, signIn, signOut} from 'next-auth/react';

export default function Upload(){
  const{data:session} = useSession();
  const[formData, setFormData] = useState({
    name: '',
    model: '',
    category: '',
    price: '',
    image: '',
  });

  const handleSubmit= async(e)=>{
    e.preventDefault();
    const res = await fetch('/api/products',{
      method:'POST',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if(res.ok){
      alert('Product uploaded successfully');
      setFormData({
        name: '',
        model: '',
        category: '',
        price: '',
        image: '',
      });
    }
  }

  if(!session){
    return(
      <div>
        <p>
          You're not signed in
        </p>
        <button onClick={()=>signIn()}>Signin</button>
      </div>
    )
  }


  return(
    <div className="px-10 py-10 flex flex-col ">
      
      <form onSubmit={handleSubmit} className="flex flex-col max-w-xl">
      <h2 className="text-green-400 font-bold text-2xl text-center">Upload new product</h2>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="my-2 bg-gray-900 border border-green-400 rounded-md px-2 py-2"
        />
        <input
          type="text"
          placeholder="Model"
          value={formData.model}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          className="my-2 bg-gray-900 border border-green-400 rounded-md px-2 py-2"

        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="my-2 bg-gray-900 border border-green-400 rounded-md px-2 py-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="my-2 bg-gray-900 border border-green-400 rounded-md px-2 py-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="my-2 bg-gray-900 border border-green-400 rounded-md px-2 py-2"
        />
        <button 
        type="submit"
        className="bg-green-500 py-2 rounded-md my-2 border border-green-800 hover:bg-gray-900 hover:border-green-400  transition-transform"
        >Upload</button>
      </form>
      <button 
        onClick={() => signOut()}
        className="bg-gray-900 border-2 border-green-400 rounded-md py-2 max-w-xl my-2 hover:bg-sky-600 hover:border-gray-900"
        >Sign out</button>
    </div>
  )
}