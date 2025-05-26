// client/src/components/CommentSection.jsx
import { useState } from 'react';
import { addComment } from '../services/videoService';

const CommentSection = ({ videoId }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState([]);

  const handleSubmit = async () => {
    if (!comment) return;
    const { data } = await addComment(videoId, user.id, comment);
    setSubmitted((prev) => [data, ...prev]);
    setComment('');
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg mb-2">Comments</h3>
      <input
        placeholder="Add comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 border"
      />
      <button onClick={handleSubmit} className="mt-2 px-4 py-1 bg-green-600 text-white">Post</button>

      <div className="mt-4 space-y-2">
        {submitted.map((c, idx) => (
          <div key={idx} className="border-b pb-2">
            <p className="text-sm font-semibold">{c.user.username}</p>
            <p>{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
