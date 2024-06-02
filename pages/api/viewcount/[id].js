import Code from "@/models/Code";
import dbConnect from "@/util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;
  const { id } = req.query;

  if (method !== "POST") {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!id) {
    return res.status(400).json({ message: "Code ID is required" });
  }

  try {
    const code = await Code.findById(id);

    if (!code) {
      return res.status(404).json({ message: "Code not found" });
    }

    code.viewCount += 1;
    await code.save();

    return res.status(200).json({ message: "View count incremented successfully", viewCount: code.viewCount });
  } catch (error) {
    console.error("Error incrementing view count:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
