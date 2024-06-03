import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdFavorite } from "react-icons/md";
import { IoLogoJavascript } from "react-icons/io5";
import { TiHtml5 } from "react-icons/ti";
import { FaPython, FaGolang, FaJava } from "react-icons/fa";
import { SiSwift } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { openPopupState, closePopupState } from "@/redux/popUp";
import { TbBrandCpp } from "react-icons/tb";
import { updateMenuName } from "@/redux/appName";
import { SiContao } from "react-icons/si";
import { BiLogoGoLang } from "react-icons/bi";
import { BsFiletypeJson } from "react-icons/bs";
import axios from "axios";

const Favorites = ({ width, height,onMain }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`api/favorites`);
        const iconMapping = {
          javascript: IoLogoJavascript,
          python: FaPython,
          java: FaJava,
          "c++": TbBrandCpp,
          c: SiContao,
          golang: BiLogoGoLang,
          json: BsFiletypeJson,
        };

        const favoritesWithIcons = response.data.map((favorite) => ({
          ...favorite,
          icon:
            iconMapping[favorite.language.toLowerCase()] || IoLogoJavascript,
        }));

        setFavorites(favoritesWithIcons);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleChangeMenuName = (name) => {
    dispatch(updateMenuName({ name }));
  };

  const openPopup = (application) => {
    const id = Date.now();
    dispatch(openPopupState({ id: id, application: application }));
  };

  const handleFavoriteClick = async (favoriteId) => {
    try {
      await axios.delete(`api/favorites`, {
        data: { codeId: favoriteId }
      });
      
      // Favoriyi güncelleme
      const updatedFavorites = favorites.filter((favorite) => favorite._id !== favoriteId);
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };
  
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 border-2 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <div className="text-blue-500">Loading...</div>
      </div>
    </div>
    );
  }

  return (
    <div
      className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border"
      style={{
        width: width + "px",
        height: height + "px",
        overflow: "auto",
        padding: "1px",
        background: "white",
        color: "#000",
      }}
    >
      <nav className="flex flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        {favorites.map((favorite, index) => (
          <div
            key={index}
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start cursor-pointer hover:bg-slate-200"
            onClick={() => onMain(favorite._id)}
          >
            <div className="grid mr-4 place-items-center">
              <Image
                alt={favorite.name}
                src={favorite.photo}
                className="relative inline-block h-12 w-12 rounded-full object-cover object-center"
                width={48}
                height={48}
              />
            </div>
            <div>
              <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                {favorite.name}
              </h6>
              <div className="flex justify items-center gap-2">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                  @{favorite.nickname}
                </p>
                <span className="ml-3 !cursor-pointer">
                  {React.createElement(favorite.icon, {
                    className: `fill-slate-400 hover:fill-black hover:cursor-pointer ${
                      favorite.language.toLowerCase() === "golang"
                        ? "scale-200 hover:scale-[2.5]"
                        : "scale-125 hover:scale-140"
                    }  hover:animate-pulse`,
                  })}
                </span>
              </div>
            </div>
            <div className="ml-auto" onClick={(e) => e.stopPropagation()}>
              <span onClick={() => handleFavoriteClick(favorite._id)}>
                <MdFavorite
                  className={`scale-150  hover:scale-175 hover:animate-pulse fill-red-500 hover:fill-slate-400`}
                />
              </span>
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Favorites;
