// client/src/pages/Feed.jsx
import { useEffect, useState } from 'react';
import { getFeed } from '../services/videoService';
import VideoCard from '../components/VideoCard';
import Navbar from '../components/Navbar';

const Feed = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getFeed().then(({ data }) => setVideos(data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-4 space-y-6">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
