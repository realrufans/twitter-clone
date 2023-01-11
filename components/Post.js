import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "@firebase/firestore";

import {

  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,

  SwitchHorizontalIcon,

} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import {
  deleteModal,
  openModal,
  postIdState,
  subdeleteModal,
} from "../atoms/atoms";
import { db } from "../firebase";
import ConfirmDelete from "./ConfirmDelete.js";
import PostOptions from "./PostOptionsModal";

function Post({ id, post, postPage }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const router = useRouter();
  const [_options, set_options] = useRecoilState(deleteModal);
  const [subDeleteMod, setsubDeleteMod] = useRecoilState(subdeleteModal);
  const [modalopen, setmodalOpen] = useRecoilState(openModal);
  const [postId, setpostId] = useRecoilState(postIdState);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };


  return (
    <div
      className="p-3 flex cursor-pointer border-b border-gray-700"
      onClick={(e) => {
        e.preventDefault();
        router.push(`/${id}`);
      }}
    >

      {!postPage && (
        <img
          src={post?.userImage}
          alt=""
          className="h-11 w-11 rounded-full mr-4"
        />
      )}
      <div className="flex flex-col space-y-2 w-full relative">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            <img
              src={post?.userImg}
              alt="Profile Pic"
              className="h-11 w-11 rounded-full mr-4"
            />
          )}
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${!postPage && "inline-block"
                  }`}
              >
                {post?.username}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}
              >
                @{post?.tag}
              </span>
            </div>
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow ago>
                {post?.timestamp?.toDate()}
              </Moment>
            </span>
            {!postPage && (
              <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                {post?.text}
              </p>
            )}
          </div>

          {session.user.uid === post?.id && (
            <div className="icon group flex-shrink-0 ml-auto ">
              <DotsHorizontalIcon
                className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]"
                onClick={(e) => {
                  e.stopPropagation();
                  set_options(!_options);
                  setpostId(id);


                }}
              />
            </div>
          )}
        </div>
        {postPage && (
          <p className="text-[#d9d9d9] mt-0.5 text-xl">{post?.text}</p>
        )}
        <img
          src={post?.image}
          alt=""
          className="rounded-2xl max-h-[700px] object-cover mr-2"
        />
        <div
          className={`text-[#6e767d] flex justify-between w-10/12 ${postPage && "mx-auto"
            }`}
        >
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div
              className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10"
              onClick={() => {
                setmodalOpen(true);
             
              }}
            >
       
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {comments.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-green-500/10">
              <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
            </div>
          </div>

          <div
            className="flex items-center space-x-1 group order-2 w-12"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"
                  }`}
              >
                {likes.length}
              </span>
            )}
          </div>
          <>
            {_options && <PostOptions />}{" "}
         
            {subDeleteMod && <ConfirmDelete id={postId}  />}
          </>
        </div>
      </div>
    </div>
  );
}

export default Post;
