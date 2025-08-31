import React, {useState} from "react";

 const AddToFavoritesButton = ({ haircutId, isFavorited, onToggleFavorite }) => {
    const [isPulsing, setIsPulsing] = useState(false);
    const handleToggle = (e) => {
      e.stopPropagation();
      onToggleFavorite(haircutId);
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 500);
    };
    return (
      <button onClick={handleToggle} className={`mt-2 text-3xl transition-transform duration-200 hover:scale-110 ${isPulsing ? 'animate-pop' : ''}`}>
        {isFavorited ? '❤️' : '🤍'}
      </button>
    );
  };

  export default AddToFavoritesButton;