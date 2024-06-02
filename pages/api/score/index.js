import dbConnect from '@/util/dbConnect';
import Code from '@/models/Code';
import User from '@/models/User';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;
  const body = req.body;
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await User.findOne({ email: session.user.email }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (method === 'POST') {
      const { identifier, rating } = body;
      if (rating < 0 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 0 and 5' });
      }

      const code = await Code.findOne({ identifier });
      if (!code) {
        return res.status(404).json({ message: 'Code not found' });
      }

      const userHasRated = code.raters && code.raters.includes(session.user.email);
      if (userHasRated) {
        return res.status(400).json({ message: 'You have already rated this code.' });
      }

      const totalRatings = code.rating * (code.ratingCount || 0) + rating;
      const newRatingCount = (code.ratingCount || 0) + 1;
      const newRating = totalRatings / newRatingCount;

      code.rating = newRating;
      code.ratingCount = newRatingCount;
      code.raters = code.raters ? [...code.raters, session.user.email] : [session.user.email];

      await code.save();

      return res.status(200).json({ message: 'Rating updated successfully', rating: newRating });
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export default handler;
