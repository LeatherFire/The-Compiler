import { getSession } from "next-auth/react";
import User from "@/models/User";
import dbConnect from "@/util/dbConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  await dbConnect();

  const user = await User.findOne({ email: session.user.email }).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
}
