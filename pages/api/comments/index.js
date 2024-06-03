import dbConnect from '@/util/dbConnect';
import Comments from '@/models/Comments';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const comments = await Comments.find({});
        res.status(200).json(comments);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const session = await getSession({ req });
        if (!session) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        const newComment = await Comments.create({
          ...req.body,
          username: session.user.name,
          userid: session.user.id,
        });
        res.status(201).json(newComment);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
