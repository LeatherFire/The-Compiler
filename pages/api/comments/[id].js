import dbConnect from '@/util/dbConnect';
import Comments from '@/models/Comments';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const comment = await Comments.findById(id);
        if (!comment) {
          return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const session = await getSession({ req });
        if (!session) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        const comment = await Comments.findById(id);
        if (!comment) {
          return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.userid.toString() !== session.user.id) {
          return res.status(403).json({ message: 'Forbidden' });
        }

        await comment.remove();
        res.status(200).json({ message: 'Comment deleted' });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
