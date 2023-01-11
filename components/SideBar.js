import Image from "next/image";
import Link from "next/link";
import SiderLink from "./SiderLink";
import {
  BellIcon,
  BookmarkIcon,
  ClipboardListIcon,
  DotsCircleHorizontalIcon,
  HashtagIcon,
  HomeIcon,
  InboxIcon,
  UserCircleIcon,

} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";



function SiderBar() {
  const { data: session } = useSession()
 
  return (
    <div className="w-[100px]   min-h-screen  lg:w-[90px] xl:w-[350px]  hidden sm:flex flex-col justify-between p-3   border-r-2 border-gray-800  fixed top-0 bottom-0  scrollbar-hide sm:overflow-y-scroll xl:overflow-y-hidden ">
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
      <div className="hoverAnimation self-center xl:self-start  text-white flex space-x-5 mt-3" onClick={() => signOut()}>
        <img
          src={session.user.image}
          className=" max-w-xs h-10 rounded-full "
        />
        <div className="hidden xl:block">
          <h1>{session.user.name}</h1>
          <p>@{session.user.tag}</p>
        </div>
      </div>
    </div>
  );
}

export default SiderBar;
