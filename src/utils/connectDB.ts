import "dotenv/config";
import mongoose from "mongoose";

const MONGODB_URI = (username: string, password: string) => {
  return `mongodb+srv://${username}:${password}@techlife.5goyv.mongodb.net/api?retryWrites=true&w=majority`;
};

export async function connectDB() {
  const db = await mongoose.connect(
    MONGODB_URI(process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD)
  );
  await console.log(`-> MongoDB connected [${db.connection.db.databaseName}]`);
}
