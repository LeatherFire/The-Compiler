// Popup.jsx

import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { IoFolderOpenSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { openPopupState } from '@/redux/popUp';
import { updateZIndex } from '@/redux/zindex';
import TerminalOutput from './TerminalOutput';
import { VscOutput } from "react-icons/vsc";

const PopupOutput = ({ id, onClose,codeId,user}) => {
  const [newCodeId, setNewCodeId] = useState(codeId);
  const [size, setSize] = useState({ width: 450, height: 680 });
  const [position, setPosition] = useState({ x: 1000, y: 53 });
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

  const handleResize = (e, direction, ref, delta, position) => {
    setSize({
      
      width: ref.offsetWidth,
      height: ref.offsetHeight,
     
    });
    dispatch(openPopupState({ size: { width: ref.offsetWidth, height: ref.offsetHeight }, position }));
  };

  return (
    <Rnd
      onMouseDown={() => handleClick("output")}
      onClick={() => handleClick("output")}
      style={{ zIndex: zindex["output"] }}
      id="popup"
      size={size}
      position={position}
      onResize={handleResize}
      minWidth={335}
      minHeight={500}
      maxWidth={500}
      maxHeight={680}
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
      <div className="handle items-center border-b-[1px] border border-gray-300 justify-between border-b-gray-400 rounded-t-xl backdrop-blur-lg titlebar font-bold bg-gray-100 bg-opacity-80" style={{ height: '28px', width: '100%' }} id="titlebar">
      <div className=' absolute w-3 h-3 bg-yellow-500 rounded-full top-[-0.15rem] right-[-0.15rem] border-[1px] hover:border-gray-100'>
            <div className='animate-ping absolute w-3 h-3 bg-yellow-400 rounded-full'></div>
      </div>
        <div className="buttons gap-0.5 items-center flex justify-between ">
          <div className="close hover:shadow-2xl shadow-red-600 hover:scale-125">
            <a className="closebutton hover:shadow-2xl shadow-red-600 hover:scale-110" onClick={() => onClose(id)}><span><strong>x</strong></span></a>
          </div>
          <div className="minimize hover:scale-125">
            <a className="minimizebutton hover:scale-110" ><span><strong>&ndash;</strong></span></a>
          </div>
          <div className="zoom hover:scale-125">
            <a className="zoombutton hover:scale-110" ><span><strong>+</strong></span></a>
          </div>
        </div>
        <div className='flex justify-center'>
          <p className="leatherfire flex-shrink-0 pt-1 text-gray-700 font-mono text-[9pt] items-center flex gap-1 justify-center">
            <span className=" shadow-2xl"><VscOutput className=' fill-black hover:shadow-2xl transform scale-150 gap-1 items-center' /></span>&nbsp;Output -- -zsh- {parseInt(size.width)} x {parseInt(size.height)}</p>
        </div>
      </div>
      <div className="rounded-b-xl border" style={{ width: '100%', height: '100%', background: 'white' }}>
        {/* Popup içeriği */}
        {<TerminalOutput width={size.width-1} height={size.height} codeId={newCodeId} user={user} />}
      </div>
    </Rnd>
  );
};

export default PopupOutput;
