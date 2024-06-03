import dbConnect from "@/util/dbConnect";
import Favorites from "@/models/Favorites";
import Code from "@/models/Code";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import User from "@/models/User";

export default async function handler(req, res) {
  await dbConnect();
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findOne({ email: session.user.email }).select("_id");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const userId = user._id;

  switch (req.method) {
    case 'GET':
      try {
        const favorites = await Favorites.findOne({ userId }).populate('codes');
        if (!favorites) {
          return res.status(404).json({ message: "Favorites not found" });
        }
        
        const codes = await Code.find({ _id: { $in: favorites.codes } }).select('name language nickname photo');

        return res.status(200).json(codes);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

    case 'POST':
      const { codeId } = req.body;
      if (!codeId) {
        return res.status(400).json({ message: "Code ID is required" });
      }

      try {
        const codeExists = await Code.findById(codeId);
        if (!codeExists) {
          return res.status(404).json({ message: "Code not found" });
        }

        let favorites = await Favorites.findOne({ userId });
        if (favorites) {
          if (!favorites.codes.includes(codeId)) {
            favorites.codes.push(codeId);
            await favorites.save();
          } else {
            return res.status(400).json({ message: "Code is already in favorites" });
          }
        } else {
          favorites = new Favorites({ userId, codes: [codeId] });
          await favorites.save();
        }

        return res.status(200).json({ message: "Code added to favorites", favorites });
      } catch (error) {
        console.error("Error adding code to favorites:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

    case 'DELETE':
      const { codeId: codeIdToRemove } = req.body;
      if (!codeIdToRemove) {
        return res.status(400).json({ message: "Code ID is required" });
      }

      try {
        let favorites = await Favorites.findOne({ userId });
        if (favorites) {
          const codeIndex = favorites.codes.indexOf(codeIdToRemove);
          if (codeIndex > -1) {
            favorites.codes.splice(codeIndex, 1);
            await favorites.save();
            return res.status(200).json({ message: "Code removed from favorites" });
          } else {
            return res.status(404).json({ message: "Code not found in favorites" });
          }
        } else {
          return res.status(404).json({ message: "Favorites not found" });
        }
      } catch (error) {
        console.error("Error removing code from favorites:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
