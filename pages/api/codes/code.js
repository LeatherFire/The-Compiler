import User from "@/models/User";
import Code from "@/models/Code";
import Category from "@/models/Category"; // Category modelini import edin
import dbConnect from "@/util/dbConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import mongoose from 'mongoose';
import { Buffer } from 'buffer';

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;
  const body = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await User.findOne({ email: session.user.email }).select("-password");

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (method === "POST") {
      // Katkıda bulunan kullanıcı adlarına karşılık gelen kullanıcı ID'lerini bulun
      const contributors = await User.find({ username: { $in: body.contributors } })
        .select('_id')
        .then(users => users.map(user => user._id));

      // Kodu base64 ile encode et
      const encodedContent = Buffer.from(body.code, 'utf-8').toString('base64');

      // Kategori ID'sini bulun
      const category = await Category.findOne({ name: body.category }).select('_id');
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      const newCode = new Code({
        user_id: user._id,
        name: body.codeName,
        language: body.language,
        nickname: session.user.name, // Kullanıcının oturumdaki ismini kullanıyoruz
        content: encodedContent,
        isPublic: body.isPublic,
        identifier: body.identifier,
        contributors: contributors.length > 0 ? contributors : [user._id],
        description: body.description,
        categories: [category._id], // Kategori ID'sini ekle
        resources: body.resources, // Kaynakları doğrudan ekle
        photo: body.image || "/uploads/default-code-photo.jpg",
      });

      await newCode.save();

      return res.status(201).json(newCode);
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export default handler;
