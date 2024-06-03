import React, { useEffect, useState } from "react";
import Image from "next/image";
import profilePic from "../../../public/defaultprofile.webp";
import { MdOutlinePreview } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
import { FaYoutube } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { SiGithub } from "react-icons/si";
import Comments from "../Comments";
import { MdFavorite } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { FaFacebookSquare } from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';

import axios from "axios";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg
        key={`full-${i}`}
        className="w-4 h-4 text-yellow-400 me-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    );
  }

  for (let i = 0; i < halfStars; i++) {
    stars.push(
      <svg
        key={`half-${i}`}
        className="w-4 h-4 text-yellow-400 me-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M11 0l2.735 5.536 6.115.888L15.824 11.1l1.017 5.928L11 13.743l-5.841 3.286 1.017-5.928L.15 6.424l6.115-.888L11 0z" />
      </svg>
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg
        key={`empty-${i}`}
        className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    );
  }

  return stars;
};

const MainCodeContext = ({ width, height, codeData, contributors,onEdit }) => {
  const [timeAgo, setTimeAgo] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  const formatResource = (resource) => {
    return resource
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleFavoriteToggle = async () => {
    setIsFavorite(!isFavorite);
    try {
      if (isFavorite) {
        await axios.delete("/api/favorites", {
          data: { codeId: codeData._id },
        });
      } else {
        await axios.post("/api/favorites", { codeId: codeData._id });
      }

    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  useEffect(() => {
    if (codeData && codeData.createdAt) {
      const createdDate = new Date(codeData.createdAt);
      const timeAgo = formatDistanceToNow(createdDate, { addSuffix: true });
      setTimeAgo(timeAgo);
    }

    // Kullanıcı bilgilerini almak için API çağrısı
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`/api/users/${codeData.user_id}`);
        if (response.data) {
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    if (codeData && codeData.user_id) {
      fetchUserInfo();
    }
  }, [codeData]);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const response = await axios.get("/api/favorites");
        if (response.data.some((fav) => fav._id === codeData._id)) {
          setIsFavorite(true);
        }
      } catch (error) {
        console.error("Error checking favorites:", error);
      }
    };
  
    checkFavorite();
  
    // viewCount'u arttırmak için API çağrısı
    const incrementViewCount = async () => {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/viewcount/${codeData._id}`);
      } catch (error) {
        console.error("Error incrementing view count:", error);
      }
    };
  
    if (codeData && codeData._id) {
      incrementViewCount();
    }
  }, [codeData]);
  

  return (
    <div
      style={{ width: width, height: height }}
      className="flex flex-col overflow-y-scroll"
    >
      <div className="flex my-6 gap-5 justify-between mx-5">
        <div className="flex gap-5 justify-around">
          <div className="flex ">
            <Image
              className="rounded-lg shadow-xl scale-110 border-gray-800 hover:scale-125 border p-1"
              src={codeData.photo}
              width={100}
              height={100}
              alt=""
            ></Image>
          </div>
          <div className="flex flex-col gap-y-2 justify-between">
            <div className="flex gap-x-3 items-center">
              <h3 className="text-lg font-freeman font-semibold ">
                {codeData.name}
              </h3>
              <MdFavorite
                className={`fill-${
                  isFavorite ? "red-500" : "slate-400"
                } scale-150 hover:scale-175 hover:animate-pulse hover:fill-slate-400`}
                onClick={handleFavoriteToggle}
              />
            </div>

            <h3 className="text-sm font-sans">
              @{codeData.nickname} | {timeAgo}
            </h3>
            <div className="flex items-center">
              {renderStars(codeData.rating)}
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                {codeData.rating}
              </p>
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                out of
              </p>
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                5
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-between">
          <div className="flex">
            <h4 className="cursor-default">Coding Language:&nbsp;</h4>
            <p className="text-red-600 font-medium cursor-default">
              {codeData.language}
            </p>
          </div>
          <div className="flex items-center gap-3 justify-between">
            <div className="flex items-center gap-2">
              {codeData.isPublic ? (
                <>
                  <FaRegCircleCheck className="fill-green-500" />
                  <p className=" font-medium cursor-default">Public</p>
                </>
              ) : (
                <>
                  <MdOutlinePrivacyTip className="fill-blue-600" />{" "}
                  {/* Burada çarpı ikonunu kullan */}
                  <p className=" font-medium cursor-default">Private</p>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <MdOutlinePreview className="scale-150" />
              <p className=" font-medium cursor-default">
                {codeData.viewCount} views
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex justify-center w-24 h-8  rounded-lg text-gray-600 border-[1px] backdrop-blur-sm border-gray-500 hover:border-gray-100 hover:scale-100 scale-90 transition-all shadow-lg hover:text-white hover:bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700 cursor-pointer hover:cursor-pointer">
              <div className=" absolute w-3 h-3 bg-yellow-600 rounded-full top-[-0.15rem] right-[-0.15rem] border-[1px] hover:border-gray-100">
                <div className="animate-ping absolute w-3 h-3 -top-[0.1rem] -left-[0.05rem] bg-yellow-400 rounded-full"></div>
              </div>
              <button
                className="justify-center text-center font-medium"
                onClick={() => onEdit(codeData._id)}
              >
                See Code
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-[2px] border-gray-400 mx-3 my-3 rounded-xl"></div>
      <div className="flex justify-between gap-5 mx-5 mb-3 overflow-y-auto">
        <div className="flex flex-col text-left w-3/4 overflow-y-scroll">
          <h2 className="cursor-default uppercase font-medium mb-1">
            Description:
          </h2>
          <ReactMarkdown className="text-sm text-black">
        {codeData.description}
      </ReactMarkdown>
          <div className="border-b-[2px] border-blue-500 my-2 mx-2 mr-5  mt-4 rounded-lg"></div>
          <div className="flex flex-col">
            <div className="flex">
              <h2 className="cursor-default uppercase font-medium mb-2">
                Contributors:
              </h2>
            </div>
            <div className="grid grid-cols-[repeat(15,1fr)] gap-2 auto-rows-max pl-1">
              {contributors.map((contributor, index) => (
                <div key={index} style={{ width: "30px", height: "30px" }}>
                  <Image
                    className="rounded-lg hover:scale-110 transition-all"
                    src={contributor.profilePhoto}
                    alt={contributor.username}
                    width={30}
                    height={30}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="border-b-[2px] border-blue-500 my-2 mx-2 mr-5  mt-4 rounded-lg"></div>
          <div className="flex flex-col">
            <div className="flex">
              <h2 className="cursor-default uppercase font-medium mb-5">
                Author:
              </h2>
            </div>
            <div className="flex gap-x-2 justify-start hover:bg-slate-50 rounded-xl">
              <div className="flex gap-5 justify justify-around">
                <div className="flex items-center">
                <Image
                    src={userInfo.profilePhoto || profilePic} 
                    alt=""
                    width={100}
                    height={100}
                    className="object-cover object-fit rounded-full border-[2px] border-gray-600 shadow-md hover:scale-110 ml-2 hover:border-double"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col">
                    <h2 className="cursor-default font-semibold font-freeman">
                      {userInfo.name} {userInfo.surname}
                    </h2>
                    <h3 className="inline cursor-default text-xs text-gray-700 mb-1 hover:text-black hover:cursor-pointer hover:underline">
                      @{codeData.nickname}
                    </h3>
                    <p className="cursor-default text-wrap">{userInfo.bio}</p>
                  </div>
                  <div className="flex mt-2 gap-5 mb-2">
                    {userInfo.links?.website && (
                      <a
                        href={userInfo.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BiWorld className="fill-slate-400 hover:fill-black hover:cursor-pointer scale-150" />
                      </a>
                    )}
                    {userInfo.links?.youtube && (
                      <a
                        href={userInfo.links.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaYoutube className="fill-slate-400 hover:fill-black hover:cursor-pointer scale-150" />
                      </a>
                    )}
                    {userInfo.links?.instagram && (
                      <a
                        href={userInfo.links.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <AiFillInstagram className="fill-slate-400 hover:fill-black hover:cursor-pointer scale-150" />
                      </a>
                    )}
                    {userInfo.links?.github && (
                      <a
                        href={userInfo.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SiGithub className="fill-slate-400 hover:fill-black hover:cursor-pointer scale-150" />
                      </a>
                    )}
                    {userInfo.links?.linkedin && (
                      <a
                        href={userInfo.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="fill-slate-400 hover:fill-black hover:cursor-pointer scale-150" />
                      </a>
                    )}
                    {userInfo.links?.twitter && (
                      <a
                        href={userInfo.links.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaSquareXTwitter className="fill-slate-400 hover:fill-black hover:cursor-pointer scale-150" />
                      </a>
                    )}
                    {userInfo.links?.facebook && (
                      <a
                        href={userInfo.links.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebookSquare className="fill-slate-400 hover:fill-black hover:cursor-pointer scale-150" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b-[2px] border-blue-500 my-2 mx-2 mr-5  mt-4 rounded-lg"></div>

          <div className="flex flex-col">
            <div className="flex">
              <h2 className="cursor-default uppercase font-medium mb-5">
                Comments:
              </h2>
            </div>

            <div className="flex justify-center">
              <Comments />
            </div>
          </div>
        </div>
        <div className="flex flex-col overflow-y-scroll">
          <div className="flex flex-col text-center font-medium">
            Categories
            <nav className="flex mt-2 font-thin mx-auto">
              <ul className="flex flex-col gap-1">
                {codeData.categories.map((category, index) => (
                  <li
                    key={index}
                    className="border px-1 hover:bg-blue-600 hover:text-white cursor-default rounded-md"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="border-b-[2px] border-blue-500 my-2  mt-4 rounded-lg"></div>
          <div className="flex flex-col text-center font-medium justify-center">
            Resources
            <nav className="flex mt-2 font-thin text-center mx-auto">
              <ul className="flex flex-col gap-1 text-center">
                {codeData.resources.map((resource, index) => (
                  <li
                    key={index}
                    className="border px-1 hover:bg-blue-600 hover:text-white cursor-default rounded-md"
                  >
                    {formatResource(resource)}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="border-b-[2px] border-blue-500 my-2 mt-4 rounded-lg"></div>
          <div className="flex flex-col text-center font-medium justify-center">
            More Info
            <nav className="flex mt-2 font-thin text-center mx-auto">
              <ul className="flex flex-col gap-1 text-center">
                <li className=" px-1 cursor-default rounded-md font-medium underline">
                  Published at :
                </li>
                <li className=" px-1 cursor-default rounded-md text-xs text-wrap">
                  {codeData.createdAt}
                </li>
                <li className=" px-1 cursor-default rounded-md font-medium underline">
                  Last Released :
                </li>
                <li className=" px-1 cursor-default rounded-md text-xs text-wrap">
                  {codeData.updatedAt}
                </li>
                <li className=" px-1 cursor-default rounded-md font-medium underline">
                  Last Updated :
                </li>
                <li className=" px-1 cursor-default rounded-md text-xs text-wrap">
                  {codeData.updatedAt}
                </li>
                <li className=" px-1 cursor-default rounded-md font-medium underline">
                  Identifier :
                </li>
                <li className=" px-1 cursor-default rounded-md text-xs text-wrap">
                  {codeData.identifier}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCodeContext;
