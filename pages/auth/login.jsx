import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSquareGithub } from "react-icons/fa6";
import { useSession, signIn, getSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const { data: session } = useSession();
  const [isClicked1, setIsClicked1] = useState(false);
  const [isClicked2, setIsClicked2] = useState(false);
  const [isClicked3, setIsClicked3] = useState(false);
  const router = useRouter();

  const handleClick = (setter) => {
    setter(true); // Tıklama olduğunda state'i true yap
    setTimeout(() => {
      setter(false); // 5 saniye sonra state'i false yap
    }, 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
  
    let options = {
      redirect: false,
      email: data.email,
      password: data.password,
    };
  
    try {
      const response = await signIn('credentials', options);
      
      if (response.ok) {
        console.log("Login successful", response);
        toast.success("Welcome to WebOS", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        toast.info("Redirecting to profile...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        event.target.reset();
  
        // Kullanıcı bilgilerini al
        const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);
        const user = userResponse.data;
  
        if (user && user._id) {
          router.push(`/profile/${user._id}`);
        } else {
          throw new Error("User ID not found");
        }
      } else {
        if (response.error === "You don't have an account!") {
          toast.error("You don't have an account. Please register.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            router.push('/auth/register');
          }, 1500);
        } else {
          toast.error(response.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    } catch (error) {
      console.error('Login error:', error); // Hata durumunda konsola hata mesajını yazdır
    }
  };
  

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
      <div className="bg-gray-50 rounded-lg w-1/3 mx-auto h-[500px] items-center flex flex-col shadow-2xl cursor-default px-0">
        <div className="border-b-[1px] bg-gray-200 border-gray-300 flex justify-start w-full rounded-t-lg backdrop-blur-xl">
          <div className="flex justify-start items-center gap-x-2 ml-2 py-2">
            <div
              className={`hover:scale-110 transition-all w-[0.9rem] h-[0.9rem] bg-red-500 border-[1px] border-red-600 rounded-full pb-[0.1rem] items-center text-center text-gray-800 justify-center flex text-xs shadow-xl ${
                isClicked1 ? "animate-bounce" : ""
              }`}
              onClick={() => handleClick(setIsClicked1)}
            >
              <span className="opacity-0 absolute hover:opacity-100">x</span>
            </div>
            <div
              className={`hover:scale-110 transition-all w-[0.9rem] h-[0.9rem] bg-yellow-500 border-[1px] border-yellow-600 rounded-full pb-[0.1rem] items-center text-center text-gray-800 justify-center flex shadow-xl ${
                isClicked2 ? "animate-bounce" : ""
              }`}
              onClick={() => handleClick(setIsClicked2)}
            >
              <span className="opacity-0 absolute hover:opacity-100">
                &ndash;
              </span>
            </div>
            <div
              className={`hover:scale-110 transition-all w-[0.9rem] h-[0.9rem] bg-green-500 border-[1px] border-green-600 rounded-full pb-[0.1rem] items-center text-center text-gray-800 justify-center flex shadow-xl ${
                isClicked3 ? "animate-bounce" : ""
              }`}
              onClick={() => handleClick(setIsClicked3)}
            >
              <span className="opacity-0 absolute hover:opacity-100">+</span>
            </div>
          </div>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Sign in
              </button>

              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                onClick={() => signIn("github")}
              >
                Github <FaSquareGithub className="ml-2 w-6 h-6" />
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href="/auth/register"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
            >
              Start a 14 day free trial
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log("Session:", session);
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const user = res.data?.find((user) => user.email === session?.user.email);

  if (session && user) {
    return {
      redirect: {
        destination: "/profile/" + user._id,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Login;
