import React from 'react';

const RightClickMenu = ({ x, y, onClose }) => {
  return (
    <div 
      style={{ 
        position: 'fixed', 
        top: y, 
        left: x,  
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', 
        borderRadius: '10px', 
        padding: '10px',
        height: 'auto',
        width: '220px',
        zIndex: 100,
      }}
      className='bg-[#ffffff] backdrop-blur-lg bg-opacity-90'
      onContextMenu={(e) => e.preventDefault()}
    >
      <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;New Folder</p>
      <hr className="my-1 mx-2 border-[#bbbec1]" />
      <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Get Info</p>
      <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Change Wallpaper...</p>
      <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Edit Widgets...</p>
      <hr className="my-1 mx-2 border-[#bbbec1]" />
      <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Use Stacks</p>
      <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Sort By</p>
      <p className='hover:bg-[#0e5fd5] bg-auto hover:text-white rounded-md text-sm cursor-pointer mb-1' onClick={() => onClose()}>&nbsp;&nbsp;Clean Up</p>
      <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Clean Up By</p>
      <p className='hover:bg-red-500 bg-auto hover:text-white rounded-md text-sm cursor-not-allowed mb-1'>&nbsp;&nbsp;Show View Options</p>
      <hr className="my-1 mx-2 border-[#bbbec1]" />
      <p className='hover:bg-red-500 bg-auto truncate hover:text-white rounded-md text-sm cursor-not-allowed'>&nbsp;&nbsp;Import from Iphone or Ipad</p>
    </div>
  );
}

export default RightClickMenu;
