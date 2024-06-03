import React from "react";
import { getSession } from "next-auth/react";
import { Typewriter } from "react-simple-typewriter";
import Terminal from "./Terminal";
import { useRouter } from 'next/router';
const Index = () => {
    const router = useRouter();
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0)", // Burada overlay rengini ayarlayabilirsiniz
        zIndex: -1, // Arkaplanın altında olması için z-index'i düşük bir değer yapın
      }}
      className="flex min-h-screen flex-1 flex-col justify-center px-6 py-10 lg:px-8"
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover", // Videoyu ekran boyutuna sığdırmak için
          zIndex: -2, // Arkaplanın altında olması için z-index'i daha düşük bir değer yapın
        }}
      >
        <source
          src="https://assets.codepen.io/3364143/7btrrd.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="flex flex-col mx-auto w-[35rem] h-[25.3rem] bg-blue-50 bg-opacity-50 backdrop-blur-lg rounded-xl border-gray-800 shadow-2xl">
        <div className="flex w-full h-10 bg-blue-50 bg-opacity-90 rounded-t-xl justify-between px-3 items-center">
          <div className="flex gap-1">
            <div className="flex w-4 h-4 rounded-full bg-red-500 items-center justify-center border border-red-400 shadow-sm hover:scale-110 transition-all relative group">
              <span className="text-xs mb-0.5 text-gray-800 font-semibold cursor-default opacity-0 group-hover:opacity-100 transition-opacity">
                x
              </span>
            </div>
            <div className="flex w-4 h-4 rounded-full bg-yellow-500 items-center justify-center border border-yellow-400 shadow-sm hover:scale-110 transition-all relative group">
              <span className="text-xs mb-0.5 text-gray-800 font-semibold cursor-default opacity-0 group-hover:opacity-100 transition-opacity">
                -
              </span>
            </div>
            <div className="flex w-4 h-4 rounded-full bg-green-500 items-center justify-center border border-green-400 shadow-sm hover:scale-110 transition-all relative group">
              <span className="text-xs mb-0.5 text-gray-800 font-semibold cursor-default opacity-0 group-hover:opacity-100 transition-opacity">
                +
              </span>
            </div>
          </div>
          <div className="flex mr-10 text-gray-700 shadow-sm cursor-default">
            WebOS
          </div>
          <div className="flex"></div>
        </div>
        <div className="flex flex-col w-full h-full justify-between items-center p-4 gap-2">
          <div className="flex flex-col w-full bg-blue-50 h-full bg-opacity-5 backdrop-blur-md rounded-md p-3 gap-2">
            <div className="flex gap-1 w-full">
              <div className="flex rounded-md w-[16rem] h-28 border-2 bg-blue-50 border-gray-600 hover:scale-105 transition-all">
                <Terminal />
              </div>
              <div className="flex w-full h-28 rounded-md text-center justify-center items-center text-xl font-semibold leading-10 text-wrap align-top whitespace-normal pl-1 hover:scale-110 cursor-default">
                <Typewriter
                  words={[
                    "Hello World",
                    "Welcome to WebOS",
                    "Code with Confidence",
                    "Share Your Creations",
                    "Unlock New Possibilities",
                    "Python, Java, C++, C,",
                    "JavaScript, Go, JSON",
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </div>
            </div>
            <div className="flex w-full h-full  rounded-md text-center overflow-y-scroll p-2 text-sm font-semibold cursor-default">
              <p className="overflow-y-scroll">
                Welcome to WebOS! Step into this digital realm and elevate your
                coding, creating, and sharing experiences. WebOS is a
                browser-based operating system that lets you compile code, share
                projects, and receive feedback seamlessly. With its sleek
                interface, coding transforms into a passion. Each line of code
                and new project pulls you deeper into the vast digital universe.
                Get ready to explore, learn, and create like never before.
                Embark on this journey with WebOS and unlock endless
                possibilities. Your adventure begins now!
              </p>
            </div>
          </div>
          <div className="flex gap-4 ">
            <div className="flex w-20 h-7 opacity-55 bg-blue-50 rounded-full items-center text-center justify-center text-xs pb-0.5 font-bold shadow-xl pr-[0.1rem] cursor-pointer hover:scale-125 transition-all hover:opacity-100 hover:shadow-2xl"
            onClick={() => router.push("/auth/register")}>
              Register
            </div>
            <div className="flex w-20 h-7 opacity-55 bg-blue-50 rounded-full items-center text-center justify-center text-xs pb-0.5 font-bold shadow-xl pl-[0.1rem] cursor-pointer hover:scale-125 transition-all hover:opacity-100 hover:shadow-2xl"
            onClick={() => router.push("/auth/login")}>
              Login
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Index;
