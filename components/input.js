import { useState, useEffect } from "react";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";

import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";

function Input() {
  const [userInput, setUserInput] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [isTweeting, setisTweeting] = useState(false);
  const { data: session } = useSession();

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


  // handle tweet post
  const tweetPost = async () => {
    try {
      setisTweeting(true);
      const docRef = await addDoc(collection(db, "posts"), {
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

  return (
    <div className="border-b-[0.1px]  border-gray-500 mt-20">
      <div
        className={`flex mt-7 p-2 space-x-4   w-full ${
          imagePreview && `min-h-[80vh]`
        } overflow-y-scroll scrollbar-hide `}
      >
        <div>
          <img
            src={session.user.image}
            className=" max-w-xs h-10 rounded-full hidden sm:inline "
          />
        </div>
        <div
          className={` relative    flex-grow ${imagePreview && "h-[400px]"}`}
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
                  className="max-h-[300px] max-w-[80vw]   mx-auto p-10 "
                />
                <XIcon
                  onClick={() => {
                    setImagePreview("");
                    setSelectedImage("");
                  }}
                  className="h-7 absolute top-0 hoverAnimation p-0  cursor-pointer  right-0"
                />
                <p className="text-blue-700 absolute top-0 left-0 font-bold hoverAnimation p-2  ">
                  Unsent Tweets
                </p>
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
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  />
                </div>
              )}
              <button
                onClick={tweetPost}
                disabled={
                  userInput.trim().length < 1 && !imagePreview && !isTweeting
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
    </div>
  );
}

// onClick={() => setShowEmojiPicker(false)}

export default Input;
