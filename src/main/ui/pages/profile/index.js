import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Head from 'next/head';
import RecipeCard from '../../components/RecipeCard';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useUser } from '../../lib/hooks';

export default function Profile() {
  const [filter, setFilter] = useState('user');

  // const { data, error: userRecipesError } = useSWR(
  //   `/api/recipes?&name=stanley`,
  //   fetcher
  // );

  const { data, error: userRecipesError } = useUser();

  const heartedRecipes = true;
  const heartedRecipesError = false;

  //   const { data: heartedRecipes, error: heartedRecipesError } = useSWR(
  //     `/api/heartedrecipes?userid=1`,
  //     fetcher
  //   );

  // make swr call with userId and recipeId to get hearted status, set isHearted to that(either gonna come back as true or false or undefined, set to false
  // for the last 2 cases). When heart gets clicked, check state of isHearted, if true, make delete request, if false, make post request.

  //in the user profile page , pass null (its a default param so just dont pass a prop for userId) for userid when displaying recipes, so that the heart doesn't show up

  //view hearted recipes button == make a get request to the hearted table (many to many), get back an array of recipes, display them or false no entries returned

  useEffect(() => {
    if (data && !data.error) {
      // setSteps(recipe.steps.split('\\n'));
    } else if (data && data.error) {
    }
  }, [data]);

  if (data && data.error) {
    return (
      <div>
        <p>{data.error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Recipe App</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center ">
        <div className="flex items-center justify-center ">
          <h1 className="text-[4rem] pt-20">
            My<span className="text-[#0070f3]"> Profile</span>
          </h1>
          <Link href="/profile/edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 relative hover:text-[#4076b4] hover:cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </Link>
        </div>
        <div className="w-[30rem]">
          <div id="searchBar" className="mt-10 flex items-center space-x-10">
            <button
              className={`flex justify-center ${
                filter == 'user'
                  ? 'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] hover:from-[#46a982] hover:via-[#2556a5] hover:to-[#8956b9]'
                  : 'bg-[#3d4145] hover:bg-[#61676d] '
              } flex-1 mt-3 mb-2 bg-gradient-to-r  text-white font-bold py-2 px-4 rounded `}
              type="submit"
              onClick={() => setFilter('user')}
            >
              My Recipes
            </button>
            <button
              className={`flex justify-center ${
                filter == 'hearted'
                  ? 'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] hover:from-[#46a982] hover:via-[#2556a5] hover:to-[#8956b9]'
                  : 'bg-[#3d4145] hover:bg-[#61676d] '
              } flex-1 mt-3 mb-2 bg-gradient-to-r  text-white font-bold py-2 px-4 rounded `}
              type="submit"
              onClick={() => setFilter('hearted')}
            >
              Favourites
            </button>
          </div>

          {filter == 'user' ? (
            data && !userRecipesError ? (
              <div className="recipe-container">
                {data.recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div>Error for user Recipes</div>
            )
          ) : heartedRecipes && !heartedRecipesError ? (
            <div>Hearted Recipes coming soon to a theatre near you...</div>
          ) : (
            <div>Error for hearted Recipes</div>
          )}
          {/* {data && !error ? (
            <div className="recipe-container">
              {data.recipes.map((recipe) => (
                <Recipe key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="flex mt-10 text-red-400">{error}</div>
          )} */}
        </div>
      </main>
    </div>
  );
}
