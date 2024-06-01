import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Button from "./Button";

const SlideshowModal = ({ photos, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length,
    );
  };

  const handleClickOutside = (event) => {
    if (event.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={handleClickOutside}
    >
      <div
        className="m-4 relative bg-white p-8 rounded-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-1 right-1"
        >
          <IoClose className="text-3xl text-primary" />
        </button>
        <img
          src={photos[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-auto"
        />
        <div className="flex justify-between items-center mt-4">
          <Button
            color="secondary"
            onClick={prevPhoto}
            className="max-w-fit"
          >
            Previous
          </Button>
          <span className="text-gray-700">
            {currentIndex + 1} / {photos.length}
          </span>
          <Button
            color="primary"
            onClick={nextPhoto}
            className="max-w-fit"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SlideshowModal;
