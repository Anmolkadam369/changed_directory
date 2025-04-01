import { useState } from "react";

export default function RatingModal({ isOpen, setIsOpen, onSubmit, onCancel }) {
  const [rating, setRating] = useState(0);

  if (!isOpen) return null; // Hide modal if `isOpen` is false

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">Rate Your Experience</h2>

        {/* Star Rating */}
        <div className="flex justify-center gap-2 my-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-3xl ${
                rating >= star ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => {
              setIsOpen(false);
              if (onCancel) onCancel(); // Call onCancel in parent
            }}
            className="px-3 py-1 bg-gray-400 text-white rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSubmit(rating); // Send rating to parent
              setIsOpen(false);
            }}
            className="px-3 py-1 bg-green-500 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
