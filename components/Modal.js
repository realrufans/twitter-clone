import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { deleteModal, openModal, postIdState, subdeleteModal } from "../atoms/atoms";
import Moment from "react-moment";
import { db } from "../firebase";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";

import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
  CalendarIcon,
  ChartBarIcon,
} from "@heroicons/react/outline";
import Input from "./Input";
import ConfirmDelete from "./ConfirmDelete.js";
import { Picker } from "emoji-mart";

function Modal() {
  let [isOpen, setIsOpen] = useState(true);
  const [modalopen, setmodalOpen] = useRecoilState(openModal);
  const [subdeleteMod, setsubdeleteModal] = useRecoilState(subdeleteModal);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPosts] = useState([]);
  const { data: session } = useSession();
  const [comment, setComment] = useState("");

  const [userInput, setUserInput] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [isTweeting, setisTweeting] = useState(false);

  // handle select image
  const handleImage = (e) => {
    setShowEmojiPicker(false);
    try {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setSelectedImage(e.target.files[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // handle emoji
  const handleEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setUserInput(userInput + emoji);
  };

  const tweetPost = async () => {
    try {
      setisTweeting(true);
      const docRef = await addDoc(collection(db, "posts", postId, "comments"), {
        id: session.user.uid,
        tag: session.user.tag,
        userImage: session.user.image,
        userName: session.user.name,
        text: userInput,
        timeStamp: serverTimestamp(),
      });

      if (selectedImage) {
        const imageRef = ref(storage, `/posts${docRef.id}/image`);
        await uploadBytes(imageRef, selectedImage);
        const downloadUrl = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadUrl,
        });
      }
      setisTweeting(false);
      setImagePreview("");
      setSelectedImage("");
      setUserInput("");
    } catch (error) {
      console.log(error);
      setisTweeting(false);
    }
  };

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPosts(snapshot.data());
      }),
    [db]
  );

  function closeModal() {
    setmodalOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className=" w-[300px] inline-block align-bottom p-2 border border-gray-700  bg-black text-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                <div className=" w-full flex justify-between   ">
                  <XIcon
                    onClick={() => {
                      {
                        (userInput.length > 0) |
                          (selectedImage.length > 0) |
                          (imagePreview.length > 0) && setsubdeleteModal(true);
                      }
                      setmodalOpen(false);
                    }}
                    className="h-7 text-white  top-0 hoverAnimation p-0  cursor-pointer  right-0"
                  />
                  <p className="text-blue-700  top-0 left-0 font-bold hoverAnimation p-2  ">
                    Unsent Tweets
                  </p>
                </div>
                <ConfirmDelete setit={false} />

                {/* tweet */}
                <div className="flex mb-0 ">
                  <img
                    src={post?.userImage}
                    alt=""
                    className="h-11 w-11 rounded-full mr-4"
                  />
                  <div className="text-[#6e767d]  p-">
                    <div className="inline-block group">
                      <h4
                        className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underlin`}
                      >
                        {post?.username}
                      </h4>
                      <span
                        className={`text-sm sm:text-[15px] 
                        `}
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
                    <p className="text-[#d9d9d9] text-[15px] w-56 sm:text-base mt-0.5">
                      {post?.text}
                    </p>
                    <p className="text-[#d9d9d9] truncate w-80 ... text-[15px] sm:text-base mt-0.5 overflow-x-scroll scrollbar-hide">
                      {post?.image}
                    </p>
                  </div>
                </div>
                <div className=" border-l-[1px] border-gray-700 min-h-[30px] ml-5 p-2 text-gray-700">
                  <p className=" ml-5 ">Replying to @{post?.tag}</p>
                </div>
                {/* input */}
                <div
                  className={`flex  p-2 space-x-4 mt-0   w-full ${
                    imagePreview && `min-h-[80vh]`
                  } overflow-y-scroll scrollbar-hide `}
                >
                  <div>
                    <img
                      src={session.user.image}
                      className=" max-w-xs h-10 rounded-full   "
                    />
                  </div>
                  <div
                    className={` relative    flex-grow ${
                      imagePreview && "h-[400px]"
                    }`}
                    onClick={() => showEmojiPicker && setShowEmojiPicker(false)}
                  >
                    <textarea
                      className=" resize-none bg-transparent scrollbar-hide outline-none tracking-wide w-full min-h-[100px] flex-grow p-5 leading-6 text-lg"
                      rows={2}
                      disabled={isTweeting}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={`What's happening?`}
                    />

                    <div className=" flex flex-col max-w-lg">
                      {imagePreview && (
                        <div className=" w-full relative  ">
                          <img
                            onClick={() => setShowEmojiPicker(false)}
                            onChange={handleImage}
                            src={imagePreview}
                            className="max-h-[300px] max-w-[90%]    mx-auto  p-2"
                          />
                        </div>
                      )}

                      <div className="flex  items-center   relative  space-x-2    mt-5 ">
                        {!isTweeting && (
                          <div className="flex space-x-2">
                            <label>
                              <input
                                className="hidden"
                                accept="image/x-png,image/gif,image/jpeg"
                                type={"file"}
                                onChange={handleImage}
                              />
                              <PhotographIcon
                                onClick={() => setShowEmojiPicker(false)}
                                className="h-7 text-blue-700 cursor-pointer"
                              />
                            </label>
                            <EmojiHappyIcon
                              className={`h-7 text-blue-700 cursor-pointer `}
                              onClick={() =>
                                setShowEmojiPicker(!showEmojiPicker)
                              }
                            />
                          </div>
                        )}
                        <button
                          onClick={tweetPost}
                          disabled={
                            userInput.trim().length < 1 &&
                            !imagePreview &&
                            !isTweeting
                          }
                          className={`
              ${
                userInput.trim().length == 0 &&
                (selectedImage.length == 0) | isTweeting &&
                "opacity-50 cursor-not-allowed text-white "
              } bg-blue-600  cursor-pointer font-bold text-white   text-center text-lg p-2 rounded-lg  absolute right-0  bottom-0    w-fit  `}
                        >
                          {isTweeting ? "Tweeting..." : "Tweet"}
                        </button>
                      </div>

                      <span className=" absolute  top-[20%] left-[30%]   "></span>
                    </div>
                  </div>

                  {showEmojiPicker && (
                    <Picker
                      onSelect={handleEmoji}
                      style={{
                        position: "absolute",
                        marginTop: "165px",
                        marginLeft: "1px",
                        maxWidth: "300px",
                        borderRadius: "20px",
                      }}
                      theme="dark"
                    />
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
