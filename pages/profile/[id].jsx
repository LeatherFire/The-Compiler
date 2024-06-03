import React, { useState, useEffect } from 'react';
import Terminal from '../../components/layout/TerminalProfile';
import { Rnd } from 'react-rnd';
import { IoFolderOpenSharp } from "react-icons/io5";
import TerminalProfile from '@/components/layout/TerminalProfile';
import { useDispatch } from 'react-redux';
import { getSession } from 'next-auth/react';
import axios from 'axios';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

const Index = ({user}) => {
    const [size, setSize] = useState({ width: 571, height: 376 });
    const [position, setPosition] = useState({ x: 430, y: 200 });


      const handleResize = (e, direction, ref, delta, position) => {
        setSize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
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
    <Rnd
      id="popup"
      size={size}
      position={position}
      onResize={handleResize}
      minWidth={500}
      minHeight={300}
      maxHeight={500}
      maxWidth={700}
      dragHandleClassName="handle"
      enableResizing={{
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <div className="handle items-center border justify-between rounded-t-xl backdrop-blur-2xl bg-opacity-80 titlebar font-bold bg-gray-100" style={{ height: '28px', width: '100%' }} id="titlebar">
        <div className="buttons gap-0.5 items-center flex justify-between">
          <div className="close hover:shadow-2xl shadow-red-600 hover:scale-125">
            <a className="closebutton hover:shadow-2xl shadow-red-600 hover:scale-110"><span><strong>x</strong></span></a>
          </div>
          <div className="minimize hover:scale-125">
            <a className="minimizebutton hover:scale-110" href="#"><span><strong>&ndash;</strong></span></a>
          </div>
          <div className="zoom hover:scale-125">
            <a className="zoombutton hover:scale-110" href="#"><span><strong>+</strong></span></a>
          </div>
        </div>
        <div className='flex justify-center'>
          <p className="leatherfire flex-shrink-0 pt-1 text-gray-700 font-mono text-[9pt] items-center flex gap-1 justify-center">
            <span className="icon-wrapper shadow-2xl"><IoFolderOpenSharp className='hover:shadow-2xl transform scale-150 gap-1 items-center' /></span>&nbsp;{user.username} -- -Profile- {parseInt(size.width)} x {parseInt(size.height)}</p>
        </div>
      </div>
      <div className="rounded-b-xl border" style={{ width: '100%', height: '100%', background: 'white' }}>
        {/* Popup içeriği */}
        {<TerminalProfile width={(size.width-1)} height={size.height} user={user}/>}
      </div>
    </Rnd>
      
    </div>
  )
}

export const getServerSideProps = async ({ req, res, params }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
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

    // URL'deki kimlik ile oturumdaki kimlik aynı mı kontrol edin
    if (params.id !== loggedInUser._id) {
      return {
        redirect: {
          destination: `/profile/${loggedInUser._id}`,
          permanent: false,
        },
      };
    }

    const userResponseById = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`, {
      headers: {
        Cookie: req.headers.cookie,
      },
    });
    const user = userResponseById.data;

    // `session.user.image` alanını kontrol edin ve `null` olarak ayarlayın
    if (session.user && session.user.image === undefined) {
      session.user.image = null;
    }

    return {
      props: {
        session,
        user: user || null,
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      notFound: true,
    };
  }
};



export default Index
