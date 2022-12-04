import React from 'react';
import { Link } from 'react-router-dom';
import { HomePageVideos } from '../types';

function SearchCard({ data }: { data: HomePageVideos }) {
  return (
    <div className="flex gap-3 ml-1 sm:ml-20 2xl:ml-96 md:ml-60">
      <div className="relative">
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            alt=""
            className="h-36 w-40 md:w-80 md:h-44"
          />
        </Link>
        <span className="absolute right-1 bottom-3 rounded-xl text-sm bg-gray-900 px-2 py-0.5 z-10">
          {data.videoDuration}
        </span>
      </div>
      <div className="flex gap-1 flex-col">
        <h3 className="2xl:max-w-2xl lg:max-w-md max-w-[200px]">
          <div className="line-clamp-2">{data.videoTitle}</div>
        </h3>
        <div className="text-xs text-gray-400">
          <div>
            <span className="after:content-['•'] after:mx-1">
              {data.videoViews} views
            </span>
            <span>{data.videoAge}</span>
          </div>
        </div>
        <div className="my-1">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <img
              src={data.channelInfo.image}
              alt=""
              className="h-9 w-9 rounded-full"
            />
            <span>{data.channelInfo.name}</span>
          </div>
        </div>
        <div className="2xl:max-w-2xl lg:max-w-md max-w-[200px] line-clamp-2 text-xs text-gray-400">
          <p>{data.videoDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
