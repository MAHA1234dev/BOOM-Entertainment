// client/src/pages/Player.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { watchVideo, giftCreator, addComment } from '../services/videoService';
import ReactPlayer from 'react-player';
import CommentSection from '../components/CommentSection';
import Navbar from '../components/Navbar';

const Player = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [video, setVideo] = useState(null);
  const [giftAmount, setGiftAmount] = useState('');

  useEffect(() => {
    watchVideo(id).then(({ data }) => setVideo(data));
  }, [id]);

  const handleGift = async () => {
    if (!giftAmount) return alert('Enter amount');
    try {
      const { data } = await giftCreator(id, user.id, Number(giftAmount));
      alert(data.message);
    } catch {
      alert('Gift failed');
    }
  };

  if (!video) return <p>Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        {video.videoType === 'Long-Form' ? (
          <ReactPlayer url={video.videoUrl} controls width="100%" />
        ) : (
          <video src={`http://localhost:5000${video.videoUrl}`} controls className="w-full" />
        )}
        <h2 className="text-xl mt-4">{video.title}</h2>
        <p>{video.description}</p>
        <p className="text-sm text-gray-600">By: {video.creator?.username}</p>

        <div className="mt-4">
          <input
            placeholder="Gift Amount (₹)"
            value={giftAmount}
            onChange={(e) => setGiftAmount(e.target.value)}
            className="p-2 border"
          />
          <button onClick={handleGift} className="ml-2 px-4 py-2 bg-yellow-400">
            Gift Creator
          </button>
        </div>

        <CommentSection videoId={id} />
      </div>
    </div>
  );
};

export default Player;
