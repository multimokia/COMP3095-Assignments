import { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';

export default function RecipeCard({ recipe, userId = null }) {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const [isHearted, setIsHearted] = useState(
    'hearted' in recipe ? recipe.hearted : false
  );

  const [showHeart, setShowHeart] = useState(false);

  // console.log(recipe);

  //use recipe.authorId to fetch author name

  // make swr call with userId and recipeId to get hearted status, set isHearted to that(either gonna come back as true or false or undefined, set to false
  // for the last 2 cases). When heart gets clicked, check state of isHearted, if true, make delete request, if false, make post request.

  //   const { data: heartedRecipe, error: heartedRecipeError } = useSWR(
  //     `/api/heartedrecipes?userid=1&recipeid=1`,
  //     fetcher
  //   );

  // const [isHearted, setIsHearted] = useState(false);

  // useEffect(() => {
  //   if (heartedRecipe) { // the check may be different, but this is the idea, if it returns a positive set it to true
  //     setIsHearted(true);
  //   }, [heartedRecipe]);

  //in the user profile page , pass null (its a default param so just dont pass a prop for userId) for userid when displaying recipes, so that the heart doesn't show up

  //view hearted recipes button == make a get request to the hearted table (many to many), get back an array of recipes, display them or false no entries returned

  //  userId != null ,if userId is passed in, show the heart
  function handleShowHeart() {
    if ('hearted' in recipe) {
      setShowHeart(true);
    }
  }
  // userId != null ,if userId is passed in, show the heart
  function handleLeaveHeart() {
    if ('hearted' in recipe) {
      setShowHeart(false);
    }
  }

  return (
    <div
      className="recipe-card flex bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]  rounded-lg mt-10 p-1 items-center"
      onMouseOver={() => handleShowHeart()}
      onMouseLeave={() => handleLeaveHeart()}
    >
      <div className="black-background bg-black rounded-lg flex items-center py-3 px-5 w-[99.99%] justify-between">
        <div className="recipe-card-content">
          <Link href={`/recipes/${recipe.id}`}>
            <a className=" text-xl font-bold hover:cursor-pointer hover:text-blue-500">
              {recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1)}
            </a>
          </Link>
          <p>By: {recipe.username}</p>
        </div>
        {showHeart || isHearted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 hover:cursor-pointer"
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
