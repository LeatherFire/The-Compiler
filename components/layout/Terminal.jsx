import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery'; 
import 'jquery.terminal/css/jquery.terminal.min.css';
import 'jquery.terminal/js/jquery.terminal.min.js';
import { useDispatch} from 'react-redux';
import { updateMenuName } from '@/redux/appName';

const Terminal = ({ width, height,user }) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [time, setTime] = useState(getFormattedTime());
  const dispatch = useDispatch();
  const terminalRef = useRef(null);

  useEffect(() => {
    
    $(terminalRef.current).terminal(
      (command, term) => {
        
        if (command !== '') {
          term.echo(`You typed: ${command}`);
        }
      },
      {
        greetings: `Last login: ${time} on ttys003`, 
        name: 'my_terminala',
        prompt: `(base) ${user.username}e@${user.name}-MacBook-Pro ~ % `,
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
    console.log(name);
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
        width: width + 'px',
        height: height + 'px',
        overflow: 'auto',
        padding: '1px',
        borderRadius: '10px',
        background: 'white',
        color: '#000'
      }}
    />
  );
};

export default Terminal;
