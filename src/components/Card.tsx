
import React from 'react';
import { Link } from 'react-router-dom';
import { HomePageVideos } from '../types';

function Card({ data }: { data: HomePageVideos }) {
  return (
    <div className="flex gap-3 flex-col hover:scale-[1.02] pl-1">
      <div className="relative">
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            alt=""
            className="h-[200px] w-[320px] rounded-lg"
          />
          <span className="absolute right-2 bottom-2 rounded-xl text-sm bg-gray-900 px-2 py-0.5 z-10">
            {data.videoDuration}
          </span>
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="min-w-fit">
          <div>
            <img
              src={data.channelInfo.image}
              alt=""
              className="h-9 w-9 rounded-full"
            />
          </div>
        </div>
        <div>
          <h3>
            <div className="line-clamp-2 max-w-[280px]">{data.videoTitle}</div>
          </h3>
          <div className="text-sm text-gray-400">
            <div>
              <div className="hover:text-white line-clamp-1">
                {data.channelInfo.name}
              </div>
            </div>
            <div>
              <span className="after:content-['•'] after:mx-1">
                {data.videoViews} views
              </span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
