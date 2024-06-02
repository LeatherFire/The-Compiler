import dbConnect from "@/util/dbConnect";
import Code from "@/models/Code";
import User from "@/models/User";

const handler = async (req, res) => {
  const { id } = req.query;

  await dbConnect();

  try {
    if (req.method === "GET") {
      // Verilen kodun contributors alanını bul
      const code = await Code.findById(id).lean();
      
      if (!code) {
        return res.status(404).json({ message: "Code not found" });
      }

      // User modelinden contributors id'leri ile kullanıcı bilgilerini al
      const contributors = await User.find({
        _id: { $in: code.contributors }
      }).select('username profilePhoto').lean();

      // Contributors kullanıcı adlarını ve fotoğraflarını al
      const contributorData = contributors.map(contributor => ({
        username: contributor.username,
        profilePhoto: contributor.profilePhoto
      }));

      res.status(200).json(contributorData);
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error fetching contributors:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default handler;
