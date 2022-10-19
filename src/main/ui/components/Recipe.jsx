import { useEffect, useState } from 'react';

export default function Recipe({ recipe }) {
  const [isHearted, setIsHearted] = useState(recipe.hearted);

  const [showHeart, setShowHeart] = useState(false);

  function handleShowHeart() {
    setShowHeart(true);
  }
  function handleLeaveHeart() {
    setShowHeart(false);
  }

  return (
    <div
      className="recipe-card flex bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] hover:cursor-pointer rounded-lg mt-10 p-1 items-center"
      onMouseOver={() => handleShowHeart()}
      onMouseLeave={() => handleLeaveHeart()}
    >
      <div className="black-background bg-black rounded-lg flex items-center py-3 px-5 w-[99.99%] justify-between">
        <div className="recipe-card-content">
          <h2 className=" text-xl font-bold">{recipe.name}</h2>
          <p>By: {recipe.author}</p>
        </div>
        {showHeart || isHearted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 "
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isHearted ? (
              <defs>
                <linearGradient x1="50%" y1="92.034%" x2="50%" y2="7.2%" id="a">
                  <stop offset="15%" stopColor="currentColor" />
                  <stop stopOpacity="0.8" offset="100%" stopColor="red" />
                </linearGradient>
              </defs>
            ) : (
              ''
            )}

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              fillRule="evenodd"
              fill={isHearted ? 'url(#a)' : 'none'}
              fillOpacity=".82"
              strokeWidth="1.5"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
