import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import FileUpload from "../components/FileUpload";

const Upload = () => {
  const [files, setFiles] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/getfiles").then((response) => {
      setFiles(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    console.log(files);
  }, [files]);

  const Download = (res, name, type) => {
    var data = new Blob([res], { type: type });
    var csvURL = window.URL.createObjectURL(data);
    var tempLink = document.createElement("a");
    tempLink.href = csvURL;
    tempLink.setAttribute("download", name);
    tempLink.click();
  };

  return (
    <>
      <div className="container mt-4">
        <h4 className="display-4 text-center mb-4">MS File Upload</h4>
        <FileUpload />
      </div>

      <div className="container mt-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">name</th>
            <th scope="col">type</th>
            <th scope="col">download</th>
            <th scope="col">ts</th>
          </tr>
        </thead>
        <tbody>
          {files
            ? files.map((file, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{file.filename}</td>
                    <td>{file.type}</td>
                    <td>
                      <button
                        type="button"
                        onClick={(e) =>
                          Download(file.data, file.filename, file.type)
                        }
                        className="btn btn-success"
                      >
                        Download
                      </button>
                    </td>
                    <td>{file.ts}</td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default Upload;
