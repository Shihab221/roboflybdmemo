import mongoose from "mongoose";
// types.ts
export type Product = {
    _id: string; // Ensure this is defined
    name: string;
    model: string;
    price: number;
    image: string;
    // Add other properties as needed
  };
const productSchema = new mongoose.Schema({
    name:{type: String, required: true},
    model:{type:String, required:true},
    category:{type:String, required:true},
    price: {type: Number, required:true},
    image:{type:String, required:true},

})

export default mongoose.models.Product || mongoose.model('Product', productSchema);

