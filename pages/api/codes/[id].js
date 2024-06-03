import User from "@/models/User";
import Code from "@/models/Code";
import Category from "@/models/Category";
import dbConnect from "@/util/dbConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Buffer } from "buffer";

const handler = async (req, res) => {
  const { id } = req.query;

  await dbConnect();

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findOne({ email: session.user.email }).select("_id");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    if (req.method === "GET") {
      const code = await Code.findOne({ _id: id }).lean();

      if (!code) {
        return res.status(404).json({ message: "Code not found" });
      }

      // Tüm kategori ID'lerini topla
      const categoryIds = code.categories;

      // Kategori isimlerini getir
      const categories = await Category.find({ _id: { $in: categoryIds } }).select("name").lean();

      // Kategori isimlerini bir nesneye dönüştür
      const categoryMap = categories.reduce((acc, category) => {
        acc[category._id] = category.name;
        return acc;
      }, {});

      // Contributors ID'lerini kullanıcı adlarına dönüştür
      const contributors = await User.find({ _id: { $in: code.contributors } }).select("username").lean();

      // Kullanıcı adlarını bir dizi olarak al
      const contributorUsernames = contributors.map(contributor => contributor.username);

      // Kod üzerindeki kategori ID'lerini isimlerle ve dili baş harfi büyük olarak değiştir
      const updatedCode = {
        ...code,
        categories: code.categories.map(categoryId => categoryMap[categoryId] || categoryId),
        language: code.language.charAt(0).toUpperCase() + code.language.slice(1),
        content: Buffer.from(code.content, 'base64').toString('utf-8'), // Kod içeriğini base64'ten decode et
        contributors: contributorUsernames // Contributors kullanıcı adlarıyla güncelle
      };

      return res.status(200).json(updatedCode);
    } else if (req.method === "PUT") {
      const { name, language, categories, content, contributors, isPublic, identifier, description, photo, resources } = req.body;

      // Kategori isimlerinden ID'leri bulun
      const categoryDocs = await Category.find({ name: { $in: categories } }).select("_id").lean();
      const categoryIds = categoryDocs.map(category => category._id);

      // Contributors kullanıcı adlarından ID'leri bulun
      const contributorDocs = await User.find({ username: { $in: contributors } }).select("_id").lean();
      const contributorIds = contributorDocs.map(contributor => contributor._id);

      const updatedContent = Buffer.from(content, 'utf-8').toString('base64');

      const updatedCode = await Code.findOneAndUpdate(
        { _id: id, user_id: user._id },
        {
          name,
          language: language.toLowerCase(),
          categories: categoryIds,
          content: updatedContent,
          contributors: contributorIds,
          isPublic,
          identifier,
          description,
          photo,
          resources // resources alanını ekle
        },
        { new: true }
      ).lean();

      if (!updatedCode) {
        return res.status(404).json({ message: "Code not found" });
      }

      return res.status(200).json(updatedCode);
    } else if (req.method === "DELETE") {
      const deletedCode = await Code.findOneAndDelete({ _id: id, user_id: user._id }).lean();

      if (!deletedCode) {
        return res.status(404).json({ message: "Code not found" });
      }

      return res.status(200).json({ message: "Code deleted successfully" });
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error fetching/updating/deleting code:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
