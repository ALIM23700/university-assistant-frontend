import React, { useEffect, useState } from "react";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  const fetchResources = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setResources(data.resources);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !file) return alert("Provide title and file");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("File uploaded!");
        setTitle("");
        setFile(null);
        fetchResources();
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Resources</h1>

      <form
        className="flex flex-col gap-3 max-w-md mx-auto bg-white p-5 rounded shadow"
        onSubmit={handleUpload}
      >
        <input
          type="text"
          placeholder="Resource Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded"
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Upload
        </button>
      </form>

      <div className="mt-6 max-w-xl mx-auto flex flex-col gap-4">
        {resources.map((res) => (
          <div
            key={res._id}
            className="flex justify-between items-center p-4 bg-white rounded shadow"
          >
            <span>{res.title}</span>
            <a
              href={`http://localhost:3000/api/download/${res.filename}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
