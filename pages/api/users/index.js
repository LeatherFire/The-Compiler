import User from "@/models/User";
import dbConnect from "@/util/dbConnect";

const handler = async (req, res) => { // handler fonksiyonunu async yapın
    await dbConnect();
    const { method } = req;

    if (method === "GET") {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else if (method === "POST") {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

export default handler;
