import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery'; 
import 'jquery.terminal/css/jquery.terminal.min.css';
import 'jquery.terminal/js/jquery.terminal.min.js';
import { useDispatch} from 'react-redux';
import { updateMenuName } from '@/redux/appName';

const Terminal = ({ width, height }) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [time, setTime] = useState(getFormattedTime());
  const dispatch = useDispatch();
  const terminalRef = useRef(null);

  useEffect(() => {
    
    $(terminalRef.current).terminal(
      (command, term) => {
        
        if (command === 'whoami') {
          term.typing('echo', 50, 
            `Greetings, explorer of the digital realm. I am WebOS, the guardian of the web, your conduit to the infinite expanse of information and possibilities. Dare to venture further, and together, we shall unlock the mysteries of the digital universe.`);
        }
        else{
          term.error(`Wrong command`);
        }
        
      },
      {
        greetings:'Welcome to The WebOS\nPlease run "whoami" command to get more information.', 
        name: 'my_terminala',
        prompt: 'sh-3.2# ',
        css: {
          'background-color': 'white', 
          color: 'black' 
        }
      }
    );
  }, []);

  useEffect(() => {
    
    $(terminalRef.current).css({ width: width + 'px', height: (height - 3) + 'px' });
  }, [width, height]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    
    return () => clearInterval(interval);
  }, []);

  const handleClick = (name) => {
    dispatch(updateMenuName({ name }));
  };

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

  return (
    <div onClick={() => handleClick('Terminal')} className='rounded-b-xl border'
      ref={terminalRef}
      style={{
        width: 252,
        height: 108,
        padding: '1px',
        borderRadius: '5px',
        background: 'white',
        color: '#000',
      }}
    />
  );
};

export default Terminal;
