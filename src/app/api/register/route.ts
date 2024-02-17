import { RegisterUser } from "@/models/RegisterUser";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URI!);
  const createdUser = await RegisterUser.create(body);
  return Response.json(createdUser);
}
