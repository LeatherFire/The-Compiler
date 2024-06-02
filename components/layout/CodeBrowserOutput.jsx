// Popup.jsx

import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { IoFolderOpenSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { openPopupState } from '@/redux/popUp';
import { updateZIndex } from '@/redux/zindex';
import TerminalOutput from './TerminalOutput';
import { VscOutput } from "react-icons/vsc";
import { MdFavoriteBorder,MdFavorite } from "react-icons/md";
import Favorities from './Favorities';
import { PiCodesandboxLogoDuotone } from "react-icons/pi";
import { PiCodeSimpleFill } from "react-icons/pi";
import MainCodeContext from './MainCodeContext';
import CodeBrowser from './CodeBrowser';
import { PiBrowsersDuotone } from "react-icons/pi";

const CodeBrowserOutput = ({ id, onClose,onMain}) => {
  const [size, setSize] = useState({ width: 826, height: 492 });
  const [position, setPosition] = useState({ x: window.innerWidth*(0.2), y: window.innerHeight*(0.18) });
  const dispatch = useDispatch();
  const zindex = useSelector((state) => state.zindex.zindex);


  const handleDragStop = (e, d) => {
    if (d.x < -300) {
      d.x = -300;
    }
    if (d.x > 1300){
      d.x = 1300;
    }
    if (d.y < 30) {
      d.y = 30;
    }
    if (d.y > 735) {
      d.y = 735;
    }
    setPosition({ x: d.x, y: d.y });
    dispatch(openPopupState({ size, position: { x: d.x, y: d.y } }));
    dispatch(updateZIndex({ name : "terminal"}));
  };

  const handleClick = (name) => {
    dispatch(updateZIndex({ name }));
  };

  const makeLitter = () => {
    if(position.x==0 && position.y==35){
    setSize({ width: 826, height: 492 });
    setPosition({ x: 295, y: 150 });
    }
    else{
    setSize({ width: window.innerWidth-2, height: window.innerHeight-138});
    setPosition({ x: 0, y: 35 });
    }
  };

  const handleResize = (e, direction, ref, delta, position) => {
    setSize({
      
      width: ref.offsetWidth,
      height: ref.offsetHeight,
     
    });
    dispatch(openPopupState({ size: { width: ref.offsetWidth, height: ref.offsetHeight }, position }));
  };

  return (
    <Rnd
      onMouseDown={() => handleClick("codeBrowser")}
      onClick={() => handleClick("codeBrowser")}
      style={{ zIndex: zindex["codeBrowser"] }}
      id="popup"
      size={size}
      position={position}
      onDragStop={handleDragStop}
      onResize={handleResize}
      minWidth={826}
      minHeight={492}
      //maxWidth={400}
      //maxHeight={660}
      dragHandleClassName="handle"
      enableResizing={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <div className="handle items-center border-b-[1px] border border-gray-300 justify-between border-b-gray-400 rounded-t-xl backdrop-blur-lg titlebar font-bold bg-gray-100 bg-opacity-80" style={{ height: '28px', width: '100%' }} id="titlebar">
        <div className="buttons gap-0.5 items-center flex justify-between ">
          <div className="close hover:shadow-2xl shadow-red-700 hover:scale-125">
            <a className="closebutton hover:shadow-2xl shadow-red-600 hover:scale-110" onClick={() => onClose(id)}><span><strong>x</strong></span></a>
          </div>
          <div className="minimize hover:scale-125">
            <a className="minimizebutton hover:scale-110" ><span><strong>&ndash;</strong></span></a>
          </div>
          <div className="zoom hover:scale-125">
            <a className="zoombutton hover:scale-110" onClick={() => makeLitter()}><span><strong>+</strong></span></a>
          </div>
        </div>
        <div className='flex justify-center'>
          <p className="leatherfire flex-shrink-0 pt-1 text-gray-700 font-mono text-[9pt] items-center flex gap-1 justify-center">
            <span className="relative shadow-2xl"><PiBrowsersDuotone className=' relative fill-gray-800 hover:shadow-2xl transform scale-150 gap-1 items-center' /><PiBrowsersDuotone className='animate-ping absolute top-0 fill-gray-500 hover:shadow-2xl transform scale-150 gap-1 items-center' /></span>&nbsp;Code Browser --  {parseInt(size.width)} x {parseInt(size.height)} </p>
        </div>
      </div>
      <div className="rounded-b-xl border" style={{ width: '100%', height: '100%', background: 'white' }}>
        {/* Popup içeriği */}
        {<CodeBrowser width={size.width-1} height={size.height-1} onMain={onMain}/>}
      </div>
    </Rnd>
  );
};

export default CodeBrowserOutput;
