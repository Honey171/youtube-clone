
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import { clearVideos } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getHomePageVideos } from '../store/reducers/getHomePageVideos';
import { HomePageVideos } from '../types';

function Home() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);

  useEffect(() => {
    return () => {
      dispatch(clearVideos());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Sidebar />
      </div>
      <div
        className="flex flex-wrap justify-center"
        style={{ height: '92.5vh' }}
      >
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            className="h-full scrollbar-none"
            height={1000}
          >
            <div className="grid mx-auto gap-y-14 gap-x-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mt-24">
              {videos.map((item: HomePageVideos, idx) => {
                return (
                  <Card
                    data={item}
                    key={idx}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Home;
