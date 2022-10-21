import { useEffect, useState } from 'react';

export default function Recipe({ recipe, userId = null }) {
  const [isHearted, setIsHearted] = useState(
    'hearted' in recipe ? recipe.hearted : false
  );

  const [showHeart, setShowHeart] = useState(false);

  //use recipe.authorId to fetch author name

  // make swr call with userId and recipeId to get hearted status, set isHearted to that(either gonna come back as true or false or undefined, set to false
  // for the last 2 cases). When heart gets clicked, check state of isHearted, if true, make delete request, if false, make post request.

  //in the user profile page , pass null (its a default param so just dont pass a prop for userId) for userid when displaying recipes, so that the heart doesn't show up

  //view hearted recipes button == make a get request to the hearted table (many to many), get back an array of recipes, display them or false no entries returned

  function handleShowHeart() {
    if ('hearted' in recipe) {
      setShowHeart(true);
    }
  }
  function handleLeaveHeart() {
    if ('hearted' in recipe) {
      setShowHeart(false);
    }
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
