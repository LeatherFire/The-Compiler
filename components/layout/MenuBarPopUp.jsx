import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { signOut } from "next-auth/react";

const MenuBarPopUp = () => {
  const { id, x, y, isOn } = useSelector((state) => state.menu);
  const router = useRouter();

const getExit = () => {
  setTimeout(() => {
    toast.success('Logged out successfully');
    toast.info('Redirecting to login page...', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    signOut({ redirect: false });
    setTimeout(() => {
      router.push('/welcome');
    }, 1000);
  }, 1000);
};

  const renderMenu = (id) => {
    switch (id) {
      case "file":
        return (
          <div className='menubarpopsup '>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;New Finder Window</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;New Folder</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;New Tab</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Open</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Open With</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Close Window</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Move to Trash</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Get Info</p>
          </div>
        );
      case "edit":
        return (
          <div>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Undo</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Redo</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Cut</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Copy</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Paste</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Select All</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Find</p>
          </div>
        );
      case "view":
        return (
          <div>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Show Sidebar</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Show Status Bar</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Enter Full Screen</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Hide Toolbar</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Customize Toolbar...</p>
          </div>
        );
      case "help":
        return (
          <div>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Mac Help</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Get Started with Mac</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Contact Support</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Provide Feedback</p>
          </div>
        );
      case "apple":
        return (
          <div>
            <p className='hover:bg-[#0e5fd5] bg-auto hover:text-white rounded-md text-sm cursor-pointer mb-1' onClick={() => { router.push('/profile');toast.info('Redirecting...');}}>&nbsp;&nbsp;About This You</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1 '>&nbsp;&nbsp;System Preferences...</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;App Store...</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Recent Items</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Force Quit...</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Sleep</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1' onClick={() => onClose()}>&nbsp;&nbsp;Restart...</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Shut Down...</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Lock Screen</p>
            <p className='hover:bg-[#0e5fd5] bg-auto hover:text-white rounded-md text-sm cursor-pointer' onClick={getExit}>&nbsp;&nbsp;Log Out User</p>
          </div>
        );
      case "go":
        return (
          <div>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Back</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Forward</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Enclosing Folder</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Computer</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Home</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Documents</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Downloads</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Network</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;AirDrop</p>
          </div>
        );
      case "window":
        return (
          <div>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Minimize</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Zoom</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Move Window to Left Side of Screen</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Move Window to Right Side of Screen</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Bring All to Front</p>
          </div>
        );
      case "finder":
        return (
          <div>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;About Finder</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Preferences...</p>
            <hr className="my-1 mx-2 border-[#bbbec1]" />
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Empty Trash</p>
            <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Secure Empty Trash...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {isOn && (
        <div
          style={{ 
            position: 'fixed', 
            top: y, 
            left: x,  
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', 
            borderRadius: '5px', 
            padding: '10px',
            height: 'auto',
            width: '263px',
          }}      
          className='bg-[#eeebeb] backdrop-blur-lg bg-opacity-60'
        >
          {renderMenu(id)}
        </div>
      )}
    </div>
  );
};

export default MenuBarPopUp;
