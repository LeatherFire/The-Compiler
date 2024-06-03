// Popup.jsx

import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { IoFolderOpenSharp } from "react-icons/io5";
import FileExplorer from "./FileExplorer";
import { useDispatch, useSelector } from "react-redux";
import { openPopupState } from "@/redux/popUp";
import CodeEditor from "./CodeEditor";
import { motion } from "framer-motion";
import { updateZIndex } from "@/redux/zindex";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { CiGrid41 } from "react-icons/ci";
import { IoListOutline } from "react-icons/io5";
import { TbColumns3 } from "react-icons/tb";
import { PiTextColumns } from "react-icons/pi";
import { CiViewColumn } from "react-icons/ci";

const PopupFile = ({ id, onClose, user, onEdit,onMain }) => {
  const [size, setSize] = useState({ width: 1000, height: 450 });
  const [position, setPosition] = useState({ x: 210, y: 180 });
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.popUp.apps);
  const application = useSelector((state) => state.popUp.application);
  const isOpen = useSelector((state) => state.popUp.isOpen);
  const zindex = useSelector((state) => state.zindex.zindex);
  const currentfile = useSelector(
    (state) => state.fileManager.currentDirectory
  );
  const [abc, setAbc] = useState("root");
  const [isBig, setIsBig] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDragStop = (e, d) => {
    if (d.x < -300) {
      d.x = -300;
    }
    if (d.x > 1300) {
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
    dispatch(updateZIndex({ name: "fileexplorer" }));
  };

  const handleClick = (name) => {
    dispatch(updateZIndex({ name }));
  };
  useEffect(() => {
    // currentfile'dan son / karakterinden sonraki kısmı al
    let fileName;
    if (currentfile === "/") {
      fileName = user.username;
    } else {
      fileName = currentfile.substring(currentfile.lastIndexOf("/") + 1);
    }
    // abc değişkenine atama yap
    setAbc(fileName);
  }, [currentfile, user]);


  const makeLitter = () => {
    if(!isBig){
      setSize({ width: window.innerWidth-3, height: window.innerHeight-163});
      setPosition({ x: 1, y: 37 });
    }else{
      setSize({ width: 1000, height: 450 });
      setPosition({ x: 210, y: 180 });
    }
    setIsBig(!isBig);
  }
  const handleResize = (e, direction, ref, delta, position) => {
    setSize({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });
    dispatch(
      openPopupState({
        size: { width: ref.offsetWidth, height: ref.offsetHeight },
        position,
      })
    );
  };

  return (
    <Rnd
      onMouseDown={() => handleClick("fileexplorer")}
      onClick={() => handleClick("fileexplorer")}
      style={{ zIndex: zindex["fileexplorer"] }}
      id="popup"
      size={size}
      position={position}
      onDragStop={handleDragStop}
      onResize={handleResize}
      minWidth={800}
      minHeight={200}
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
      <div
        className="handle items-center border justify-between rounded-t-xl titlebar font-bold bg-transparent "
        style={{ height: "50px", width: "100%" }}
        id="titlebar"
      >
        <div className="fileexpbar shadow-2xl rounded-tl-lg border-r border-gray-400 absolute h-[50px] w-[151px] -z-[1]">
          &nbsp;
        </div>
        <div
          className="bg-gray-100 translate-x-[151px] rounded-tr-lg absolute h-[50px] -z-[1]"
          style={{ width: "calc(100% - 151px)" }}
        >
          &nbsp;
        </div>
        <div className="buttons gap-0.5 items-center flex mt-3 z-[999]">
          &nbsp;&nbsp;
          <div className="close hover:shadow-2xl shadow-red-600">
            <a
              className="closebutton hover:shadow-2xl shadow-red-600"
              onClick={() => onClose(id)}
            >
              <span>
                <strong>x</strong>
              </span>
            </a>
          </div>
          <div className="minimize">
            <a className="minimizebutton" href="#">
              <span>
                <strong>&ndash;</strong>
              </span>
            </a>
          </div>
          <div className="zoom" onClick={() => makeLitter()}>
            <a className="zoombutton" href="#">
              <span>
                <strong>+</strong>
              </span>
            </a>
          </div>
        </div>
        <div className="flex justify-normal ">
          <span className="ml-24 transform scale-200 flex-shrink-0 pt-1 text-gray-400 font-mono text-[9pt] items-center flex gap-1 justify-center hover:text-gray-700">
            <IoIosArrowBack />
          </span>
          <span className="ml-6 transform scale-200  flex-shrink-0 pt-1 text-gray-400 font-mono text-[9pt] items-center flex gap-1 justify-center hover:text-gray-700">
            <IoIosArrowForward />
          </span>
          <p className="ml-4 leatherfire  flex-shrink-0 pt-1 text-gray-600 text-[12pt] items-center flex justify-center">
            {abc}
          </p>
          <div className="ml-96 fixed truncate transform scale-200 mt-3 flex-shrink-0 pt-1 font-mono text-[9pt] items-center flex gap-1 justify-center">
            <ul className="flex gap-2 hover:bg-gray-200 items-center justify-center rounded h-[13px] w-20">
              <li className="hover:bg-gray-300 rounded">
                <CiGrid41 />
              </li>
              <li className="hover:bg-gray-300 rounded">
                <IoListOutline />
              </li>
              <li className="hover:bg-gray-300 rounded">
                <CiViewColumn className="transform scale-100" />
              </li>
              <li className="hover:bg-gray-300 rounded">
                <PiTextColumns />
              </li>
            </ul>
          </div>
          <div className="flex ml-96">
            <form className="max-w-md mx-auto mt-1">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only "
              >
                Search
              </label>
              <div className="relative">
                <div className="justify-end absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="mt-1 justify-end block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-300 focus:border-blue-300 "
                  value={searchQuery}
                  onChange={handleSearch}
                  required
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className="rounded-b-xl border"
        style={{ width: "100%", height: "100%" }}
      >
        {/* Popup içeriği */}
        {
          <FileExplorer
            width={size.width}
            height={size.height}
            searchQuery={searchQuery}
            onEdit={onEdit}
            onMain={onMain}
          />
        }
      </div>
    </Rnd>
  );
};

export default PopupFile;
