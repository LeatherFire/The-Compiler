import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { data } from "autoprefixer";

const ModalUpdate = ({ id, onClose, code, languge, codeInfo }) => {
  const { data: session, status } = useSession();
  const [codeName, setCodeName] = useState(codeInfo.name);
  const [language, setLanguage] = useState(languge.toLowerCase());
  const [category, setCategory] = useState(codeInfo.categories || "");
  const [resources, setResources] = useState(codeInfo.resources || []);
  const [isPublic, setIsPublic] = useState(codeInfo.isPublic);
  const [image, setImage] = useState(codeInfo.photo);
  const [contributors, setContributors] = useState(codeInfo.contributors);
  const [description, setDescription] = useState(codeInfo.description);
  const [currentCode, setCurrentCode] = useState(code);
  const [categoryList, setCategoryList] = useState([]); // Kategori listesini tutacak state
  const [identifier, setIdentifier] = useState(codeInfo.identifier);

  useEffect(() => {
    if (code) {
      setCurrentCode(code);
    }
  }, [code]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description) {
      toast.error("Description is required");
      return false;
    }
    if (!codeName) {
      toast.error("Code Name is required");
      return false;
    }

    if (!image) {
      toast.error("Image is required");
      return false;
    }

    // Form verilerini gönder
    const formData = {
      name: codeName,
      language,
      categories: category,
      isPublic,
      photo: image,
      identifier,
      contributors: contributors, // contributors zaten bir dizi olduğu için split gerekmez
      description,
      resources, // resources'ı formData'ya ekle
      content: currentCode, // currentCode'yi formData'ya ekle
    };


    try {
      await axios.put(
        `api/codes/${codeInfo._id}`,
        formData
      );

      toast.success("Code saved/updated successfully!");
    } catch (error) {
      console.error("Error saving/updating code:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized: Please log in.");
      } else {
        toast.error("Failed to save/update code.");
      }
    }

    // Formun kapatılmasını sağla ve verileri temizle
    setCodeName("");
    setLanguage("");
    setCategory("");
    setIsPublic(false);
    setImage(null);
    setIdentifier("");
    setContributors("");
    setDescription("");
    setResources([]); // resources'ı temizle

    // 3 saniye sonra modalı kapat
    setTimeout(() => {
      onClose(id);
    }, 3000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = document.createElement("img"); // Tarayıcıdaki img elementini kullanıyoruz
        img.src = event.target.result;

        img.onload = () => {
          if (img.width !== img.height) {
            toast.error("Image must be square (equal width and height).");
            setImage(null);
          } else {
            setImage(event.target.result);
          }
        };
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-50 rounded-lg w-1/3 mx-auto h-[auto] max-h-[80vh] flex flex-col shadow-2xl cursor-default px-0">
        <div className="border-b-[1px] bg-gray-200 border-gray-300 flex justify-start w-full rounded-t-lg backdrop-blur-xl">
          <div className="flex justify-start items-center gap-x-2 ml-2 py-2">
            <div className="hover:scale-110 transition-all w-[0.9rem] h-[0.9rem] bg-red-500 border-[1px] border-red-600 rounded-full pb-[0.1rem] items-center text-center text-gray-800 justify-center flex text-xs shadow-xl">
              <span
                className="opacity-0 absolute hover:opacity-100"
                onClick={() => onClose(id)}
              >
                x
              </span>
            </div>
            <div className="hover:scale-110 transition-all w-[0.9rem] h-[0.9rem] bg-yellow-500 border-[1px] border-yellow-600 rounded-full pb-[0.1rem] items-center text-center text-gray-800 justify-center flex shadow-xl">
              <span className="opacity-0 absolute hover:opacity-100">
                &ndash;
              </span>
            </div>
            <div className="hover:scale-110 transition-all w-[0.9rem] h-[0.9rem] bg-green-500 border-[1px] border-green-600 rounded-full pb-[0.1rem] items-center text-center text-gray-800 justify-center flex shadow-xl">
              <span className="opacity-0 absolute hover:opacity-100">+</span>
            </div>
          </div>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Save/Update Your Code&#39;s
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm max-h-[80vh] overflow-y-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="codeName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Code Name:
              </label>
              <div className="mt-2">
                <input
                  id="codeName"
                  name="codeName"
                  type="text"
                  value={codeName}
                  onChange={(e) => setCodeName(e.target.value)}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="language"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Language:
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
                required
                disabled
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="c++">C++</option>
                <option value="c">C</option>
                <option value="GOLANG">GOLANG</option>
                <option value="json">JSON</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category:
              </label>
              <select
                id="category"
                multiple={false}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 p-2 border rounded-md w-full"
                required
              >
                <option value="">Select Category</option>
                {categoryList.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="resources"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Resources:
              </label>
              <select
                id="resources"
                multiple={true}
                value={resources}
                onChange={(e) => {
                  const selectedOptions = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  setResources(selectedOptions);
                }}
                className="mt-1 p-2 border rounded-md w-full"
                required
              >
                <option value="chatgpt4">ChatGPT-4</option>
                <option value="wikipedia">Wikipedia</option>
                <option value="stackoverflow">Stack Overflow</option>
                <option value="mdn">MDN Web Docs</option>
                <option value="geeksforgeeks">GeeksforGeeks</option>
                <option value="tutorialspoint">TutorialsPoint</option>
                <option value="coursera">Coursera</option>
                <option value="edx">edX</option>
                <option value="khanacademy">Khan Academy</option>
                <option value="udemy">Udemy</option>
                <option value="codecademy">Codecademy</option>
                <option value="freecodecamp">freeCodeCamp</option>
                <option value="medium">Medium</option>
                <option value="devto">Dev.to</option>
                <option value="github">GitHub</option>
                <option value="gitlab">GitLab</option>
                <option value="bitbucket">Bitbucket</option>
                <option value="reddit">Reddit</option>
                <option value="quora">Quora</option>
                <option value="hackerrank">HackerRank</option>
                <option value="leetcode">LeetCode</option>
                <option value="pluralsight">Pluralsight</option>
                <option value="linkedinlearning">LinkedIn Learning</option>
                <option value="packt">Packt</option>
                <option value="oreilly">O&apos;Reilly</option>
                <option value="ibm">IBM Developer</option>
                <option value="microsoftdocs">Microsoft Docs</option>
                <option value="oracle">Oracle</option>
                <option value="springer">Springer</option>
                <option value="jstor">JSTOR</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="identifier"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Identifier:
              </label>
              <div className="mt-2">
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  value={identifier}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                  disabled
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contributors"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contributors (comma-separated IDs):
              </label>
              <div className="mt-2">
                <input
                  id="contributors"
                  name="contributors"
                  type="text"
                  value={contributors}
                  onChange={(e) => setContributors(e.target.value)}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description:
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <input
                id="isPublic"
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="isPublic" className="text-sm">
                Public
              </label>
            </div>

            <div className="flex flex-col justify-center mx-auto">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Upload Image:
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 p-2 border rounded-md w-full"
              />
              {image && (
                <Image
                  src={image}
                  alt="Uploaded"
                  className="flex mx-auto justify-center mt-2 object-cover object-center border-[1px] border-gray-400 shadow-md p-[0.3rem]"
                  width={100}
                  height={100}
                />
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex mb-5 w-full justify-center rounded-lg hover:rounded-lg hover:border-gray-100 hover:scale-105 transition-all shadow-md bg-white border-[0.1rem] border-gray-500 px-3 py-1.5 text-sm font-semibold leading-6 text-slate-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:text-white hover:bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 cursor-pointer"
              >
                Save/Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;
