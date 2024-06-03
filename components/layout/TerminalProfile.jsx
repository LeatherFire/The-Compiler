import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'jquery.terminal/css/jquery.terminal.min.css';
import 'jquery.terminal/js/jquery.terminal.min.js';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData2 } from '@/redux/UserDataSlice';
import { signOut } from "next-auth/react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import bcrypt from 'bcryptjs';

const TerminalProfile = ({ width, height,user }) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dispatch = useDispatch();
  const reduxdata = useSelector((state) => state.UserReducer);
  const [time, setTime] = useState(getFormattedTime());
  const terminalRef = useRef(null);
  const [started, setStarted] = useState(false);
  const router = useRouter();
  
  
  const initialUserData = {
    username: user.username || '',
    name: user.name || '',
    surname: user.surname || '',
    email: user.email || '',
    password: '********',
    job: user.job || '',
    city: user.city || '',
    country: user.country || '',
    phone: user.phone || '',
    hobbies: user.hobbies || '',
    bio: user.bio || '',
    links: {
      github: user.links?.github || '',
      linkedIn: user.links?.linkedin || '',
      twitter: user.links?.twitter || '',
      facebook: user.links?.facebook || '',
      instagram: user.links?.instagram || '',
      website: user.links?.website || '',
      youTube: user.links?.youtube || '',
    }
  };

  const [userData, setUserData] = useState(initialUserData);

  const userDataRef = useRef(userData);

  useEffect(() => {
    userDataRef.current = userData;
  }, [userData]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [getFormattedTime]);
  
  useEffect(() => {
    const terminal = $(terminalRef.current);
  
    terminal.terminal((command, term) => {
      if (command === 'my_profile' && !started) {
        setStarted(true);
        startLoadingAnimation(term);
        setTimeout(() => startAnimation(term, 0), 11000);
      } else if (command === 'logout') {
        term.echo('Logging out...');
        setTimeout(() => {
          term.echo('[[;red;]Redirecting to login page...]');
          toast.success('Redirecting to login page...', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          signOut({ redirect: false });
          setTimeout(() => {
            router.push('/welcome');
          }, 1000);
        }, 1000);
      } else if (command === 'progress') {
        showLoadingAnimation(term);
      } else if (command.startsWith('score ')) {
        const identifier = command.split(' ')[1];
        const rating = parseFloat(command.split(' ')[2]);
  
        if (isNaN(rating) || rating < 0 || rating > 5) {
          term.echo('Invalid rating. Please provide a number between 0 and 5.');
        } else {
          axios.post(`${process.env.NEXT_PUBLIC_API_URL}/score`, { identifier, rating })
            .then(response => {
              term.echo(`Rating updated successfully: ${response.data.rating}`);
            })
            .catch(error => {
              term.echo(`Error updating rating: ${error.response ? error.response.data.message : error.message}`);
            });
        }
      } else if (command === 'homepage') {
        term.echo('Redirecting to homepage...');
        toast.info('Redirecting to homepage...', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          router.push('/');
        }, 1000);
      } else if (command === 'help') {
        startHelping(term, 0);
      } else if (command.startsWith('Update')) {
        try {
          updateUserData(term, command);
        } catch (error) {
          term.error(error.message);
        }
      } else {
        term.typing('echo', 20, `Command not recognized: ${command}`);
      }
    }, {
      greetings: () => `Current time is: ${time} on this shell\nPlease type 'help' for more information.`,
      name: 'my_terminala',
      prompt: `(base) ${user.username || ''}@${user.name || ''}-MacBook-Pro ~ % `, // Burada varsayılan değerler ekledim
      css: {
        'background-color': 'white',
        color: 'black'
      }
    });
  }, [router, showLoadingAnimation, startAnimation, started, time, updateUserData, user.username, user.name]);
  
  

  useEffect(() => {
    $(terminalRef.current).css({ width: width + 'px', height: (height - 3) + 'px' });
  }, [width, height]);

  function startLoadingAnimation(term) {
    term.typing('echo', 20, 'Data fetching from the System of WebOS...');
    setTimeout(() => showLoadingAnimation(term), 800);
  }

  function showLoadingAnimation(term) {
    const size = 30;
    let percent = 0;
    const prompt = term.get_prompt();
    term.set_prompt(progress(percent, size));

    const timer = setInterval(() => {
      percent += 1;
      term.set_prompt(progress(percent, size));
      if (percent >= 100) {
        clearInterval(timer);
        term.echo(progress(percent, size) + ' [[b;green;]OK]').set_prompt(prompt);
      }
    }, 100);
  }

  const formatLinksAndEmails = (text) => {
    // Email ve linkleri düz metin olarak işleyin
    return text.replace(/(https?:\/\/[^\s]+)/g, (match) => {
      return match.replace(/(https?:\/\/)/, '');
    }).replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, (email) => {
      return email; // Email adreslerini değiştirmeden düz metin olarak bırak
    });
  };

  function startAnimation(term, step) {
    const newUser = userDataRef.current;
    const userDataKeys = Object.keys(newUser);
    if (step < userDataKeys.length) {
      const key = userDataKeys[step];
      let currentStep = newUser[key];
      if ( currentStep !== null) {
        currentStep = JSON.stringify(currentStep, null, 2);
        currentStep = formatLinksAndEmails(currentStep); // Linkleri düz metin yap
      } else if (typeof currentStep === 'string') {
        currentStep = formatLinksAndEmails(currentStep);
      }
      term.typing('echo', 50, `${key} ==> ${currentStep}`, () => {
        startAnimation(term, step + 1);
      });
    } else {
      term.set_prompt('(base) leatherfire@Yigit-MacBook-Pro ~ % ');
      setStarted(false);
    }
  }

  function startHelping(term, step) {
    const steps = [
      { command: 'my_profile', response: '==> Displays your profile.' },
      { command: 'Update <field> <value>', response: '==> Updates the specified field with the provided value.' },
      { command: 'score <identifier> <rating>', response: '==> Updates the rating of the specified identifier.' },
      { command: 'clear', response: '==> Clears the terminal.' },
      { command: 'help', response: '==> Displays available commands.' },
      { command: 'logout', response: '==> Logs out of the profile.' },
      { command: 'homepage', response: '==> Redirects to the homepage.' },
    ];

    if (step < steps.length) {
      const currentStep = steps[step];
      term.typing('echo', 50, `${currentStep.command}:`, () => {
        term.typing('echo', 50, currentStep.response, () => {
          startHelping(term, step + 1);
        });
      });
    } else {
      term.set_prompt('(base) leatherfire@Yigit-MacBook-Pro ~ % ');
    }
  }

  function parseUpdateCommand(command) {
    const parts = command.split(' ');
    const field = parts[0].replace('Update', '').toLowerCase();
    const value = parts.slice(1).join(' ');
  
    const validFields = [
      'name','username', 'surname', 'email', 'password', 'job', 'city', 'country', 
      'phone', 'hobbies', 'bio', 'github', 'linkedin', 'twitter', 
      'facebook', 'instagram', 'website', 'youtube'
    ];
  
    if (!validFields.includes(field)) {
      throw new Error('Invalid field');
    }
  
    return { field, value };
  }
  
  async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  
  function updateUserData(term, command) {
    try {
      const { field, value } = parseUpdateCommand(command);
      const newData = { ...userDataRef.current };
  
      if (field === 'password') {
        if (!validatePassword(value, term)) {
          return; // Şifre uygun değilse işlemi durdur
        }
        hashPassword(value).then((hashedPassword) => {
          newData[field] = hashedPassword;
          sendDataToAPI(term, newData);
        }).catch(error => {
          term.echo(`Error hashing password: ${error.message}`);
        });
      } else {
        newData[field] = value;
        if (field !== 'password') {
          delete newData.password; // Şifre değiştirilmiyorsa password alanını sil
        }
        sendDataToAPI(term, newData);
      }
    } catch (error) {
      term.echo(error.message);
    }
  }
  
  
  async function sendDataToAPI(term, newData) {
    try {
  
      const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`);
      const userId = userResponse.data._id;
      const newStateData = { ...newData, password: '********' };
  
      const updateResponse = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, newData);
      
      setUserData(newStateData);
      
      // Terminale API'den dönen mesajı yazdır
      term.echo(`User data updated successfully`);
    } catch (error) {
      console.error("Error updating user data: ", error);
      term.echo(`Failed to update user data: ${error.response ? error.response.data.message : error.message}`);
    }
  }

  function validatePassword(password, term) {
    if (password.length < 8) {
      term.echo("Password must be at least 8 characters long");
      toast.warning("Password must be at least 8 characters long");
      return false;
    }
  
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharacters.test(password)) {
      term.echo("Password must contain at least one special character");
      toast.warning("Password must contain at least one special character");
      return false;
    }
  
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    if (!uppercase.test(password) || !lowercase.test(password)) {
      term.echo("Password must contain at least one uppercase letter and one lowercase letter");
      toast.warning("Password must contain at least one uppercase letter and one lowercase letter");
      return false;
    }
  
    return true;
  }
  
  
  
  

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

  function progress(percent, width) {
    const size = Math.round(width * percent / 100);
    let taken = '='.repeat(size).replace(/=$/, '>');
    let left = ' '.repeat(width - size);
    return '[' + taken + left + '] ' + percent + '%';
  }

  return (
    <div className='rounded-b-xl'
      ref={terminalRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        overflow: 'auto',
        padding: '1px',
        background: 'white',
        color: '#000'
      }}
    />
  );
};

export default TerminalProfile;
