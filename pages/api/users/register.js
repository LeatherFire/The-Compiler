import User from "@/models/User";
import dbConnect from "@/util/dbConnect";
const bcrypt = require('bcrypt');

const handler = async (req, res) => {
  // handler fonksiyonunu async yapın
  await dbConnect();
  const { method } = req;
  const body = req.body;
  
  try {
    const existingUser = await User.findOne({ email: body.email });
    const existingUser2 = await User.findOne({ username: body.username });
    if (existingUser ) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (existingUser2 ) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User(body);
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    await newUser.save();
    
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default handler;
