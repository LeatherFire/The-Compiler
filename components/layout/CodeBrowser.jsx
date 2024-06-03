import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { openPopupState } from "@/redux/popUp";
import axios from "axios";
import { toast } from "react-toastify";

const CodeBrowser = ({ width, height, onMain }) => {
  const categoryButtonRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [gridCols, setGridCols] = useState("grid-cols-5");
  const [left, setLeft] = useState("-left-[5rem]");
  const [margin, setMargin] = useState("mt-1");
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState("All Categories");
  const [categoryList, setCategoryList] = useState([]); // Kategori listesini tutacak state
  const [allCodes, setAllCodes] = useState([]);
  const [filteredCodes, setFilteredCodes] = useState([]);
  const [listing, setListing] = useState({
    top_rated: false,
    most_viewed: false,
    most_commented: false,
  });
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const changeListing = (list_id) => {
    let sortedCodes = [...filteredCodes];

    if (list_id === "top_rated") {
      sortedCodes.sort((a, b) => b.rating - a.rating);
    } else if (list_id === "most_viewed") {
      sortedCodes.sort((a, b) => b.viewCount - a.viewCount);
    }

    setCodes(sortedCodes);
    setListing({
      top_rated: list_id === "top_rated",
      most_viewed: list_id === "most_viewed",
      most_commented: list_id === "most_commented",
    });
  };

  const filterByCategory = (category) => {
    let filtered = allCodes;
    if (category !== "All Categories") {
      filtered = allCodes.filter((code) => code.categories.includes(category));
    }
    setFilteredCodes(filtered);
    setCodes(filtered); // Also update the codes to the filtered list initially
    setCategories(category);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
    if (!isMenuOpen && categoryButtonRef.current) {
      const rect = categoryButtonRef.current.getBoundingClientRect();
      setModalPosition({ left: rect.left, top: rect.bottom });
    }
  };

  const openPopup = (application) => {
    const id = Date.now();
    dispatch(openPopupState({ id: id, application: application })); // Doğru payload yapısını kullanın
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `api/category`
        );
        setCategoryList(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Grid kolon sayısını hesaplama
    const calculateGridCols = (width) => {
      if (width <= 826) return "grid-cols-5";
      if (width > 826 && width <= 1000) return "grid-cols-6";
      if (width > 1000 && width <= 1200) return "grid-cols-8";
      if (width > 1200 && width <= 1300) return "grid-cols-10";
      if (width > 1300 && width <= 1400) return "grid-cols-10";
      if (width > 1400) {
        setMargin("");
        setLeft("-left-[3.8rem]");
        return "grid-cols-10";
      }
      return "grid-cols-3"; // Varsayılan
    };

    // Genişliğe göre grid kolon sayısını güncelle
    setGridCols(calculateGridCols(width));
  }, [width]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `api/codes/allcodes`
        );
        setAllCodes(response.data);
        setFilteredCodes(response.data); // Initially set filtered codes to all codes
        setCodes(response.data); // Initially set codes to all codes
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderImages = () => {
    return codes.map((code, index) => (
      <div className="relative flex justify-center" key={index}>
        <div className="group relative w-full" onClick={() => onMain(code._id)}>
          <Image
            src={code.photo}
            alt={`Code ${index}`}
            width={300}
            height={300}
            layout="responsive"
            className="rounded-lg shadow-2xl transition-transform group-hover:scale-110 cursor-pointer"
          />
          <div className="absolute cursor-pointer bottom-0 left-0 right-0 rounded-lg bg-gray-800 bg-opacity-50 text-white text-center opacity-0 group-hover:opacity-100 scale-110 transition-opacity w-full h-full">
            <div className="flex flex-col justify-between items-center mx-auto my-auto relative w-full h-full">
              <h1 className="p-2 font-freeman font-semibold">{code.name}</h1>
              <p className={`${margin} my-auto`}>{code.language}</p>
              <p className="absolute bottom-0 left-0 w-full text-xs px-2 py-1 truncate hover:underline cursor-pointer">
                @{code.nickname}
              </p>
            </div>
          </div>
        </div>
      </div>
    ));
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
      className="flex justify-center flex-col relative"
      style={{ width: width, height: height }}
    >
      <div className="flex items-center justify-center mx-auto pt-4 pb-1 flex-wrap bg-transparent absolute top-0 w-full">
        <div className="w-full flex mx-auto"></div>
        <button
          type="button"
          className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3"
          onClick={toggleMenu}
          ref={categoryButtonRef}
        >
          {categories}
        </button>

        {isMenuOpen && (
          <div className="absolute top-14 left-[4.5rem] z-10 justify-center mt-2 w-52 rounded-md bg-white shadow-lg border border-gray-200 overflow-y-scroll max-h-[15rem]">
            {categoryList.map((category, index) => (
              <button
                key={index}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => {
                  toggleMenu();
                  filterByCategory(category.name);
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
        <button
          type="button"
          className={`text-gray-900 border border-white hover:border-gray-200 bg-gray-500 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 ${
            listing.top_rated !== true && "bg-white"
          }`}
          onClick={() => changeListing("top_rated")} // Butona tıklandığında changeListing fonksiyonunu çağır
        >
          Top Rated
        </button>
        <button
          type="button"
          className={`text-gray-900 border border-white hover:border-gray-200 bg-gray-500 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 ${
            listing.most_viewed !== true && "bg-white"
          }`}
          onClick={() => changeListing("most_viewed")} // Butona tıklandığında changeListing fonksiyonunu çağır
        >
          Most Viewed
        </button>
        <button
          type="button"
          className={`text-gray-900 border border-white hover:border-gray-200 bg-gray-500 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 ${
            listing.most_commented !== true && "bg-white"
          }`}
          onClick={() => changeListing("most_commented")} // Butona tıklandığında changeListing fonksiyonunu çağır
        >
          Most Commented
        </button>
      </div>
      <div
        className={`grid ${gridCols} gap-4 overflow-x-scroll p-3 mb-2 mt-16`}
      >
        {" "}
        {/* mt-16 eklendi */}
        {renderImages()}
      </div>
    </div>
  );
};

export default CodeBrowser;
