import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import profilePic from '../../public/codes.jpeg'
import { MdOutlinePreview } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
import { FaYoutube } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SiGithub } from "react-icons/si";
import Comments from './Comments';
import { MdFavorite } from 'react-icons/md';


const MainCodeContext = ({width, height}) => {
    const userImages = [
        "https://randomuser.me/api/portraits/men/1.jpg",
        "https://randomuser.me/api/portraits/women/2.jpg",
        "https://randomuser.me/api/portraits/men/3.jpg",
        "https://randomuser.me/api/portraits/women/4.jpg",
        "https://randomuser.me/api/portraits/men/5.jpg",
        "https://randomuser.me/api/portraits/men/1.jpg",
        "https://randomuser.me/api/portraits/women/2.jpg",
        "https://randomuser.me/api/portraits/men/3.jpg",
        "https://randomuser.me/api/portraits/women/4.jpg",
        "https://randomuser.me/api/portraits/men/5.jpg",
        "https://randomuser.me/api/portraits/women/6.jpg",
        "https://randomuser.me/api/portraits/men/7.jpg",
        "https://randomuser.me/api/portraits/women/8.jpg",
        "https://randomuser.me/api/portraits/men/9.jpg",
        "https://randomuser.me/api/portraits/women/10.jpg",
        "https://randomuser.me/api/portraits/men/11.jpg",
        "https://randomuser.me/api/portraits/women/12.jpg",
        "https://randomuser.me/api/portraits/men/13.jpg",
        "https://randomuser.me/api/portraits/women/14.jpg",
        "https://randomuser.me/api/portraits/men/15.jpg",
        "https://randomuser.me/api/portraits/women/16.jpg",
        "https://randomuser.me/api/portraits/men/17.jpg",
        "https://randomuser.me/api/portraits/women/18.jpg",
        "https://randomuser.me/api/portraits/men/19.jpg",
        "https://randomuser.me/api/portraits/women/20.jpg",
        "https://randomuser.me/api/portraits/men/21.jpg",
        "https://randomuser.me/api/portraits/women/22.jpg",
        "https://randomuser.me/api/portraits/men/23.jpg",
        "https://randomuser.me/api/portraits/women/24.jpg",
        "https://randomuser.me/api/portraits/men/25.jpg",
        "https://randomuser.me/api/portraits/women/26.jpg",
        "https://randomuser.me/api/portraits/men/27.jpg",
        "https://randomuser.me/api/portraits/women/28.jpg",
        "https://randomuser.me/api/portraits/men/29.jpg",
        "https://randomuser.me/api/portraits/women/30.jpg",
        "https://randomuser.me/api/portraits/men/31.jpg",
        "https://randomuser.me/api/portraits/women/32.jpg",
        "https://randomuser.me/api/portraits/men/33.jpg",
        "https://randomuser.me/api/portraits/women/34.jpg",
        "https://randomuser.me/api/portraits/men/35.jpg",
        "https://randomuser.me/api/portraits/women/36.jpg",
        "https://randomuser.me/api/portraits/men/37.jpg",
        "https://randomuser.me/api/portraits/women/38.jpg",
        "https://randomuser.me/api/portraits/men/1.jpg",
        "https://randomuser.me/api/portraits/women/2.jpg",
        "https://randomuser.me/api/portraits/men/3.jpg",
        "https://randomuser.me/api/portraits/women/4.jpg",
        "https://randomuser.me/api/portraits/men/5.jpg",
        "https://randomuser.me/api/portraits/women/6.jpg",
        "https://randomuser.me/api/portraits/men/7.jpg",
        "https://randomuser.me/api/portraits/women/8.jpg",
        "https://randomuser.me/api/portraits/men/9.jpg",
        "https://randomuser.me/api/portraits/women/10.jpg",
        "https://randomuser.me/api/portraits/men/11.jpg",
        "https://randomuser.me/api/portraits/women/12.jpg",
        "https://randomuser.me/api/portraits/men/13.jpg",
        "https://randomuser.me/api/portraits/women/14.jpg",
        "https://randomuser.me/api/portraits/men/15.jpg",
        "https://randomuser.me/api/portraits/women/16.jpg",
        "https://randomuser.me/api/portraits/men/17.jpg",
        "https://randomuser.me/api/portraits/women/18.jpg",
        "https://randomuser.me/api/portraits/men/19.jpg",
        "https://randomuser.me/api/portraits/women/20.jpg",
        "https://randomuser.me/api/portraits/men/21.jpg",
        "https://randomuser.me/api/portraits/women/22.jpg",
        "https://randomuser.me/api/portraits/men/23.jpg",
        "https://randomuser.me/api/portraits/women/24.jpg",
        "https://randomuser.me/api/portraits/men/25.jpg",
        "https://randomuser.me/api/portraits/women/26.jpg",
        "https://randomuser.me/api/portraits/men/27.jpg",
        "https://randomuser.me/api/portraits/women/28.jpg",
        "https://randomuser.me/api/portraits/men/29.jpg",
        "https://randomuser.me/api/portraits/women/30.jpg",
        "https://randomuser.me/api/portraits/men/31.jpg",
        "https://randomuser.me/api/portraits/women/32.jpg",
        "https://randomuser.me/api/portraits/men/33.jpg",
        "https://randomuser.me/api/portraits/women/34.jpg",
        "https://randomuser.me/api/portraits/men/35.jpg",
        "https://randomuser.me/api/portraits/women/36.jpg",
        "https://randomuser.me/api/portraits/men/37.jpg",
        "https://randomuser.me/api/portraits/women/38.jpg",
        "https://randomuser.me/api/portraits/men/1.jpg",
        "https://randomuser.me/api/portraits/women/2.jpg",
        "https://randomuser.me/api/portraits/men/3.jpg",
        "https://randomuser.me/api/portraits/women/4.jpg",
        "https://randomuser.me/api/portraits/men/5.jpg",
        "https://randomuser.me/api/portraits/women/6.jpg",
        "https://randomuser.me/api/portraits/men/7.jpg",
        "https://randomuser.me/api/portraits/women/8.jpg",
        "https://randomuser.me/api/portraits/men/9.jpg",
        "https://randomuser.me/api/portraits/women/10.jpg",
        "https://randomuser.me/api/portraits/men/11.jpg",
        "https://randomuser.me/api/portraits/women/12.jpg",
        "https://randomuser.me/api/portraits/men/13.jpg",
        "https://randomuser.me/api/portraits/women/14.jpg",
        "https://randomuser.me/api/portraits/men/15.jpg",
        "https://randomuser.me/api/portraits/women/16.jpg",
        "https://randomuser.me/api/portraits/men/17.jpg",
        "https://randomuser.me/api/portraits/women/18.jpg",
        "https://randomuser.me/api/portraits/men/19.jpg",
        "https://randomuser.me/api/portraits/women/20.jpg",
        "https://randomuser.me/api/portraits/men/21.jpg",
        "https://randomuser.me/api/portraits/women/22.jpg",
        "https://randomuser.me/api/portraits/men/23.jpg",
        "https://randomuser.me/api/portraits/women/24.jpg",
        "https://randomuser.me/api/portraits/men/25.jpg",
        "https://randomuser.me/api/portraits/women/26.jpg",
        "https://randomuser.me/api/portraits/men/27.jpg",
        "https://randomuser.me/api/portraits/women/28.jpg",
        "https://randomuser.me/api/portraits/men/29.jpg",
        "https://randomuser.me/api/portraits/women/30.jpg",
        "https://randomuser.me/api/portraits/men/31.jpg",
        "https://randomuser.me/api/portraits/women/32.jpg",
        "https://randomuser.me/api/portraits/men/33.jpg",
        "https://randomuser.me/api/portraits/women/34.jpg",
        "https://randomuser.me/api/portraits/men/35.jpg",
        "https://randomuser.me/api/portraits/women/36.jpg",
        "https://randomuser.me/api/portraits/men/37.jpg",
        "https://randomuser.me/api/portraits/women/38.jpg",
    ];




  return (
    <div 
    style={{width: width, height: height}}
    className='flex flex-col overflow-y-scroll'>
      <div className='flex my-6 gap-5 justify-between mx-5'>
        <div className='flex gap-5 justify-around'>
        <div className='flex '>
        <Image className='rounded-lg shadow-xl scale-110 border-gray-800 hover:scale-125 border p-1' src={profilePic} width={100} height={100} alt=''></Image>
        </div>
        <div className='flex flex-col gap-y-2 justify-between'>
            <div className='flex gap-x-3 items-center'>
                <h3 className='text-lg font-freeman font-semibold '>Finding Awesome Numbers</h3>
                <MdFavorite className="fill-red-500 scale-150 hover:scale-175 hover:animate-pulse hover:fill-slate-400" />
            </div>
            
            <h3 className='text-sm font-sans'>@leatherfire | 1 hour ago</h3>
            <div class="flex items-center">
                <svg class="w-4 h-4 text-yellow-400 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-400 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-400 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-400 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95</p>
                <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
            </div>
        </div>
        </div>
        <div className='flex flex-col gap-2 justify-between'>
            <div className='flex'>
            <h4 className='cursor-default'>Coding Language:&nbsp;</h4>
            <p className='text-red-600 font-medium cursor-default'>Python</p>
            </div>
            <div className='flex items-center gap-1 justify-between'>
            <div className='flex items-center gap-2'> 
                <FaRegCircleCheck className='fill-green-500' />
                <p className=' font-medium cursor-default'>Public</p>
            </div>
            <div className='flex items-center gap-2'>
                <MdOutlinePreview className='scale-150'/>
                <p className=' font-medium cursor-default'>1.5k views</p>
            </div>
            
            </div>
            <div className='flex items-center justify-center'>
            <div className='flex justify-center w-24 h-8  rounded-lg text-gray-600 border-[1px] backdrop-blur-sm border-gray-500 hover:border-gray-100 hover:scale-100 scale-90 transition-all shadow-lg hover:text-white hover:bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700 cursor-pointer hover:cursor-pointer'>
                <div className=' absolute w-3 h-3 bg-yellow-600 rounded-full top-[-0.15rem] right-[-0.15rem] border-[1px] hover:border-gray-100'>
                    <div className='animate-ping absolute w-3 h-3 -top-[0.1rem] -left-[0.05rem] bg-yellow-400 rounded-full'></div>
                </div>
                <button className='justify-center text-center font-medium' onClick={() => { openPopup("Output");}}>See Code</button>
            </div>
            </div>
        </div>
      </div>
      <div className='border-b-[2px] border-gray-400 mx-3 my-3 rounded-xl'></div>
      <div className='flex justify-between gap-5 mx-5 mb-3 overflow-y-auto'>
        <div className='flex flex-col text-left w-3/4 overflow-y-scroll'>
            <h2 className='cursor-default uppercase font-medium mb-1'>Description:</h2>
            <p className='text-sm text-black text-balance'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam natus saepe, ratione possimus ad et? Minus quod, eaque voluptatibus natus aspernatur provident dicta, ullam reprehenderit exercitationem voluptatum recusandae perspiciatis. Officia!
            Sed, sit id tempora eligendi facere temporibus tempore, quisquam rerum perspiciatis non mollitia! Repellendus nihil neque tempora, veniam eligendi voluptatem, deserunt sunt praesentium provident illo nesciunt quam natus, nostrum odit.
            Neque molestiae facere dolorum, consectetur nam repellendus perspiciatis maxime! Unde eos ratione vero ipsam error! Velit molestiae delectus nisi odio autem eius in! Ex similique dolorem facilis inventore placeat! Dolor.
            Dicta veniam perspiciatis, sed, est, nam reiciendis earum unde distinctio soluta commodi alias iusto. Culpa consequatur ratione veritatis nostrum esse at tempore ullam veniam amet! Incidunt iste ad ullam animi?
            Quo ex debitis consequuntur perferendis soluta amet fugit itaque veritatis nostrum eius maiores provident, est nemo beatae f Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti sit voluptas architecto vitae. Molestias voluptate dignissimos similique repellendus cumque voluptates temporibus aperiam consequuntur ipsum asperiores, sed quos officiis nihil impedit?
            Incidunt quasi consequatur recusandae deserunt! Vero, rem. Harum modi, molestias illum aliquam ea magnam architecto, ducimus soluta, eius eum molestiae sunt voluptate officiis dolores pariatur vero necessitatibus veritatis debitis. Culpa.
            Neque, magnam placeat. Quasi sint fugiat dolorum fugit. Aliquid explicabo, eum rerum doloremque non, tenetur perferendis dolorum, porro asperiores officia voluptate distinctio quis voluptatem illo. Quasi aliquid recusandae quis similique.
            Tempora ipsum, non nemo debitis quas maxime impedit quia error! Fuga veritatis maxime animi distinctio sint ullam doloremque, maiores doloribus quis assumenda adipisci, laborum sed a hic officiis sequi. Totam.
            Quaerat veniam dicta natus culpa officia magnam iste mollitia odit impedit, minus nisi in illo, neque provident modi. Similique, deserunt? Commodi dicta saepe repellat fugiat. Ullam nostrum doloremque enim consequuntur?
            Eius, enim! Aut blanditiis unde nostrum quibusdam! Vitae explicabo perspiciatis corporis necessitatibus accusantium vero iste cupiditate, illo optio, facere, cumque ullam pariatur quasi recusandae repudiandae assumenda tempora deserunt neque est!
            Non omnis officia quo numquam modi harum explicabo minus, culpa itaque deleniti ducimus accusantium ipsum iste est quibusdam blanditiis minima quisquam? Nulla tenetur accusantium mollitia distinctio neque tempore obcaecati ipsa?
            Temporibus unde ratione placeat culpa itaque possimus sed voluptate incidunt ipsa reiciendis non maxime quae sunt aperiam officiis vitae amet modi veritatis delectus ex, expedita ducimus voluptatem et. Id, expedita?
            Labore dolores hic fuga eius, neque aspernatur voluptatum cumque adipisci maxime. Doloremque, architecto ad mollitia ex aliquid quae placeat debitis rem dolore repudiandae minus officiis ratione reiciendis, assumenda nulla aut?
            Accusantium distinctio esse nihil repellendus sunt eius. Eaque exercitationem voluptates repudiandae modi id at incidunt! Recusandae autem in tempore error quibusdam ipsum, unde quia quae saepe reiciendis dolor rem numquam?</p>
            <div className='border-b-[2px] border-blue-500 my-2 mx-2 mr-5  mt-4 rounded-lg'></div>
            <div className='flex flex-col'>
                <div className='flex'>
                    <h2 className='cursor-default uppercase font-medium mb-2'>Contributors:</h2>
                </div>
            <div className='grid grid-cols-[repeat(15,1fr)] gap-2 auto-rows-max pl-1'>
                {userImages.map((image, index) => (
                    <div key={index}
                    style={{ width: '30px', height: '30px' }}
                    >
                        <Image className='rounded-lg hover:scale-110 transition-all' src={image} alt='' width={30} height={30}/>
                    </div>
                ))}
            </div>
            </div>
            <div className='border-b-[2px] border-blue-500 my-2 mx-2 mr-5  mt-4 rounded-lg'></div>
            <div className='flex flex-col'>
                <div className='flex'>
                    <h2 className='cursor-default uppercase font-medium mb-5'>Author:</h2>
                </div>
                <div className='flex gap-x-2 justify-start hover:bg-slate-50 rounded-xl'>
                    <div className='flex gap-5 justify justify-around'>
                        <div className='flex items-center'>
                            <Image src="https://randomuser.me/api/portraits/men/81.jpg" alt='' width={400} height={400} className='object-cover object-fit rounded-full border-[2px] border-gray-600 shadow-md hover:scale-110 ml-2 hover:border-double' />
                        </div>
                        <div className='flex flex-col justify-between'>
                            <div className='flex flex-col'>
                                <h2 className='cursor-default font-semibold font-freeman'>Yiğitcan Uçar</h2>
                                <h3 className='inline cursor-default text-xs text-gray-700 mb-1 hover:text-black hover:cursor-pointer hover:underline'>@leatherfire</h3>
                                <p className='cursor-default text-wrap'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea obcaecati voluptate doloribus impedit voluptatem fugiat natus voluptates repudiandae quo blanditiis, iste nesciunt laudantium iusto, ratione quis non eligendi amet molestias.</p>
                            </div >
                            <div className='flex mt-2 gap-5 mb-2'>
                            <BiWorld className='fill-slate-400 hover:fill-black hover:cursor-pointer scale-150'/>
                            <FaYoutube className='fill-slate-400 hover:fill-black hover:cursor-pointer scale-150'/>
                            <AiFillInstagram className='fill-slate-400 hover:fill-black hover:cursor-pointer scale-150'/>
                            <SiGithub className='fill-slate-400 hover:fill-black hover:cursor-pointer scale-150'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-b-[2px] border-blue-500 my-2 mx-2 mr-5  mt-4 rounded-lg'></div>

            <div className='flex flex-col'>
                <div className='flex'> 
                    <h2 className='cursor-default uppercase font-medium mb-5'>Comments:</h2>
                </div>

                <div className='flex justify-center'>
                    <Comments/>
                </div>
            </div>
                
        </div>
        <div className='flex flex-col overflow-y-scroll'>
            <div className='flex flex-col text-center font-medium'>
                Categories
                
                <nav className='flex mt-2 font-thin mx-auto'>
                    <ul className='flex flex-col gap-1'>
                        <li className='border px-1 hover:bg-blue-600 hover:text-white cursor-default rounded-md'>Artificle İntellingent</li>
                        <li className='border px-1 hover:bg-blue-600 hover:text-white cursor-default rounded-md'>Math Function</li>
                        <li className='border px-1 hover:bg-blue-600 hover:text-white cursor-default rounded-md'>Web Development</li>
                    </ul>
                </nav>
            </div>
            <div className='border-b-[2px] border-blue-500 my-2  mt-4 rounded-lg'></div>
            <div className='flex flex-col text-center font-medium justify-center'>
                Resources
                <nav className='flex mt-2 font-thin text-center mx-auto'>
                    <ul className='flex flex-col gap-1 text-center'>
                        <li className='border px-1 hover:bg-blue-600 hover:text-white cursor-default rounded-md'>MarketPlace</li>
                        <li className='border px-1 hover:bg-blue-600 hover:text-white cursor-default rounded-md'>ChatGPT API</li>
                        <li className='border px-1 hover:bg-blue-600 hover:text-white cursor-default rounded-md'>Claude 3.7</li>
                        <li className='border px-1 hover:bg-blue-600 hover:text-white cursor-default rounded-md'>OpenAI API</li>
                        <li className='border px-1 hover:bg-blue-600 hover:text-white cursor-default rounded-md'>HuggingFace</li>
                        <li className='border px-1 hover:bg-blue-600 hover:text-white cursor-default rounded-md'>StackOverflow</li>
                        <li className='border px-1 hover:bg-blue-600 hover:text-white cursor-default rounded-md'>GitHub</li>
                        <li className='border px-1 hover:bg-blue-600 hover:text-white cursor-default rounded-md'>StackBlitz</li>
                    </ul>
                </nav>
            </div>
            <div className='border-b-[2px] border-blue-500 my-2 mt-4 rounded-lg'></div>
            <div className='flex flex-col text-center font-medium justify-center'>
                More Info
                <nav className='flex mt-2 font-thin text-center mx-auto'>
                    <ul className='flex flex-col gap-1 text-center'>
                        <li className=' px-1 cursor-default rounded-md font-medium underline'>Published at :</li>
                        <li className=' px-1 cursor-default rounded-md text-xs text-wrap'>
                        2016-09-10, 23:28:56</li>
                        <li className=' px-1 cursor-default rounded-md font-medium underline'>Last Released :</li>
                        <li className=' px-1 cursor-default rounded-md text-xs text-wrap'>
                        2024-05-09, 21:24:16</li>
                        <li className=' px-1 cursor-default rounded-md font-medium underline'>Last Updated :</li>
                        <li className=' px-1 cursor-default rounded-md text-xs text-wrap'>
                            2024-05-10, 10:55:02</li>
                        <li className=' px-1 cursor-default rounded-md font-medium underline'>Identifier :</li>
                        <li className=' px-1 cursor-default rounded-md text-xs text-wrap'>
                        com.pkief.finding.awesome.numbers</li>
                    </ul>
                </nav>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MainCodeContext
