import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import UserModal from '@/components/layout/userModal';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

const Register = () => {
    const [isClicked1, setIsClicked1] = useState(false);
    const [isClicked2, setIsClicked2] = useState(false);
    const [isClicked3, setIsClicked3] = useState(false);
    const [popupMessage, setPopupMessage] = useState(null);
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
    
        // Şifrelerin eşleşip eşleşmediğini kontrol et
        if (data.password !== data.passwordagain) {
            toast.warning("Passwords do not match");
            return;
        }
    
        // Şifrenin uzunluğunu kontrol et
        if (data.password.length < 8) {
            toast.warning("Password must be at least 8 characters long");
            return;
        }
    
        // Şifrenin özel karakter içerip içermediğini kontrol et
        const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharacters.test(data.password)) {
            toast.warning("Password must contain at least one special character");
            return;
        }
    
        // Şifrenin bir büyük harf ve bir küçük harf içerip içermediğini kontrol et
        const uppercase = /[A-Z]/;
        const lowercase = /[a-z]/;
        if (!uppercase.test(data.password) || !lowercase.test(data.password)) {
            toast.warning("Password must contain at least one uppercase letter and one lowercase letter");
            return;
        }
    
        console.log("data => ", data, "\nformData => ", formData);
    
        
    
        toast.promise(
            axios.post(`api/users/register`, data),
            {
                pending: 'Registering user...',
                success: 'Welcome to WebOS',
                error: {
                    render({ data }) {
                        const error = data.response && data.response.data && data.response.data.message;
    
                        if (error === "Email already exists") {
                            return "Email already exists";
                        } else if (error === "Username already exists") {
                            return "Username already exists";
                        } else {
                            return `Error: ${data.message}`;
                        }
                    }
                }
            }
        )
        .then(() => {
            // Form verilerini temizle
            event.target.reset();
    
            // 3 saniye sonra yönlendirme yap
            setTimeout(() => {
                router.push('/auth/login');
            }, 1000);
        })
        .catch((error) => {
            console.error(error); // Diğer hatalar için konsola hata mesajını yazdır
        });
    };
    
    
    

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0)', // Burada overlay rengini ayarlayabilirsiniz
            zIndex: -1, // Arkaplanın altında olması için z-index'i düşük bir değer yapın 
        }}
        className="flex min-h-screen flex-1 flex-col justify-center px-6 py-10 lg:px-8">
            <video 
                autoPlay
                loop
                muted
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // Videoyu ekran boyutuna sığdırmak için
                    zIndex: -2, // Arkaplanın altında olması için z-index'i daha düşük bir değer yapın
                }}
            >
                <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className='bg-gray-50 rounded-lg w-1/3 mx-auto h-[700px] items-center flex flex-col shadow-2xl cursor-default px-0'>
                <div className='border-b-[1px] bg-gray-200 border-gray-300 flex justify-start w-full rounded-t-lg'>
                    <div className='flex justify-start items-center gap-x-2 ml-2 py-2'>
                        <div className={`hover:scale-110 transition-all w-[0.9rem] h-[0.9rem] bg-red-500 border-[1px] border-red-600 rounded-full pb-[0.1rem] items-center text-center text-gray-800 justify-center flex text-xs shadow-xl ${isClicked1 ? 'animate-bounce' : ''}`} onClick={() => handleClick(setIsClicked1)}>
                            <span className="opacity-0 absolute hover:opacity-100">x</span>
                        </div>
                        <div className={`hover:scale-110 transition-all w-[0.9rem] h-[0.9rem] bg-yellow-500 border-[1px] border-yellow-600 rounded-full pb-[0.1rem] items-center text-center text-gray-800 justify-center flex shadow-xl ${isClicked2 ? 'animate-bounce' : ''}`} onClick={() => handleClick(setIsClicked2)}>
                            <span className="opacity-0 absolute hover:opacity-100">&ndash;</span>
                        </div>
                        <div className={`hover:scale-110 transition-all w-[0.9rem] h-[0.9rem] bg-green-500 border-[1px] border-green-600 rounded-full pb-[0.1rem] items-center text-center text-gray-800 justify-center flex shadow-xl ${isClicked3 ? 'animate-bounce' : ''}`} onClick={() => handleClick(setIsClicked3)}>
                            <span className="opacity-0 absolute hover:opacity-100">+</span>
                        </div>
                    </div>
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Register with your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="nickname" className="block text-sm font-medium leading-6 text-gray-900">
                                Nickname
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        
        <div className='flex gap-2 items-center justify-between'>
          <div className='flex flex-col justify-center'>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            </div>
            <div className='flex flex-col justify-center'>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              Surname
            </label>
            <div className="mt-2">
              <input
                id="surname"
                name="surname"
                type="surname"
                autoComplete="surname"
                required
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            </div>
          </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="passwordagain" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="passwordagain"
                                    name="passwordagain"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Do you have an account?{' '}
                        <Link href="/auth/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            And there&apos;s a login
                        </Link>
                    </p>
                </div>
            </div>
            
            {popupMessage && (
                <UserModal id="registerModal" onClose={() => setPopupMessage(null)} message={popupMessage}>
                </UserModal>
            )}
        </div>
    );
};


export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    const res = await axios.get(`api/users`);
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

export default Register;
