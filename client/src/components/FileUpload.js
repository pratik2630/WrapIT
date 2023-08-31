import React, { useState } from "react";
import axios from "axios";
export const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [summary, setSummary] = useState({})

  const handleFileChange = (e) => {
    let file = e.target.files
    setSelectedFiles(file);


  };

  const handleUpload = async () => {
    const selectedFilesArray = [...selectedFiles];
    const formData = new FormData();
    selectedFilesArray.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post('http://localhost:3001/upload', formData);
      console.log(response.data);

    } catch (error) {
      console.error(error);

    }
  };
  console.log(selectedFiles);
  const getSummary = async () => {
    const selectedFilesArray = [...selectedFiles];
    const fileNames = selectedFilesArray.map(file => file.name);

    try {
      const response = await axios.get('http://localhost:3001/transcripts', {
        params: {
          files: fileNames.join(',')
        }
      });
      console.log("error logs whatever")
      console.log(response.data)
      response.data.forEach(obj => {
        const text = obj.text;
        setSummary(text)
      });
    } catch (error) {
      console.error(error);
    }
  };
  console.log(summary);
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-row justify-center items-center">
        <label className="block">
          <span className="sr-only">Choose Audio File</span>
          <input
            onChange={handleFileChange}
            type="file"
            className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-500 file:text-white
          hover:file:bg-blue-600
          "/>
        </label>
        <button
          onClick={handleUpload}
          className="py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-black hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Upload
        </button>
      </div>
      <div className="flex flex-col justify-center items-center p-5">
        <button onClick={getSummary} className="py-2.5 px-5  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-black hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Get Summary</button>
        <div className="p-10">
          {summary && summary.length > 0 ? <p>{summary}</p> : (
            <p>No Transcripts Available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
