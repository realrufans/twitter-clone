import { useState, useEffect } from "react";
import {
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";

import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { addDoc, collection } from "firebase/firestore";
function Input() {
  // states

  const [userInput, setUserInput] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

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

  return (
    <div className="flex mt-7 p-2 space-x-4   w-full min-h-[80vh] overflow-y-scroll scrollbar-hide ">
      <div>
        <img
          src="https://pbs.twimg.com/profile_images/1211322796883808256/-Ck0zxIf_400x400.jpg"
          className=" max-w-xs h-10 rounded-full hidden sm:inline "
        />
      </div>
      <div
        className={` relative divide-y-[0.1px]   flex-grow ${
          imagePreview && "h-[400px]"
        }`}
        onClick={() => showEmojiPicker && setShowEmojiPicker(false)}
      >
        <textarea
          className=" bg-transparent scrollbar-hide outline-none tracking-wide w-full min-h-[100px] flex-grow p-5 leading-6 text-lg"
          rows={2}
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
                className="max-h-[400px] max-w-full  mx-auto p-10 "
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
          <div className="flex space-x-2  items-center mt-5 ">
            <label>
              <input
                className="hidden"
                accept="image/x-png,image/gif,image/jpeg"
                type={"file"}
                onChange={handleImage}
              />
              <PhotographIcon
                onClick={() => setShowEmojiPicker(false)}
                className="h-9 text-blue-700 cursor-pointer"
              />
            </label>
            <EmojiHappyIcon
              className={`h-9 text-blue-700 cursor-pointer `}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            <button
              onClick={() => console.log("clicked")}
              disabled={userInput.trim().length <= 0 && !imagePreview}
              className={`${
                userInput.trim().length <= 0 &&
                !imagePreview &&
                "bg-gray-800 cursor-not-allowed text-white/50 "
              } bg-blue-600  cursor-pointer font-bold text-white  flex-grow text-center text-lg p-3 rounded-md w-fit`}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>

      {showEmojiPicker && (
        <Picker
          lax
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
  );
}

// onClick={() => setShowEmojiPicker(false)}

export default Input;
