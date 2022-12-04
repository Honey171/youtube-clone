import React, { useState } from 'react';

import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineVideoCameraAdd,
  AiOutlineArrowLeft,
} from 'react-icons/ai';
import { TiMicrophone } from 'react-icons/ti';
import { BsYoutube, BsBell } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useRecoilState } from 'recoil';
import { sidebar } from '../utils/atoms';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeSearchTerm, clearSearchTerm, clearVideos } from '../store';
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos';

function Navbar() {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);
  const [searchedTerm, setSearchedTerm] = useState('');
  const [sidebarClicked, setSidebarClicked] = useRecoilState(sidebar);

  const handleSearch = () => {
    dispatch(changeSearchTerm(searchedTerm));
    dispatch(clearVideos());
    dispatch(getSearchPageVideos(false));
    navigate('/search');
  };

  return (
    <div className="flex justify-between items-center h-14  bg-[#181A1B] fixed w-full top-0 z-50">
      {isClicked ? (
        ''
      ) : (
        <div className="gap-4 items-center text-2xl md:gap-7 translate-x-3 flex">
          <div
            className="cursor-pointer"
            onClick={() => setSidebarClicked(!sidebarClicked)}
          >
            <GiHamburgerMenu />
          </div>
          <Link to="/">
            <div className="flex gap-1 items-center justify-center">
              <BsYoutube className="text-3xl text-red-600" />
              <span className="text-lg font-medium">YouTube</span>
            </div>
          </Link>
        </div>
      )}
      <div className="flex items-center justify-center gap-2 mx-auto">
        {isClicked && (
          <div>
            <AiOutlineArrowLeft
              className="text-xl visible lg:invisible"
              onClick={() => {
                setIsClicked(false);
              }}
            />
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div
            className={`bg-zinc-900 items-center h-10 px-1 pr-0 rounded-full ${
              isClicked ? 'inline-block' : 'hidden lg:inline-block'
            }`}
            onBlur={() => {
              setIsClicked(false);
            }}
          >
            <div className="flex items-center">
              <div>
                <AiOutlineSearch className="text-xl translate-x-1" />
              </div>
              <input
                type="text"
                className="bg-zinc-900 focus:outline-none border-none pl-2 min-w-[0rem] lg:min-w-[32rem]"
                value={searchedTerm}
                onChange={(e) => setSearchedTerm(e.target.value)}
              />
              <AiOutlineClose
                className={`text-xl cursor-pointer ${
                  !searchTerm ? 'invisible' : 'visible'
                }`}
                onClick={() => dispatch(clearSearchTerm())}
              />
              <button className="h-10 w-10 lg:w-14 flex items-center justify-center bg-zinc-800 rounded-r-full">
                <AiOutlineSearch
                  className="text-xl"
                  onClick={(e) => dispatch(changeSearchTerm(searchedTerm))}
                />
              </button>
            </div>
          </div>
        </form>
        {!isClicked && (
          <div className="text-lg p-2 bg-zinc-900 rounded-full hidden">
            <TiMicrophone />
          </div>
        )}
        {isClicked && (
          <div className="text-lg p-2 bg-zinc-900 rounded-full ">
            <TiMicrophone />
          </div>
        )}
      </div>
      {isClicked ? (
        ''
      ) : (
        <div className="gap-5 items-center text-xl xl:text-2xl md:gap-7 flex -translate-x-3">
          <AiOutlineSearch
            className="visible lg:invisible"
            onClick={() => {
              setIsClicked(true);
            }}
          />
          <AiOutlineVideoCameraAdd />
          <BsBell />
          <img
            src="https://yt3.ggpht.com/ytc/AMLnZu9G9SneXSKlpQaM32vkHjDEWzbwx-xdrMs2kQ=s108-c-k-c0x00ffffff-no-rj"
            alt="Avatar"
            className="w-9 h-9 rounded-full cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}

export default Navbar;
