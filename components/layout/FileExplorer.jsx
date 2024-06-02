import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentDirectory, createFolder, deleteItem } from '@/redux/fileManagerSlice';
import { RiSignalTowerLine } from "react-icons/ri";
import { FaAppStore } from "react-icons/fa";
import { IoDocumentSharp } from "react-icons/io5";
import { MdDownloading } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoCloudOutline } from "react-icons/io5";
import { MdOutlineFolderShared } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";
import { FaCircle } from "react-icons/fa";
import { TbCirclesRelation } from "react-icons/tb";
import { PiCheckCircle } from "react-icons/pi";
import { IoIosArrowUp } from "react-icons/io";
import Mycodes from './Mycodes';


const FileExplorer = ({ width, height, searchQuery, onEdit,onMain }) => {
  const dispatch = useDispatch();
  const currentDirectory = useSelector((state) => state.fileManager.currentDirectory);
  const fileSystem = useSelector((state) => state.fileManager.fileSystem);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);
  const [isHovered6, setIsHovered6] = useState({
    name: false,
    date: false,
    size: false,
    kind: false
  });
  const [isHovered7, setIsHovered7] = useState("Name");

  const filebarstate =(name) => {
    if (name === 'Name') {
      setIsHovered7("Name");
      setIsHovered6({
        ...isHovered6,
        name: !isHovered6.name
      });
    }
    else if (name === 'Date Modified') {
      setIsHovered7("Date Modified");
      setIsHovered6({
        ...isHovered6,
        date: !isHovered6.date
      });
    }
    else if (name === 'Size') {
      setIsHovered7("Size");
      setIsHovered6({
        ...isHovered6,
        size: !isHovered6.size
      });
    }
    else if (name === 'Kind') {
      setIsHovered7("Kind");
      setIsHovered6({
        ...isHovered6,
        kind: !isHovered6.kind
      });
    }
    else{
      setIsHovered7("Name");
      setIsHovered6({
        name: false,
        date: false,
        size: false,
        kind: false
      })
    }
  };

  // Dizin değiştirme işlevi
  const handleChangeDirectory = (newDirectory) => {
    if (currentDirectory === '/') {
      newDirectory = currentDirectory+newDirectory;
    }
    else {
      newDirectory = currentDirectory + '/' + newDirectory;
    }
    
    dispatch(setCurrentDirectory(newDirectory));
  };

  return (
    <div className='flex flex-row mt-0 container gap-0' style={{ width: width-1, height: height }}>
      <div className='fileexp grid grid-flow-row grid-cols-1 rounded-bl-lg overflow-y-auto p-2 w-[150px] max-w-[150px] min-w-[150px] border-r border-gray-400 '>
        <div className='grid grid-cols-1 flex-nowrap-reverse overscroll-y-auto'>
          <div className='text-gray-400 text-xs font-bold ml-1 overscroll-auto flex-nowrap'>
            <p  className='flex cursor-default items-center justify-between' onMouseOver={() => setIsHovered1(true)} onMouseOut={() => setIsHovered1(false)}>Favorites{isHovered1 && (<IoIosArrowDown className='transform scale-125'/>)}</p>
            <ul className=''>
              <li className='flex cursor-default items-center gap-1 pl-1 py-[5px] text-[14px] p-2 font-thin text-gray-600 rounded hover:bg-gray-300'><RiSignalTowerLine className='text-blue-500 transform scale-125'/>&nbsp;AirDrop</li>
              <li className='flex cursor-default items-center gap-1 pl-1 py-[5px] text-[14px] p-2 font-thin text-gray-600 rounded  hover:bg-gray-300'><FaAppStore className='text-blue-500 transform scale-125'/> &nbsp;Applications</li>
              <li className='flex cursor-default items-center gap-1 p-2 pl-1 py-[5px] text-[14px] font-thin text-gray-600 rounded hover:bg-gray-300'><IoDocumentSharp className='text-blue-500 transform scale-125' />&nbsp;Documents</li>
              <li className='flex cursor-default items-center gap-1 p-2 pl-1 py-[5px] text-[14px] font-thin text-gray-600 rounded hover:bg-gray-300'><MdDownloading className='text-blue-500 transform scale-125'/>&nbsp;Downloads</li>
              <li className='flex cursor-default items-center gap-1 p-2 pl-1 py-[5px] text-[14px] font-thin text-gray-600 rounded hover:bg-gray-300'><IoHomeOutline className='text-blue-500 transform scale-125' />&nbsp;leatherfire</li>
            </ul>
          </div>
          <div className='text-gray-400 text-xs font-bold ml-1 overflow-y-scroll flex-nowrap mt-3'>
            <p  className='flex cursor-default items-center justify-between' onMouseOver={() => setIsHovered2(true)} onMouseOut={() => setIsHovered2(false)}>İCloud{isHovered2 && (<IoIosArrowDown className='transform scale-125'/>)}</p>
            <ul className=''>
              <li className='flex cursor-default truncate items-center gap-1 pl-1 py-[5px] text-[14px] p-2 font-thin text-gray-600 rounded hover:bg-gray-300' onMouseOver={() => setIsHovered5(true)} onMouseOut={() => setIsHovered5(false)}><IoCloudOutline className='text-[#43aeba] transform scale-125'/>&nbsp;İCloud Drive{isHovered5 && (<PiCheckCircle className='hover:text-blue-500 transform scale-150 text-gray-400'/>)}</li>
              <li className='flex cursor-default items-center gap-1 pl-1 py-[5px] text-[14px] p-2 font-thin text-gray-600 rounded  hover:bg-gray-300'><MdOutlineFolderShared className='text-[#43aeba] transform scale-125'/> &nbsp;Shared</li>
            </ul>
          </div>
          <div className='text-gray-400 text-xs font-bold ml-1 overflow-y-scroll flex-nowrap mt-3'>
            <p  className='flex cursor-default items-center justify-between' onMouseOver={() => setIsHovered3(true)} onMouseOut={() => setIsHovered3(false)}>Locations{isHovered3 && (<IoIosArrowDown className='transform scale-125'/>)}</p>
            <ul className=''>
              <li className='flex cursor-default items-center gap-1 pl-1 py-[5px] text-[14px] p-2 font-thin text-gray-600 rounded hover:bg-gray-300'><TfiWorld className='text-black transform scale-100'/>&nbsp;Network</li>
            </ul>
          </div>
          <div className='text-gray-400 text-xs font-bold ml-1 overflow-y-scroll flex-nowrap mt-3'>
            <p  className='flex cursor-default items-center justify-between' onMouseOver={() => setIsHovered4(true)} onMouseOut={() => setIsHovered4(false)}>Tags{isHovered4 && (<IoIosArrowDown className='transform scale-125'/>)}</p>
            <ul className=''>
              <li className='flex cursor-default items-center gap-1 pl-1 py-[5px] text-[14px] p-2 font-thin text-gray-600 rounded hover:bg-gray-300'><FaCircle className='text-red-500 transform scale-75'/>&nbsp;Red</li>
              <li className='flex cursor-default items-center gap-1 pl-1 py-[5px] text-[14px] p-2 font-thin text-gray-600 rounded  hover:bg-gray-300'><FaCircle className='text-orange-500 transform scale-75'/> &nbsp;Orange</li>
              <li className='flex cursor-default items-center gap-1 p-2 pl-1 py-[5px] text-[14px] font-thin text-gray-600 rounded hover:bg-gray-300'><FaCircle className='text-yellow-500 transform scale-75' />&nbsp;Yellow</li>
              <li className='flex cursor-default items-center gap-1 p-2 pl-1 py-[5px] text-[14px] font-thin text-gray-600 rounded hover:bg-gray-300'><FaCircle className='text-green-500 transform scale-75'/>&nbsp;Green</li>
              <li className='flex cursor-default items-center gap-1 p-2 pl-1 py-[5px] text-[14px] font-thin text-gray-600 rounded hover:bg-gray-300'><FaCircle className='text-blue-600 transform scale-75' />&nbsp;Blue</li>
              <li className='flex cursor-default items-center gap-1 pl-1 py-[5px] text-[14px] p-2 font-thin text-gray-600 rounded  hover:bg-gray-300'><FaCircle className='text-purple-500 transform scale-75'/> &nbsp;Purple</li>
              <li className='flex cursor-default items-center gap-1 p-2 pl-1 py-[5px] text-[14px] font-thin text-gray-600 rounded hover:bg-gray-300'><FaCircle className='text-gray-500 transform scale-75' />&nbsp;Gray</li>
              <li className='flex cursor-default items-center gap-1 p-2 pl-1 py-[5px] text-[14px] font-thin text-gray-600 rounded hover:bg-gray-300'><TbCirclesRelation className='text-gray-500 transform scale-110'/>&nbsp;All Tags...</li>
            </ul>
          </div>
        </div>
      </div>
      <div className='flex ml-0 border rounded-br-lg bg-white' style={{ width: width-1, height: height }}>
        <div className='flex flex-col'>
          <Mycodes height={height} width={width} searchQuery={searchQuery} onEdit={onEdit} onMain={onMain}></Mycodes>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
