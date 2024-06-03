import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery'; 
import 'jquery.terminal/css/jquery.terminal.min.css';
import 'jquery.terminal/js/jquery.terminal.min.js';
import { useDispatch } from 'react-redux';
import { updateMenuName } from '@/redux/appName';
import axios from 'axios';

const TerminalOutput = ({ width, height, codeId, user }) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [time, setTime] = useState(getFormattedTime());
  const dispatch = useDispatch();
  const terminalRef = useRef(null);

  useEffect(() => {
    $(terminalRef.current).terminal(
      async (command, term) => {
        if (command === 'run') {
          try {
            term.pause(); // Terminali geçici olarak duraklat
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/executeCode`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ code: codeId.code, language: codeId.languge }),
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let done = false;

            while (!done) {
              const { value, done: readerDone } = await reader.read();
              done = readerDone;
              const chunk = decoder.decode(value);
              term.echo(chunk);
            }

            term.resume(); // Terminali tekrar başlat
          } catch (error) {
            term.error(error.response ? error.response.data.error : error.message);
          }
        }else if (command === 'help') {
          term.echo('Commands:');
          term.echo('run: Run the code');
          term.echo('clear: Clear the terminal');
          term.echo('help: Show this help message');
          term.echo('exit: Exit the terminal');
          term.echo('if you change this code please restart terminal');
          term.echo('This terminal only support Python, JavaScript, C, and C++');
        }
         else {
          term.echo('Command not found');
        }
      },
      {
        greetings: `If you want to help please run 'help' command.\nIf you want to code please run 'run' command. \nIf you want to clear terminal please run 'clear' command.\nIf you change this code please restart terminal.\nThis terminal only support Python, JavaScript, C, and C++.\n\n\nLast login: ${time} on ttys003`,
        name: 'my_terminala',
        prompt: `(base) ${user.username}@${user.name}-MacBook-Pro ~ % `,
        css: {
          'background-color': 'white',
          color: 'black'
        }
      }
    );
  }, [codeId.languge, time]);

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
    <div onClick={() => handleClick('Terminal')} className='rounded-b-xl'
      ref={terminalRef}
      style={{
        width: width + 'px',
        height: height + 'px',
        overflow: 'auto',
        padding: '1px',
        background: 'white',
        color: '#000'
      }}
    />
  );
};

export default TerminalOutput;
