import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Shihab22:%40Greenlif22@cluster0.2uxncrv.mongodb.net/todos";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Extend the global object to include mongoose cache
declare global {
  var mongooseCache: { conn: mongoose.Mongoose | null; promise: Promise<mongoose.Mongoose> | null };
}

// Use cached connection in development to avoid multiple connections
let cached = global.mongooseCache || { conn: null, promise: null };
global.mongooseCache = cached;

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {}).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
