import Category from "@/models/Category"; // Kategori modelini import edin
import dbConnect from "@/util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const categories = await Category.find({});
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
};

export default handler;
