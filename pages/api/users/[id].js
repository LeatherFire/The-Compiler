import User from "@/models/User";
import dbConnect from "@/util/dbConnect";

const handler = async (req, res) => { 
  await dbConnect();
  const { method, query: { id } } = req;

  if (method === "GET") {
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else if (method === "PUT") {
    try {
      const { username, email } = req.body;

      // Check if username or email already exists
      const existingUserByUsername = await User.findOne({ username });
      const existingUserByEmail = await User.findOne({ email });

      if (existingUserByUsername && existingUserByUsername._id.toString() !== id) {
        return res.status(400).json({ message: "This username is already taken." });
      }

      if (existingUserByEmail && existingUserByEmail._id.toString() !== id) {
        return res.status(400).json({ message: "This email is already in use." });
      }

      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
