import User from "@/models/User";
import Code from "@/models/Code";
import Category from "@/models/Category";
import dbConnect from "@/util/dbConnect";
import { getSession } from "next-auth/react";
import { Buffer } from "buffer";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    if (req.method === "GET") {
      const codes = await Code.find({ isPublic: true }).lean();

      const categoryIds = [...new Set(codes.flatMap(code => code.categories))];
      const contributorIds = [...new Set(codes.flatMap(code => code.contributors))];

      const categories = await Category.find({ _id: { $in: categoryIds } }).select("name").lean();
      const users = await User.find({ _id: { $in: contributorIds } }).select("username").lean();

      const categoryMap = categories.reduce((acc, category) => {
        acc[category._id] = category.name;
        return acc;
      }, {});

      const userMap = users.reduce((acc, user) => {
        acc[user._id] = user.username;
        return acc;
      }, {});

      const updatedCodes = codes.map(code => ({
        ...code,
        categories: code.categories.map(categoryId => categoryMap[categoryId] || categoryId),
        content: Buffer.from(code.content, 'base64').toString('utf-8'),
        contributors: code.contributors.map(contributorId => userMap[contributorId] || contributorId),
        language: code.language.charAt(0).toUpperCase() + code.language.slice(1)
      }));

      return res.status(200).json(updatedCodes);
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error fetching codes:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
