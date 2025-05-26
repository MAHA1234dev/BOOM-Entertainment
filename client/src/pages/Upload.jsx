// client/src/pages/Upload.jsx
import { useState } from 'react';
import { uploadVideo } from '../services/videoService';
import Navbar from '../components/Navbar';

const Upload = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [form, setForm] = useState({
    title: '',
    description: '',
    videoType: 'Short-Form',
    videoUrl: '',
    price: 0,
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (form.videoType === 'Short-Form') {
      formData.append('videoFile', file);
    }
    formData.append('creator', user.id);

    try {
      await uploadVideo(formData);
      alert('Video uploaded!');
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto mt-6">
        <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" onChange={handleChange} className="w-full p-2 border" placeholder="Title" />
          <textarea name="description" onChange={handleChange} className="w-full p-2 border" placeholder="Description" />
          <select name="videoType" onChange={handleChange} className="w-full p-2 border">
            <option value="Short-Form">Short-Form</option>
            <option value="Long-Form">Long-Form</option>
          </select>

          {form.videoType === 'Short-Form' ? (
            <input type="file" accept=".mp4" onChange={(e) => setFile(e.target.files[0])} />
          ) : (
            <>
              <input name="videoUrl" onChange={handleChange} className="w-full p-2 border" placeholder="YouTube/Vimeo URL" />
              <input name="price" type="number" onChange={handleChange} className="w-full p-2 border" placeholder="Price (₹)" />
            </>
          )}

          <button type="submit" className="bg-blue-600 text-white px-4 py-2">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
