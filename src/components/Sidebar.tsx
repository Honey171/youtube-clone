import React from 'react';
import {
  MdHomeFilled,
  MdOutlineSlowMotionVideo,
  MdSubscriptions,
  MdOutlineVideoLibrary,
  MdHistory,
  MdOutlineSmartDisplay,
  MdOutlineWatchLater,
  MdThumbUpOffAlt,
  MdSettings,
  MdOutlinedFlag,
  MdOutlineHelpOutline,
  MdOutlineFeedback,
  MdOutlineSportsVolleyball,
} from 'react-icons/md';
import { TbMusic, TbDeviceGamepad2 } from 'react-icons/tb';
import { FaRegCompass } from 'react-icons/fa';
import { GiFilmStrip } from 'react-icons/gi';
import { useRecoilState } from 'recoil';
import { sidebar } from '../utils/atoms';
import { useLocation } from 'react-router-dom';

function Sidebar() {
  const [sidebarClicked] = useRecoilState(sidebar);
  const { pathname } = useLocation();

  console.log(pathname);

  const mainLinks = [
    {
      icon: <MdHomeFilled className="text-xl" />,
      name: 'Home',
    },
    {
      icon: <FaRegCompass className="text-xl" />,
      name: 'Explore',
    },
    {
      icon: <MdOutlineSlowMotionVideo className="text-xl" />,
      name: 'Shorts',
    },
    {
      icon: <MdSubscriptions className="text-xl" />,
      name: 'Subscriptions',
    },
  ];

  const secondaryLinks = [
    {
      icon: <MdOutlineVideoLibrary className="text-xl" />,
      name: 'Library',
    },
    {
      icon: <MdHistory className="text-xl" />,
      name: 'History',
    },
    {
      icon: <MdOutlineSmartDisplay className="text-xl" />,
      name: 'Your Videos',
    },
    {
      icon: <MdOutlineWatchLater className="text-xl" />,
      name: 'Watch Later',
    },
    {
      icon: <MdThumbUpOffAlt className="text-xl" />,
      name: 'Liked Videos',
    },
  ];

  const subscriptionLinks = [
    {
      icon: <TbMusic className="text-xl" />,
      name: 'Music',
    },
    {
      icon: <MdOutlineSportsVolleyball className="text-xl" />,
      name: 'Sport',
    },
    {
      icon: <TbDeviceGamepad2 className="text-xl" />,
      name: 'Gaming',
    },
    {
      icon: <GiFilmStrip className="text-xl" />,
      name: 'Films',
    },
  ];

  const helpLinks = [
    {
      icon: <MdSettings className="text-xl" />,
      name: 'Settings',
    },
    {
      icon: <MdOutlinedFlag className="text-xl" />,
      name: 'Report history',
    },
    {
      icon: <MdOutlineHelpOutline className="text-xl" />,
      name: 'Help',
    },
    {
      icon: <MdOutlineFeedback className="text-xl" />,
      name: 'Send feedback',
    },
  ];

  const textLinks = [
    [
      'About',
      'Press',
      'Copyright',
      'Contact us',
      'Creator',
      'Advertise',
      'Developers',
    ],
    [
      'Terms',
      'Privacy',
      'Policy & Safety',
      'How YouTube works',
      'Test new features',
    ],
  ];
  return (
    <>
      {!sidebarClicked && !pathname.includes('/watch') && (
        <div className="w-[60px] h-[95vh] bg-[#181a1b] fixed text-[9px] sidebar z-50 mt-14 px-1 space-y-10 pt-8 hidden md:inline">
          <span className="flex flex-col items-center space-y-1">
            <MdHomeFilled className="text-xl" />
            <p>Home</p>
          </span>
          <span className="flex flex-col items-center space-y-1">
            <MdOutlineSlowMotionVideo className="text-xl" />
            <p>Shorts</p>
          </span>
          <span className="flex flex-col items-center space-y-1">
            <MdSubscriptions className="text-xl" />
            <p>Subscriptions</p>
          </span>
          <span className="flex flex-col items-center space-y-1">
            <MdOutlineVideoLibrary className="text-xl" />
            <p>Library</p>
          </span>
        </div>
      )}
      {sidebarClicked && (
        <div className="max-w-[250px] h-[95vh] bg-[#212121] overflow-y-visible fixed text-base sidebar z-50 mt-14">
          <ul className="flex flex-col border-b-2 border-gray-700 max-w-[250px]">
            {mainLinks.map(({ icon, name }) => {
              return (
                <li
                  key={name}
                  className={`pl-6 py-3 hover:bg-zinc-600 ${
                    name === 'Home' ? 'bg-zinc-600' : ''
                  }`}
                >
                  <div className="flex items-center gap-5 cursor-pointer">
                    {icon}
                    <span className="tracking-wider">{name}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          <ul className="flex flex-col border-b-2 border-gray-700">
            {secondaryLinks.map(({ icon, name }) => {
              return (
                <li
                  key={name}
                  className="pl-6 py-3 hover:bg-zinc-600"
                >
                  <div className="flex items-center gap-5 cursor-pointer">
                    {icon}
                    <span className="tracking-wider">{name}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          <ul className="flex flex-col border-b-2 border-gray-700">
            {subscriptionLinks.map(({ icon, name }) => {
              return (
                <li
                  key={name}
                  className="pl-6 py-3 hover:bg-zinc-600"
                >
                  <div className="flex items-center gap-5 cursor-pointer">
                    {icon}
                    <span className="tracking-wider">{name}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          <ul className="flex flex-col border-b-2 border-gray-700">
            {helpLinks.map(({ icon, name }) => {
              return (
                <li
                  key={name}
                  className="pl-6 py-3 hover:bg-zinc-600"
                >
                  <div className="flex items-center gap-5 cursor-pointer">
                    {icon}
                    <span className="tracking-wider">{name}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400">
            {textLinks[0]?.map((name) => {
              return <li key={name}>{name}</li>;
            })}
          </ul>
          <ul className="flex gap-2 flex-wrap text-sm p-4 text-zinc-400">
            {textLinks[1]?.map((name) => {
              return <li key={name}>{name}</li>;
            })}
          </ul>
          <span className="px-4 text-sm text-zinc-400">
            &copy; 2022 Google LLC
            <p className="px-4 pt-3 text-sm text-zinc-400">
              This clone has been created for only educational purpose.
            </p>
          </span>
        </div>
      )}
    </>
  );
}

export default Sidebar;
