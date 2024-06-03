import dbConnect from "@/util/dbConnect";
import Code from "@/models/Code";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;
  const { criteria } = req.query;

  if (method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!criteria) {
    return res
      .status(400)
      .json({ message: "Criteria query parameter is required" });
  }

  try {
    let sortCriteria = {};
    if (criteria === "rated") {
      sortCriteria = { rating: -1 }; // Highest rated first
    } else if (criteria === "viewed") {
      sortCriteria = { viewCount: -1 }; // Most viewed first
    } else {
      return res.status(400).json({ message: "Invalid criteria" });
    }

    const codes = await Code.find({}).sort(sortCriteria).limit(10); // Adjust limit as needed
    return res.status(200).json(codes);
  } catch (error) {
    console.error("Error fetching codes:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default handler;
