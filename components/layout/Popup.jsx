// Popup.jsx

import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { IoFolderOpenSharp } from "react-icons/io5";
import Terminal from './Terminal';
import { useDispatch, useSelector } from 'react-redux';
import { openPopupState } from '@/redux/popUp';
import CodeEditor from './CodeEditor';
import { motion } from "framer-motion";
import { updateZIndex } from '@/redux/zindex';

const Popup = ({ id, onClose, user}) => {
  const [size, setSize] = useState({ width: 560, height: 314 });
  const [position, setPosition] = useState({ x: 330, y: 160 });
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.popUp.apps);
  const application = useSelector((state) => state.popUp.application);
  const isOpen = useSelector((state) => state.popUp.isOpen);
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
      onMouseDown={() => handleClick("terminal")}
      onClick={() => handleClick("terminal")}
      style={{ zIndex: zindex["terminal"] }}
      id="popup"
      size={size}
      position={position}
      onDragStop={handleDragStop}
      onResize={handleResize}
      minWidth={335}
      minHeight={200}
      maxWidth={window.innerWidth - 100}
      maxHeight={window.innerHeight - 100}
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
      <div className="handle items-center border justify-between rounded-t-xl titlebar font-bold bg-gray-100" style={{ height: '28px', width: '100%' }} id="titlebar">
        <div className="buttons gap-0.5 items-center flex justify-between">
          <div className="close hover:shadow-2xl shadow-red-600 hover:scale-125">
            <a className="closebutton hover:shadow-2xl shadow-red-600 hover:scale-110" onClick={() => onClose(id)}><span><strong>x</strong></span></a>
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
            <span className="icon-wrapper shadow-2xl"><IoFolderOpenSharp className='hover:shadow-2xl transform scale-150 gap-1 items-center' /></span>&nbsp;{user.username} -- -zsh- {parseInt(size.width)} x {parseInt(size.height)}</p>
        </div>
      </div>
      <div className="rounded-b-xl border" style={{ width: '100%', height: '100%', background: 'white' }}>
        {/* Popup içeriği */}
        {<Terminal width={size.width} height={size.height} user={user} />}
      </div>
    </Rnd>
  );
};

export default Popup;
