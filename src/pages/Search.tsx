import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SearchCard from '../components/SearchCard';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import { clearVideos } from '../store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos';
import { HomePageVideos } from '../types';

function Search() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtubeApp.videos);
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  useEffect(() => {
    dispatch(clearVideos());
    if (searchTerm === '') navigate('/');
    else {
      dispatch(getSearchPageVideos(false));
    }
  }, [dispatch, navigate, searchTerm]);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Sidebar />
      <div
        className="flex justify-center pt-20"
        style={{ height: '92.5vh' }}
      >
        {videos.length ? (
          <div className="flex flex-col gap-5 w-full">
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getSearchPageVideos(true))}
              hasMore={videos.length < 500}
              loader={<Spinner />}
              className="scrollbar-none"
              height={1000}
            >
              <div className="space-y-12">
                {videos.map((item: HomePageVideos, idx) => {
                  return (
                    <SearchCard
                      data={item}
                      key={idx}
                    />
                  );
                })}
              </div>
            </InfiniteScroll>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}

export default Search;
