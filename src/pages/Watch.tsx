import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getRecommendedVideos } from '../store/reducers/getRecommendedVideos';
import { convertRawViewsToString } from '../utils';
import { getVideoDetails } from '../store/reducers/getVideoDetails';
import { BiLike, BiDislike } from 'react-icons/bi';
import { HiScissors } from 'react-icons/hi';
import { MdOutlinePlaylistAdd } from 'react-icons/md';
import { FaShare } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import WatchCard from '../components/WatchCard';
import Sidebar from '../components/Sidebar';

export default function Watch() {
  const [showMoreStatus, setShowMoreStatus] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentPlaying = useAppSelector(
    (state) => state.youtubeApp.currentPlaying,
  );
  const recommendedVideos = useAppSelector(
    (state) => state.youtubeApp.recommendedVideos,
  );

  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id));
      setShowMoreStatus(false);
    } else {
      navigate('/');
    }
  }, [id, navigate, dispatch]);

  useEffect(() => {
    if (currentPlaying && id) dispatch(getRecommendedVideos(id));
  }, [currentPlaying, dispatch, id]);

  return (
    <>
      {currentPlaying && currentPlaying?.videoId === id && (
        <div>
          <Navbar />
          <Sidebar />
          <div className="pt-20">
            <div className="space-x-4 flex flex-col justify-center lg:flex-row">
              <div className="flex flex-col">
                <div className="relative overflow-hidden w-[370px] sm:w-[500px] md:w-[900px] lg:w-[750px] xl:w-[840px] 2xl:w-[1100px] pt-[56.25%] mx-auto">
                  <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullScreen
                    className="h-full w-full absolute top-0 left-0 bottom-0 right-0"
                  ></iframe>
                </div>
                <div className="mt-5">
                  <p className="text-xl">{currentPlaying.videoTitle}</p>
                  <div className="flex flex-col md:flex-row justify-between mt-4 space-x-2 text-sm space-y-3 lg:space-y-0 lg:text-lg">
                    <div className="flex items-center gap-3 md:gap-2">
                      <div>
                        <img
                          src={currentPlaying.channelInfo.image}
                          alt=""
                          className="rounded-full h-11 w-11"
                        />
                      </div>
                      <div>
                        <h5 className="text-base">
                          <strong>{currentPlaying.channelInfo.name}</strong>
                        </h5>
                        <h6 className="text-gray-400 text-sm">
                          {currentPlaying.channelInfo.subscribers} subscribers
                        </h6>
                      </div>
                      <div>
                        <button className="bg-black px-2.5 py-1.5 text-sm tracking-wider rounded-2xl">
                          Subscribe
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 capitalize text-xs md:text-base lg:text-lg xl:text-xl">
                      <div className="flex items-center gap-1 cursor-pointer ">
                        <BiLike />
                        <strong>{currentPlaying.videoLikes}</strong>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <BiDislike />
                        <strong>dislike</strong>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <FaShare />
                        <strong>share</strong>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <HiScissors />
                        <strong>clip</strong>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <MdOutlinePlaylistAdd />
                        <strong>save</strong>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <BsThreeDots />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 flex-col border-solid border-gray-400 my-5 pb-3 border-l-transparent border-r-transparent max-w-md">
                    <div className="flex items-center gap-6  mt-4">
                      <div className="text-sm text-gray-400">
                        <span className=" after:mx-1">
                          {convertRawViewsToString(
                            currentPlaying.videoViews.replaceAll(',', ''),
                          )}{' '}
                          views
                        </span>
                        <span> {currentPlaying.videoAge} ago</span>
                      </div>
                    </div>
                    <div
                      className={`${
                        !showMoreStatus ? 'max-h-16 overflow-hidden' : ''
                      } text-sm w-11/12`}
                    >
                      <pre
                        style={{
                          fontFamily: `"Roboto", sans-serif`,
                        }}
                        className="whitespace-pre-wrap"
                      >
                        {currentPlaying.videoDescription}
                      </pre>
                    </div>
                    <div>
                      <button
                        className="uppercase text-sm cursor-pointer"
                        onClick={() => setShowMoreStatus(!showMoreStatus)}
                      >
                        Show {showMoreStatus ? 'less' : 'more'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 mt-1">
                {recommendedVideos.map((item) => {
                  return (
                    <WatchCard
                      data={item}
                      key={item.videoId}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
