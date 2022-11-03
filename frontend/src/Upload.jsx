import React, { useState } from "react";
import axios from "axios";
import { partial } from "filesize";

const Upload = () => {
  const [file, setFile] = useState();
  const size = partial({ base: 2, standard: "jedec" });
  size(265318);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:5000/upload";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>React File Upload</h1>
        <input type="file" name="upload_file" onChange={handleChange} />
        <button type="submit" >Upload</button>
      </form>
    </>
  );
};

export default Upload;
