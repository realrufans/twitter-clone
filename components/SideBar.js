import Image from "next/image";
import Link from "next/link";
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

function SiderBar() {
  return (
    <div className="w-[100px]   min-h-screen  lg:w-[90px] xl:w-[250px]  hidden sm:flex flex-col justify-between p-3   border-r-2 border-gray-500  fixed top-0 bottom-0  scrollbar-hide sm:overflow-y-scroll xl:overflow-y-hidden ">
      <div className="  ">
        <div className="cursor-pointer ml-4">
          <Image height={30} width={30} src="/images/twitter.png" />
        </div>
        <div className="mt-2">
          {" "}
          <SiderLink Icon={HomeIcon} name="Home" />
          <SiderLink Icon={HashtagIcon} name="Explore" />
          <SiderLink Icon={BellIcon} name="Notification" />
          <SiderLink Icon={InboxIcon} name="Message" />
          <SiderLink Icon={BookmarkIcon} name="Bookmark" />
          <SiderLink Icon={ClipboardListIcon} name="List" />
          <SiderLink Icon={UserCircleIcon} name="Profile" />
          <SiderLink Icon={DotsCircleHorizontalIcon} name="more" />
        </div>
        <button className=" outline-none hidden text-white bg-blue-600 xl:inline   p-3  md:rounded-full xl:w-[200px] mt-5 ">
          Tweet
        </button>
        <img
          className=" cursor-pointer h-16 rounded-full xl:hidden  "
          src="/images/tweetbutton.png"
        />
      </div>
      <div className="hoverAnimation self-center xl:self-start  text-white flex space-x-5 mt-3  ">
        <img
          src="https://pbs.twimg.com/profile_images/1211322796883808256/-Ck0zxIf_400x400.jpg"
          className=" max-w-xs h-10 rounded-full "
        />
        <div className="hidden xl:block">
          <h1>Solomon Stephen</h1>
          <p>@reaslrufans22</p>
        </div>
      </div>
    </div>
  );
}

export default SiderBar;
