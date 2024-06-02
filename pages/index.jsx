import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MenuBar from "@/components/layout/MenuBar";
import Desktop from "@/components/layout/Desktop";
import { getSession } from "next-auth/react";
import axios from "axios";
export default function Index({ user }) {
  return (
    <main >
      <Desktop user={user} />
    </main>
  );
}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/welcome',
        permanent: false,
      },
    };
  }

  // Oturumdaki kullanıcının verilerini al
  try {
    const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      headers: {
        Cookie: req.headers.cookie,
      },
    });
    const loggedInUser = userResponse.data;

    return {
      props: {
        session,
        user: loggedInUser || null,
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      notFound: true,
    };
  }
};
