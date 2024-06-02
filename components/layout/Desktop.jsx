import React, { useState, useRef, useEffect } from "react";
import Footer from "@/components/layout/Footer";
import MenuBar from "@/components/layout/MenuBar";
import RightClickMenu from "@/components/layout/RightClickMenu";
import MenuBarPopUp from "@/components/layout/MenuBarPopUp"; // MenuBarPopUp bileşenini ekledik
import { useDispatch, useSelector } from "react-redux";
import { updateItemPosition } from "../../redux/menuSlice";
import { updateMenuName } from "@/redux/appName";
import Popup from "./Popup";
import PopupFile from "./PopUpFile";
import PopupOutput from "./PopupOutput";
import { openPopupState, closePopupState } from "@/redux/popUp";
import PopupEditor from "./PopUpEditor";
import { AnimatePresence, motion } from "framer-motion";
import PopupFavorities from "./PopupFavorities";
import Modal from "./Modal";
import ModalUpdate from "./ModalUpdate";
import TheMainCode from "./TheMainCode";
import CodeBrowserOutput from "./CodeBrowserOutput";
import { getSession } from "next-auth/react";
import PopupEditorid from "./idPopUpFile/PopUpEditorid";
import TheMainCodeid from "./idMainCode/TheMainCodeid";

const Desktop = ({ user }) => {
  const [editId, setEditId] = useState(null); // Edit ID'sini saklayacak state
  const [outputId, setOutputId] = useState(null);
  const [mainCodeId, setMainCodeId] = useState(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const contextMenuRef = useRef(null);
  const MenuBarPopUpRef = useRef(null); // Ref'i oluşturduk
  const MenuBarRef = useRef(null);
  const FooterRef = useRef(null);
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.popUp.apps);
  const appName = useSelector((state) => state.appName.name);

  const handleClickOutside2 = (e) => {
    const popupElement = document.getElementById("popup");

    if (popupElement && !popupElement.contains(e.target)) {
      dispatch(updateMenuName({ name: "Finder" }));
    } else if (!popupElement) {
      dispatch(updateMenuName({ name: "Finder" }));
    } else {
      //dispatch(updateMenuName({ name: 'appName' }));
    }
  };

  useEffect(() => {
    // Tüm belgeye tıklama olayı ekleyin
    document.addEventListener("click", handleClickOutside2);
    return () => {
      // Component kaldırıldığında olay dinleyicisini temizleyin
      document.removeEventListener("click", handleClickOutside2);
    };
  }, []);

  const openPopup = (application, id) => {
    const appId = Date.now();
    dispatch(openPopupState({ id: appId, application: application }));
    if (id) {
      setEditId(id); // Edit ID'sini sakla
      setMainCodeId(id);
      setOutputId(id);
    }
  };

  const closePopup = (id) => {
    //setPopups(popups.filter(popupId => popupId !== id));
    dispatch(closePopupState({ id: id }));
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowContextMenu(true);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleCloseMenu = () => {
    setShowContextMenu(false);
  };

  const handleMenuBarClick = (e) => {
    e.stopPropagation();
  };

  const handleClickOutside = (e) => {
    if (
      !MenuBarPopUpRef.current?.contains(e.target) &&
      !contextMenuRef.current?.contains(e.target) &&
      !MenuBarRef.current?.contains(e.target) &&
      e.clientY < window.innerHeight - 73
    ) {
      setShowContextMenu(false);
      dispatch(updateItemPosition({ id: "", x: 0, y: 0, isOn: false }));
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showContextMenu]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 2,
      }}
    >
      <div
        className="desktop overflow-y-hidden"
        style={{
          backgroundImage: 'url("")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          position: "relative",
        }}
        onContextMenu={handleContextMenu}
      >
        {/* Video overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0)", // Burada overlay rengini ayarlayabilirsiniz
            zIndex: -1, // Arkaplanın altında olması için z-index'i düşük bir değer yapın
          }}
        />

        {/* Video elementi */}
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover", // Videoyu ekran boyutuna sığdırmak için
            zIndex: -2, // Arkaplanın altında olması için z-index'i daha düşük bir değer yapın
          }}
        >
          <source
            src="https://assets.codepen.io/3364143/7btrrd.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div ref={MenuBarRef} onClick={handleMenuBarClick}>
          <MenuBar />
        </div>
        <div ref={FooterRef}>
          <Footer />
        </div>
        <div ref={MenuBarPopUpRef}>
          <MenuBarPopUp />
        </div>

        {showContextMenu && (
          <div ref={contextMenuRef}>
            <RightClickMenu
              x={contextMenuPosition.x}
              y={contextMenuPosition.y}
              onClose={handleCloseMenu}
            />
          </div>
        )}
        {Object.keys(apps).map((appName) =>
          apps[appName].map((id) => (
            <React.Fragment key={id}>
              {appName === "Terminal" && (
                <Popup key={id} id={id} onClose={closePopup} user={user} />
              )}
              {appName === "Monaco" && (
                <PopupEditor
                  key={id}
                  id={id}
                  onClose={closePopup}
                  onExecute={(id) => {
                    setOutputId(id);
                    openPopup("Output", id);
                  }}
                />
              )}
              {appName === "Finder" && (
                <PopupFile
                  key={id}
                  id={id}
                  onClose={closePopup}
                  user={user}
                  onEdit={(id) => {
                    setEditId(id); // Edit ID'sini sakla
                    openPopup("MonacoId", id); // Popup'ı aç
                  }}
                  onMain={(id) => {
                    setMainCodeId(id);
                    openPopup("TheMainCodeId", id);
                  }}
                />
              )}
              {appName === "Output" && (
                <PopupOutput
                  key={id}
                  id={id}
                  onClose={closePopup}
                  codeId={outputId}
                  user={user}
                />
              )}
              {appName === "Favorities" && (
                <PopupFavorities
                  key={id}
                  id={id}
                  onClose={closePopup}
                  onMain={(id) => {
                    setMainCodeId(id);
                    openPopup("TheMainCodeId", id);
                  }}
                />
              )}
              {appName === "DangerModal" && (
                <Modal key={id} id={id} onClose={closePopup} />
              )}
              {appName === "ModalUpdate" && (
                <ModalUpdate key={id} id={id} onClose={closePopup} />
              )}
              {appName === "TheMainCode" && (
                <TheMainCode key={id} id={id} onClose={closePopup} />
              )}
              {appName === "CodeBrowser" && (
                <CodeBrowserOutput
                  key={id}
                  id={id}
                  onClose={closePopup}
                  onMain={(id) => {
                    setMainCodeId(id);
                    openPopup("TheMainCodeId", id);
                  }}
                />
              )}
              {appName === "MonacoId" && (
                <PopupEditorid
                  key={id}
                  id={id}
                  onClose={closePopup}
                  user={user}
                  codeId={editId}
                  onExecute={(id) => {
                    setOutputId(id);
                    openPopup("Output", id);
                  }}
                />
              )}
              {appName === "TheMainCodeId" && (
                <TheMainCodeid
                  key={id}
                  id={id}
                  onClose={closePopup}
                  user={user}
                  codeId={mainCodeId}
                  onEdit={(id) => {
                    setEditId(id); // Edit ID'sini sakla
                    openPopup("MonacoId", id); // Popup'ı aç
                  }}
                />
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Desktop;
