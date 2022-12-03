import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useFetch } from '../lib/hooks';
import { getCookie } from 'cookies-next';

export default function RecipeCard({ recipe, userId = null }) {
  const token = getCookie('jwt');

  const [isHearted, setIsHearted] = useState(false);

  const [showHeart, setShowHeart] = useState(false);

  const {
    data: heartedRecipe,
    error: heartedRecipeError,
    mutate,
  } = useFetch(`/api/favorites/${recipe.id}`);

  useEffect(() => {
    if (heartedRecipe && userId) {
      if (heartedRecipe == 'null') {
        setIsHearted(false);
      } else {
        setIsHearted(true);
      }
    }
  }, [heartedRecipe, userId]);

  const handleHeartClick = async () => {
    if (isHearted) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${recipe.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      mutate();
      setIsHearted(false);
    } else {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/favorites/${recipe.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      mutate();
      setIsHearted(true);
    }
  };

  function handleShowHeart() {
    if (userId) {
      setShowHeart(true);
    }
  }

  function handleLeaveHeart() {
    if (userId) {
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
        <div
          className={`${
            recipe.username ? '' : 'flex justify-center items-center w-full'
          }`}
        >
          <Link href={`/recipes/${recipe.id}`}>
            <a className=" text-xl font-bold hover:cursor-pointer hover:text-blue-500">
              {recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1)}
            </a>
          </Link>
          <p>{recipe.username ? `By: ${recipe.username}` : ''}</p>
        </div>
        {showHeart || isHearted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 hover:cursor-pointer"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => handleHeartClick()}
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
