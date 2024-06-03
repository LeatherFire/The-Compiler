import { getServerSession } from "next-auth/next";
import dbConnect from "@/util/dbConnect";
import Code from "@/models/Code";
import User from "@/models/User";
import Category from "@/models/Category";
import { authOptions } from "./auth/[...nextauth]"; // authOptions'ı buradan içe aktarın

const handler = async (req, res) => {
  await dbConnect();

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findOne({ email: session.user.email }).select("_id");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const codes = await Code.find({ user_id: user._id }).lean();

    // Tüm kategori ID'lerini topla
    const categoryIds = codes.reduce((acc, code) => {
      acc.push(...code.categories);
      return acc;
    }, []);

    // Kategori isimlerini getir
    const categories = await Category.find({ _id: { $in: categoryIds } }).select("name").lean();

    // Kategori isimlerini bir nesneye dönüştür
    const categoryMap = categories.reduce((acc, category) => {
      acc[category._id] = category.name;
      return acc;
    }, {});

    // Kodlar üzerindeki kategori ID'lerini isimlerle ve dili baş harfi büyük olarak değiştir
    const updatedCodes = codes.map(code => {
      return {
        ...code,
        categories: code.categories.map(categoryId => categoryMap[categoryId] || categoryId),
        language: code.language.charAt(0).toUpperCase() + code.language.slice(1)
      };
    });

    return res.status(200).json(updatedCodes);
  } catch (error) {
    console.error("Error fetching user codes:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
