// client/src/components/VideoCard.jsx
import { useNavigate } from 'react-router-dom';
import { purchaseVideo } from '../services/videoService';
import ReactPlayer from 'react-player';

const VideoCard = ({ video }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleClick = async () => {
    if (video.videoType === 'Long-Form' && video.price > 0) {
      try {
        await purchaseVideo(video._id, user.id);
      } catch (err) {
        alert('Purchase required or failed');
        return;
      }
    }
    navigate(`/player/${video._id}`);
  };

  return (
    <div className="border p-4 rounded shadow">
      <p className="font-bold">{video.title}</p>
      <p>By: {video.creator?.username}</p>
      {video.videoType === 'Short-Form' ? (
        <video
          src={`http://localhost:5000${video.videoUrl}`}
          muted
          autoPlay
          loop
          className="w-full mt-2 rounded"
        />
      ) : (
        <ReactPlayer
          url={video.videoUrl}
          light={true} // shows thumbnail
          controls={true}
          width="100%"
          height="200px"
          className="mt-2 rounded"
        />
      )}
      <button onClick={handleClick} className="mt-3 px-4 py-2 bg-blue-500 text-white">
        {video.price > 0 ? `Buy for ₹${video.price}` : 'Watch'}
      </button>
    </div>
  );
};

export default VideoCard;
