import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { IoFolderOpenSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { openPopupState } from "@/redux/popUp";
import CodeEditor from "./CodeEditor";
import { FaCode } from "react-icons/fa6";
import { updateZIndex } from "@/redux/zindex";
import Ripples from "react-ripples";
import ModalUpdate from "./ModalUpdate"; // ModalUpdate bileşenini ekleyin
import { toast } from "react-toastify";

const PopupEditor = ({ id, onClose, onExecute }) => {
  const [size, setSize] = useState({ width: 800, height: 500 });
  const [position, setPosition] = useState({ x: 170, y: 150 });
  const [suitLanguages, setSuitLanguages] = useState(false);
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.popUp.apps);
  const application = useSelector((state) => state.popUp.application);
  const isOpen = useSelector((state) => state.popUp.isOpen);
  const zindex = useSelector((state) => state.zindex.zindex);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [languge, setLanguge] = useState("Code Lang");
  const [code, setCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const openPopup = (application) => {
    const id = Date.now();
    dispatch(openPopupState({ id: id, application: application })); 

  };

  useEffect(() => {
    if (languge.toLocaleLowerCase() === "python" || languge.toLowerCase() === "javascript" || languge.toLowerCase() === "c" || languge.toLowerCase() === "c++") {
      setSuitLanguages(true);
    }else{
      setSuitLanguages(false);
    }
  }, [languge]);

  const handleDragStop = (e, d) => {
    if (d.x < 10) {
      d.x = 10;
    }
    if (d.x > 200) {
      d.x = 200;
    }
    if (d.y < 40) {
      d.y = 40;
    }
    if (d.y > 600) {
      d.y = 600;
    }
    setPosition({ x: d.x, y: d.y });
    dispatch(openPopupState({ size, position: { x: d.x, y: d.y } }));
    dispatch(updateZIndex({ name: "codeEditor" }));
  };

  const handleClick = (name) => {
    dispatch(updateZIndex({ name }));
  };

  const Tooltip = ({ message, visible }) => {
    return (
      <div
        className={`absolute top-[-5.5rem] right-0 left-[-4.5rem] bg-gray-700 text-white text-xs rounded py-1 px-2 z-50 ${
          visible ? "block" : "hidden"
        }`}
      >
        {message}
      </div>
    );
  };

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

  const handleCodeChange = (newCode) => {
    setCode(newCode); // CodeEditor'dan gelen kodu sakla
  };

  const handleSaveUpdate = () => {
    if (code && languge !== "Code Lang") {
      setIsModalOpen(true); // ModalUpdate'i aç
    } else {
      toast.error("Please enter code and select language");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // ModalUpdate'i kapat
  };

  return (
    <>
      <Rnd
        onMouseDown={() => handleClick("codeEditor")}
        onClick={() => handleClick("codeEditor")}
        style={{ zIndex: zindex["codeEditor"] }}
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
        <div
          className="handle items-center border-b-[1px] border-gray-400 flex justify-between rounded-t-xl backdrop-blur-lg titlebar font-bold bg-gray-100 bg-opacity-80 pr-2"
          style={{ height: "40px", width: "100%" }}
          id="titlebar"
        >
          <div className="buttons gap-0.5 items-center flex justify-between mb-1 !pl-[1.1rem] ">
            <div className="close hover:shadow-2xl shadow-red-600 hover:scale-125">
              <a
                className="closebutton hover:shadow-2xl shadow-red-600"
                onClick={() => onClose(id)}
              >
                <span>
                  <strong>x</strong>
                </span>
              </a>
            </div>
            <div className="minimize hover:scale-125">
              <a className="minimizebutton" href="#">
                <span>
                  <strong>&ndash;</strong>
                </span>
              </a>
            </div>
            <div className="zoom hover:scale-125">
              <a className="zoombutton" href="#">
                <span>
                  <strong>+</strong>
                </span>
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <p className="leatherfire flex-shrink-0 pt-1 text-gray-700 font-mono text-[9pt] items-center flex gap-1 justify-center">
              <span className="icon-wrapper2 shadow-2xl">
                <FaCode className="hover:shadow-2xl transform scale-150 gap-1 items-center" />
              </span>
              &nbsp;Visual Studio Code Editor
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div
                className="relative justify-center w-24 h-8 rounded-lg text-gray-600 border-[1px] backdrop-blur-sm border-gray-500 hover:border-gray-100 hover:scale-100 scale-90 transition-all shadow-md hover:text-white hover:bg-gradient-to-br from-red-400 via-red-500 to-red-700 cursor-pointer"
                onClick={toggleMenu}
              >
                <div className="absolute w-3 h-3 bg-red-600 rounded-full top-[-0.15rem] right-[-0.15rem] border-[1px] hover:border-gray-100">
                  <div className="animate-ping absolute w-3 h-3 bg-red-400 rounded-full"></div>
                </div>
                <button className="justify-center text-center !text-[0.85rem] mt-[0.35rem]">
                  {languge[0].toUpperCase() + languge.slice(1)}
                </button>
              </div>

              {isMenuOpen && (
                <div className="absolute -top-[7.5rem] z-[999] mt-2 w-32 -left-[1.1rem] rounded-md bg-white shadow-lg border border-gray-200 overflow-y-scroll max-h-[6.7rem]">
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => {
                      toggleMenu();
                      setLanguge("python");
                    }}
                  >
                    Python
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => {
                      toggleMenu();
                      setLanguge("javascript");
                    }}
                  >
                    JavaScript
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => {
                      toggleMenu();
                      setLanguge("c");
                    }}
                  >
                    C
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => {
                      toggleMenu();
                      setLanguge("c++");
                    }}
                  >
                    C++
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => {
                      toggleMenu();
                      setLanguge("java");
                    }}
                  >
                    Java
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => {
                      toggleMenu();
                      setLanguge("GOLANG");
                    }}
                  >
                    GOLANG
                  </button>
                  <button
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => {
                      toggleMenu();
                      setLanguge("json");
                    }}
                  >
                    JSON
                  </button>
                </div>
              )}
            </div>
            <div className="relative justify-center w-24 h-8 rounded-lg text-gray-600 border-[1px] backdrop-blur-sm border-gray-500 hover:border-gray-100 hover:scale-100 scale-90 transition-all shadow-md hover:text-white hover:bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 cursor-pointer">
              <div className=" absolute w-3 h-3 bg-blue-600 rounded-full top-[-0.15rem] right-[-0.15rem] border-[1px] hover:border-gray-100">
                <div className="animate-ping absolute w-3 h-3 bg-blue-400 rounded-full"></div>
              </div>
              <button
                className="justify-center text-center !text-[0.85rem] mt-[0.35rem]"
                onClick={handleSaveUpdate}
              >
                Save/Update
              </button>
            </div>
            <div
              className={`relative justify-center w-24 h-8 rounded-lg text-gray-600 border-[1px] backdrop-blur-sm border-gray-500 ${
                suitLanguages
                  ? "hover:border-gray-100 hover:scale-100"
                  : " opacity-50"
              } scale-90 transition-all shadow-md ${
                suitLanguages
                  ? "hover:text-white hover:bg-gradient-to-br from-green-400 via-green-500 to-green-700"
                  : "bg-gray-300"
              }`}
              onMouseEnter={() => !suitLanguages && setTooltipVisible(true)}
              onMouseLeave={() => !suitLanguages && setTooltipVisible(false)}
            >
              <Tooltip
                message="This button is enabled only if the code is written in the Python, C, C++ and JavaScript language."
                visible={tooltipVisible}
              />
              <div
                className={`absolute w-3 h-3 ${
                  suitLanguages ? "bg-green-600" : "bg-gray-500"
                } rounded-full top-[-0.15rem] right-[-0.15rem] border-[1px] ${
                  suitLanguages ? "hover:border-gray-100" : ""
                }`}
              >
                {suitLanguages && (
                  <div className="animate-ping absolute w-3 h-3 bg-green-400 rounded-full"></div>
                )}
              </div>
              <button
                className="justify-center text-center !text-[0.85rem] mt-[0.35rem]"
                onClick={() => onExecute({ code, languge })}
                disabled={!suitLanguages}
              >
                Run
              </button>
            </div>
          </div>
        </div>
        <div
          className="flex rounded-b-xl border pt-1"
          style={{ width: "100%", height: "100%", background: "white" }}
        >
          {/* Popup içeriği */}
          <CodeEditor
            className=""
            width={size.width}
            height={size.height}
            languge={languge}
            onCodeChange={handleCodeChange}
          />
        </div>
      </Rnd>
      {isModalOpen && (
        <ModalUpdate
          id={id}
          onClose={handleCloseModal}
          code={code}
          languge={languge}
        />
      )}
    </>
  );
};

export default PopupEditor;
