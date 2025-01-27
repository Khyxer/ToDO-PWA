import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerInput = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onEmojiClick = (emojiData) => {
    setSelectedEmoji(emojiData.emoji);
    setShowPicker(false);
  };

  return (
    <div className="w-fit max-w-xs mx-auto" ref={containerRef}>
      <div className="relative flex justify-center">
        <div
          onClick={() => setShowPicker((prev) => !prev)}
          className="h-12 w-12 lg:h-14 lg:w-14 rounded-lg border-2 dark:border-[#728AA1] border-[#4A6A83] border-dashed cursor-pointer hover:bg-[#728AA113] hover:scale-105  duration-150 flex items-center justify-center  shadow-sm hover:shadow-md "
        >
          {selectedEmoji ? (
            <span className="text-3xl lg:text-4xl ">{selectedEmoji}</span>
          ) : (
            ""
          )}
        </div>

        {showPicker && (
          <div className="absolute top-full mt-2 z-50 transform left-0">
            <div>
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                width={300}
                height={350}
                searchDisabled={true}
                lazyLoadEmojis={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiPickerInput;
