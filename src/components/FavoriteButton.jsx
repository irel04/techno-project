import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";

function HeartButton() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  return (
    <button
      onClick={handleLikeToggle}
      className={`flex items-center gap-1 focus:outline-none ${
        isLiked ? "text-primary" : "text-gray-500"
      }`}
    >
      {isLiked ? (
        <FaHeart className="text-xl" />
      ) : (
        <FiHeart className="text-xl" />
      )}
      <span className={isLiked ? "font-bold" : ""}>Favorite</span>
    </button>
  );
}

export default HeartButton;
