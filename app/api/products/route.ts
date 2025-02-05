import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();

    // Validate request body
    if (!body.name || !body.model || !body.price || !body.category || !body.image) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    // Create and save product
    const product = new Product(body);
    await product.save();

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}


// import { NextResponse } from 'next/server';
// import dbConnect from '@/lib/db';
// import Product from '@/models/Product';

// export async function POST(request: Request) {
//   await dbConnect();

//   try {
//     const body = await request.json();
//     const product = new Product(body);
//     await product.save();
//     return NextResponse.json({ success: true, data: product }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ success: false }, { status: 400 });
//   }
// }