import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const MyCodes = ({ width, height, searchQuery, onEdit, onMain }) => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Yüklenme durumunu başlat
      try {
        const response = await axios.get(
          `api/codes`
        );
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false); // Yüklenme durumunu bitir
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = rows.filter(
        (row) =>
          row.name && row.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRows(filtered);
    } else {
      setFilteredRows(rows);
    }
  }, [searchQuery, rows]);

  const onDelete = async (id) => {
    try {
      await axios.delete(`api/codes/${id}`);
      toast.info("Code deleted successfully");
      // Fetch the updated list after deletion
      const response = await axios.get(
        `api/codes`
      );
      setRows(response.data);
    } catch (error) {
      console.error("Error deleting code:", error);
      toast.error("Failed to delete code");
    }
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-full w-[55vw]">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 border-2 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <div className="text-blue-500">Loading...</div>
      </div>
    </div>
    );
}

  return (
    <div
      style={{ width: width - 151, height: height }}
      className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg w-auto"
    >
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-[0.8rem] text-gray-500 bg-white border-b-[1px] cursor-default">
          <tr>
            <th scope="col" className="px-6 py-1 font-thin !text-left"></th>
            <th scope="col" className="pr-6 py-1 font-thin">
              Name
            </th>
            <th scope="col" className="px-6 font-thin text-center">
              Public
            </th>
            <th scope="col" className="px-6 font-thin">
              Category
            </th>
            <th scope="col" className="px-6 font-thin"></th>
            <th scope="col" className="px-6 font-thin">
              Language
            </th>
            <th
              scope="col"
              className="px-6 font-thin items-center justify-center text-center"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="mx-2">
          {filteredRows.map((row, index) => (
            <tr
              key={index}
              className="text-gray-700 odd:bg-white even:bg-slate-100 rounded-lg !mx-2 hover:bg-blue-600 hover:text-white cursor-pointer"
              onClick={() => onMain(row._id)}
            >
              <td className="font-xs text-gray-900 whitespace-nowrap flex justify-center items-center my-auto mx-auto">
                <Image
                  className="object-cover object-center border border-gray-300 shadow-sm p-[0.05rem] my-auto items-centerz"
                  src={row.photo}
                  width={12}
                  height={12}
                  alt={row.name}
                />
              </td>
              <td className="pr-6 whitespace-nowrap">{row.name}</td>
              <td className="px-6 flex justify-center pt-1">
                {row.isPublic ? "Yes" : "No"}
              </td>
              <td className="px-6 whitespace-nowrap" colSpan="2">
                {row.categories.join(", ")}
              </td>
              <td className="px-6 ">{row.language}</td>
              <td className="px-6">
                <div className="flex justify-center gap-4">
                  <div
                    className="flex items-center justify-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                    
                  >
                    <FiEdit2 />
                    <a
                      href="#"
                      className="font-medium  hover:underline hover:text-white cursor-pointer"
                      onClick={() => onEdit(row._id)}
                    >
                      Edit
                    </a>
                  </div>
                  <div
                    className="flex items-center justify-center gap-1 hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <AiOutlineDelete className="" />
                    <a
                      href="#"
                      className="font-medium text-red-500 hover:underline hover:text-white cursor-pointer"
                      onClick={() => onDelete(row._id)}
                    >
                      Delete
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyCodes;
