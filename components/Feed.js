import { StarIcon, XIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import SiderBar from "./SideBar";
import SiderLink from "./SiderLink";

import {
  BellIcon,
  BookmarkIcon,
  ClipboardListIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  HomeIcon,
  InboxIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import Input from "./Input";
import Post from "./post";
import { db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Oval, Audio } from "react-loader-spinner";

function Feed() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [posts, setPosts] = useState([]);


  useEffect(


    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timeStamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  console.log(posts)

  return (
    <div
      className={`${mobileMenu && " bg-black-400/[0.4]"
        } overflow-y-scroll scrollbar-hide border-r-[0.1px] flex-grow text-white border-b-[1px] border-gray-800 max-w-[38rem]   bg-black  sm:ml-[100px]  h-screen   xl:ml-[350px]`}
    >
      <div className=" flex justify-between    max-w-2xl w-full bg-black z-50 sm:max-w-[40rem] top-0 p-5 items-center ">
        <div className=" inline-flex space-x-5 items-center">
          {" "}
          <img
            onClick={() => setMobileMenu(!mobileMenu)}
            src="https://pbs.twimg.com/profile_images/1211322796883808256/-Ck0zxIf_400x400.jpg"
            className=" max-w-xs h-10 rounded-full    sm:hidden  "
          />
          <h1 className="text-2xl font-bold">Home</h1>
        </div>
        <StarIcon className="h-7" />
      </div>

      {/* Menu view */}
      {mobileMenu && (
        <div className="absolute left-0 top-0 w-[250px] bg-black z-50 h-full border-r-[1px] border-gray-800 sm:hidden  p-5">
          <div className=" flex justify-between mb-5">
            {" "}
            <h1 className=" text-lg">Account info</h1>{" "}
            <XIcon
              onClick={() => setMobileMenu(!mobileMenu)}
              className="h-7 text-white"
            />
          </div>
          <div className=" mb-8 text-white ">
            <img
              src="https://pbs.twimg.com/profile_images/1211322796883808256/-Ck0zxIf_400x400.jpg"
              className=" max-w-xs h-10 rounded-full mb-2 "
            />
            <div>
              <h1>Solomon Stephen</h1>
              <p>@reaslrufans22</p>
            </div>
          </div>
          <SiderLink mdisplay="true" Icon={HomeIcon} name="Home" />
          <SiderLink mdisplay="true" Icon={HashtagIcon} name="Explore" />
          <SiderLink mdisplay="true" Icon={BellIcon} name="Notification" />
          <SiderLink mdisplay="true" Icon={InboxIcon} name="Message" />
          <SiderLink mdisplay="true" Icon={BookmarkIcon} name="Bookmark" />
          <SiderLink mdisplay="true" Icon={ClipboardListIcon} name="List" />
          <SiderLink mdisplay="true" Icon={UserCircleIcon} name="Profile" />
          <SiderLink
            mdisplay="true"
            Icon={DotsCircleHorizontalIcon}
            name="more"
          />
        </div>
      )}

      {/* <img
        className="h-14 absolute right-0 bottom-5 mr-5 rounded-full sm:hidden   bg-white"
        src="/images/tweetbutton.png"
      /> */}

      <Input />

      {posts.length > 0 ? (
        <div className="mt-20 ">
          {posts.map((post) => {
            return <Post key={post.id} id={post.id} post={post.data()} />;
          })}
        </div>
      ) : (
        <div className="relative">
          {" "}
          <div className=" absolute  left-[40%] top-10 text-blue-300 ">
          <Oval className='h-5   '/>
          </div>
        </div>
      )}

    </div>
  );
}

export default Feed;
