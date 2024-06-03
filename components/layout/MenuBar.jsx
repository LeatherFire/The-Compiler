import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { FaApple } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { IoIosBatteryFull, IoIosWifi } from "react-icons/io";
import { MdLanguage } from "react-icons/md";
import profilePic from '../../public/control-center-icon.png';
import { IoSearch } from "react-icons/io5";
import { updateItemPosition } from '../../redux/menuSlice';

const MenuBar = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dispatch = useDispatch();
  const [time, setTime] = useState('');
  const appName = useSelector((state) => state.appName.name);
  const isOn = useSelector((state) => state.menu.isOn);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getFormattedTime() {
    const now = new Date();
    const dayIndex = now.getDay();
    const dayOfWeek = days[dayIndex];
    const dayOfMonth = now.getDate();
    const monthIndex = now.getMonth();
    const month = months[monthIndex];
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    return `${dayOfWeek} ${month} ${dayOfMonth} ${year} ${hour}:${minute}:${second}`;
  }

  const handleMouseMove = (id, x, y, isOn) => {
    dispatch(updateItemPosition({ id, x, y, isOn }));
  };

  return (
    <header
    onContextMenu={(e) => e.preventDefault()}
    >
      <div className="menu-bar ">
        <div className="left flex space-x-1 justify-normal container" style={{ width: '360px'}}>
          <span className='apple-icon mb-[2px] rounded-tl-lg rounded'><FaApple className='transform scale-140 rounded-tl-lg rounded bg-bottom hover:bg-slate-100 hover:bg-opacity-20' onMouseMove={isOn ? (e) => handleMouseMove('apple', e.clientX, e.clientY, true) : undefined} onClick={(e) => handleMouseMove('apple', e.clientX, e.clientY, true)} /></span>
          <span className="menus custom-hover-scale active rounded flex items-center justify-center hover:bg-slate-100 hover:bg-opacity-20" style={{ height: '22px', width: '44px' }} onMouseMove={isOn ? (e) => handleMouseMove('finder', e.clientX, e.clientY, true) : undefined} onClick={(e) => handleMouseMove('finder', e.clientX, e.clientY,true)} >{appName}</span>
          <span className="menus custom-hover-scale rounded flex items-center justify-center hover:bg-slate-100 hover:bg-opacity-20" style={{ height: '22px', width: '30px' }} onMouseMove={isOn ? (e) => handleMouseMove('file', e.clientX, e.clientY, true) : undefined} onClick={(e) => handleMouseMove('file', e.clientX, e.clientY,true)} >File</span>
          <span className="menus custom-hover-scale rounded flex items-center justify-center hover:bg-slate-100 hover:bg-opacity-20" style={{ height: '22px', width: '44px' }} onMouseMove={isOn ? (e) => handleMouseMove('edit', e.clientX, e.clientY, true) : undefined} onClick={(e) => handleMouseMove('edit', e.clientX, e.clientY,true)} >Edit</span>
          <span className="menus custom-hover-scale rounded flex items-center justify-center hover:bg-slate-100 hover:bg-opacity-20" style={{ height: '22px', width: '44px' }} onMouseMove={isOn ? (e) => handleMouseMove('view', e.clientX, e.clientY, true) : undefined} onClick={(e) => handleMouseMove('view', e.clientX, e.clientY,true)} >View</span>
          <span className="menus custom-hover-scale rounded flex items-center justify-center hover:bg-slate-100 hover:bg-opacity-20" style={{ height: '22px', width: '44px' }} onMouseMove={isOn ? (e) => handleMouseMove('go', e.clientX, e.clientY, true) : undefined} onClick={(e) => handleMouseMove('go', e.clientX, e.clientY,true)} >Go</span>
          <span className="menus custom-hover-scale rounded flex items-center justify-center hover:bg-slate-100 hover:bg-opacity-20" style={{ height: '22px', width: '50px' }} onMouseMove={isOn ? (e) => handleMouseMove('window', e.clientX, e.clientY, true) : undefined} onClick={(e) => handleMouseMove('window', e.clientX, e.clientY,true)} >Window</span>
          <span className="menus custom-hover-scale rounded flex items-center justify-center hover:bg-slate-100 hover:bg-opacity-20" style={{ height: '22px', width: '44px' }} onMouseMove={isOn ? (e) => handleMouseMove('help', e.clientX, e.clientY, true) : undefined} onClick={(e) => handleMouseMove('help', e.clientX, e.clientY,true)} >Help</span>
        </div>
        <div className="right flex gap-4">
          <div className="menu-ico">
            <span className='play-icon'><FaCirclePlay className='vol transform scale-100 rounded flex items-center justify-center hover:bg-slate-100 hover:bg-opacity-20 bg-16 ' /></span>
          </div>
          <div className="menu-ico">
            <span className='fab play-icon ml-6'><IoIosBatteryFull className='fab transform scale-150 rounded flex items-center justify-center hover:bg-slate-100 hover:bg-opacity-20' /></span>
          </div>
          <div className="menu-ico">
            <span className='fab play-icon ml-10'><MdLanguage className='fab transform scale-140 rounded flex items-center justify-center hover:bg-slate-100 hover:bg-opacity-20' /></span>
          </div>
          <div className="menu-ico">
            <span className='fab play-icon ml-12'><IoIosWifi className='fab transform scale-140 rounded flex items-center justify-center hover:bg-slate-100 hover:bg-opacity-20' /></span>
          </div>
          <div className="menu-ico">
            <span className='fab play-icon ml-14'><IoSearch className='fab transform scale-100 rounded flex items-center justify-center hover:bg-slate-100 hover:bg-opacity-20' /></span>
          </div>
          <div className="menu-ico">
            <Image className='fab transform scale-140 white-icon ml-16 rounded flex items-center justify-center hover:bg-slate-100 hover:bg-opacity-20'
              src={profilePic}
              alt="Picture of the author"
            />
          </div>
          <div className="menu-time custom-hover-scale flex justify-end items-end w-10 ml-10 rounded flex items-center justify-center hover:bg-slate-100 hover:bg-opacity-20">
            {time}
          </div>
        </div>
      </div>
    </header>
  )
}

export default MenuBar;
