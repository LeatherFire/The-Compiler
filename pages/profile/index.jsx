import { getServerSession } from "next-auth/next";
import axios from "axios";
import { authOptions } from "../api/auth/[...nextauth]";

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        headers: {
          Cookie: context.req.headers.cookie,
        },
      });
      const users = response.data;

      // Email adresine göre kullanıcıyı bulun
      const user = users.find(u => u.email === session.user.email);

      if (user && user._id) {
        return {
          redirect: {
            destination: `/profile/${user._id}`,
            permanent: false,
          },
        };
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  } else {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const ProfileRedirect = () => {
  return null;
};

export default ProfileRedirect;
