import React, { useState, useEffect } from 'react'; 
import { useDispatch , useSelector } from 'react-redux';
import { updateMenuName } from '@/redux/appName';
import { openPopupState, closePopupState } from '@/redux/popUp';
import { motion } from "framer-motion";

const Footer = () => {
  const [x, setX] = useState(10000);
  const [y, setY] = useState(10000);
  const [buttonSize, setButtonSize] = useState('48px');
  const [popups, setPopups] = useState([]);
  const dispatch = useDispatch();
  const apps = useSelector((state) => state.popUp.apps);
  
  const openPopup = (application) => {
    const id = Date.now(); 
    //setPopups([...popups, id]);
    dispatch(openPopupState({ id: id , application: application})); 
  };
  

  useEffect(() => {
    const scalefactor = (el) => {
      if (!el) return 1;
    
      let rect = el.getBoundingClientRect();
      let dx = Math.abs(x - (rect.left + rect.right)/2.0);
      let dy = Math.abs(y - (rect.top + rect.bottom)/2.0);
      let dist = Math.sqrt(dx ** 2 + dy ** 2);
      return Math.min(Math.max(1.0, (2.0 - (dist-20) / 120)), 2.0);
    };
    
    const size = (el) => {
      if (!el) return '48px';
    
      return String(Math.round(48 * scalefactor(el))) + 'px';
    };

    const scaleButtons = () => {
      const buttons = document.querySelectorAll('.scalable-button');
      buttons.forEach(button => {
        button.style.width = size(button);
        button.style.height = size(button);
      });
  
      setButtonSize(size(null));
    };
  
    scaleButtons();

    window.addEventListener('resize', scaleButtons);

    return () => {
      window.removeEventListener('resize', scaleButtons);
    };
  }, [x, y]);
  
  const handleMouseMove = (event) => {
    setX(event.clientX);
    setY(event.clientY);
  };
  
  const handleMouseLeave = () => {
    setX(10000);
    setY(10000);
  };

  const handleChangeMenuName = (name) => {
    dispatch(updateMenuName({ name }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center" >
      <footer onContextMenu={(e) => e.preventDefault()} className="dock fixed bg-[#858585] bg-opacity-40 bottom-1 p-2 mb-1 rounded-xl mx-auto w-auto shadow-2xl z-10 flex items-end border-double border border-gray-400" style={{ height: '65px' }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div id="hoverarea" className="flex items-end gap-x-4" style={{ height: '60px' }}>
        <button className="bg-[url('/finder.svg')] scalable-button bg-gray-500 text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("Finder");handleChangeMenuName('Finder');}}></button>
          <button className="bg-[url('/launchpadn.svg')] hover:filter hover:grayscale scalable-button text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("DangerModal"); handleChangeMenuName('Finder');}}></button>
          <button className="bg-[url('/favorities.svg')] scalable-button bg-gray-500 text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("Favorities"); handleChangeMenuName('Favorities');}}></button>
          <button className="bg-[url('/safari.svg')] scalable-button bg-gray-500 text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("CodeBrowser"); handleChangeMenuName('CodeBrowser');}}></button>
          <button className="bg-[url('/Mail.svg')] hover:filter hover:grayscale bg-cover scalable-button bg-gray-500 text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("DangerModal"); handleChangeMenuName('Finder');}}></button>
          <button className="bg-[url('/Maps.svg')] hover:filter hover:grayscale scalable-button text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("DangerModal"); handleChangeMenuName('Finder');}}></button>
          <button className="bg-[url('/apple-photos.svg')] hover:filter hover:grayscale scalable-button bg-gray-500 text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("DangerModal"); handleChangeMenuName('Finder');}}></button>
          <button className="bg-[url('/FaceTime.svg')] hover:filter hover:grayscale scalable-button bg-gray-500 text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("DangerModal"); handleChangeMenuName('Finder');}}></button>
          <button className="bg-[url('/Calenda.svg')] hover:filter hover:grayscale scalable-button text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("DangerModal"); handleChangeMenuName('Finder');}}></button>
          <button className="bg-[url('/apple-music.svg')] hover:filter hover:grayscale scalable-button bg-gray-500 text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("DangerModal"); handleChangeMenuName('Finder');}}></button>
          <button className="bg-[url('/contact.svg')] hover:filter hover:grayscale scalable-button text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("DangerModal"); handleChangeMenuName('Finder');}}></button>
          <button className="bg-[url('/Notes.svg')] hover:filter hover:grayscale scalable-button text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("DangerModal"); handleChangeMenuName('Finder');}}></button>
          <button className="bg-[url('/Reminders.svg')] hover:filter hover:grayscale scalable-button text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("DangerModal"); handleChangeMenuName('Finder');}}></button>
          <button className="bg-[url('/tv.svg')] hover:filter hover:grayscale scalable-button text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("DangerModal"); handleChangeMenuName('Finder');}}></button>
          <button className="bg-[url('/vscode.svg')] bg-cover scalable-button text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("Monaco");handleChangeMenuName('Monaco');}}></button>
          <button className="bg-[url('/fena.svg')] scalable-button text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }}  onClick={() => { openPopup("Terminal");handleChangeMenuName('Terminal');}}></button>         
          <button className="bg-[url('/AppStore.svg')] hover:filter hover:grayscale scalable-button text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("DangerModal"); handleChangeMenuName('Finder');}}></button>
          <button className="bg-[url('/System.svg')] hover:filter hover:grayscale scalable-button text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("DangerModal"); handleChangeMenuName('Finder');}}></button>
          <button className="bg-[#c5c2c2] text-white text-2xl font-bold rounded-xl pointer-events-none" style={{ width: 1.5, height: 45 }}></button>
          <button className="bg-[url('/Download.svg')] hover:filter hover:grayscale scalable-button text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("DangerModal"); handleChangeMenuName('Finder');}}></button>
          <button className="bg-[url('/trash.svg')] hover:filter hover:grayscale scalable-button text-white text-2xl hover:scale-105 font-bold rounded-xl" style={{ width: 50, height: 50 }} onClick={() => { openPopup("DangerModal"); handleChangeMenuName('Finder');}}></button>

        </div>
      </footer>
    </div>
  );
};

export default Footer;

/*
# Senin varlığını kontrol eden bir değişken
sen_varligin = True

# if koşuluyla kontrol edilen kod bloğu
if sen_varligin:
    print("Sen hayatımda olduğun sürece seni çok seviyorum")
*/

