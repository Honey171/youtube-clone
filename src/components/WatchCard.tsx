import React from 'react';
import { RecommendedVideos } from '../types';
import { Link } from 'react-router-dom';

export default function WatchCard({ data }: { data: RecommendedVideos }) {
  return (
    <div className="flex space-x-2 max-w-lg">
      <div className="relative">
        <span className="absolute bottom-2 right-2 text-sm bg-gray-900 px-2 py-0.5 z-10 rounded-lg">
          {data.videoDuration}
        </span>
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            className="h-24 w-40 rounded-md"
            alt="thumbnail"
          />
        </Link>
      </div>
      <div className="flex space-y-1 flex-col max-w-[150px] md:max-w-[210px] lg:max-w-[120px] xl:max-w-[250px]">
        <h4 className="text-base">
          <div className="line-clamp-2">{data.videoTitle}</div>
        </h4>
        <div className="text-sm text-grape-400 space-y-1">
          <div>
            <div className="hover:text-white">{data.channelInfo.name}</div>
          </div>
          <div>
            <div>
              <span className="after:content-['•'] after:mx-1">
                {data.videoViews} views
              </span>
              <span>{data.videoAge} ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
