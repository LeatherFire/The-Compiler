import { getSession } from "next-auth/react";
import axios from "axios";

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    try {
      const response = await axios.get(`api/users`, {
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
