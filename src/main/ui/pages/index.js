import Head from 'next/head';
import Image from 'next/image';
import useSWR from 'swr';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import RecipeCard from '../components/RecipeCard';
import { getCookie } from 'cookies-next';

export default function Home() {
  const [token, setToken] = useState(null);
  const searchRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const jwt = getCookie('jwt');
    if (!jwt) {
      setError('You must be logged in to view this page');
    }
    setToken(jwt);
  }, []);

  const fetcher = async (url, token) =>
    await fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(
      (res) => res.json()
    );
  const router = useRouter();
  const { name, limit } = router.query;

  const [limitCount, setLimitCount] = useState(4);
  const [filter, setFilter] = useState('');

  const [recipeName, setRecipeName] = useState('');

  const recipeLimit = limit ? `?limit=${limit}` : `?limit=${limitCount}`;

  const { data, error: serverError } = useSWR(
    token
      ? [
          `${process.env.NEXT_PUBLIC_API_URL}/api/recipes${recipeLimit}&name=${recipeName}`,
          token,
        ]
      : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      if (data.error) {
        setError(data.error);
      }
      searchRef.current.focus();
    }
  }, [data]);

  if (error) {
    return (
      <div>
        <Head>
          <title>Recipe App</title>

          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center ">
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-[4rem] pt-20">
              All<span className="text-[#0070f3]"> Recipes</span>
            </h1>
          </div>
          <div className="w-[30rem]">{error}</div>
        </main>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <Head>
          <title>Recipe App</title>

          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center ">
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-[4rem] pt-20">
              All<span className="text-[#0070f3]"> Recipes</span>
            </h1>
          </div>
          <div className="w-[30rem]">Loading...</div>
        </main>
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
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-[4rem] pt-20">
            All<span className="text-[#0070f3]"> Recipes</span>
          </h1>
        </div>
        <div className="w-[30rem]">
          <div id="searchBar" className="mt-10 flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:cursor-pointer"
              onClick={() => console.log('test')}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input
              type="email"
              className="form-control
                      self-start
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-white
                      border border-solid border-gray-700
                      rounded-lg
                      transition
                      ease-in-out
                      m-0 focus:outline-none  focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 bg-inherit flex-1"
              id="filter"
              placeholder="Search for a Recipe"
              ref={searchRef}
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              onKeyDownCapture={(e) =>
                e.key === 'Enter' ? console.log('enter') : null
              }
            ></input>
          </div>
          <div className="recipe-container mb-10">
            {data.length === 0 ? (
              <div className="mt-10">
                No Recipes Found, click on Create Recipe to get started!
              </div>
            ) : (
              ''
            )}
            {data.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          {data.length < limitCount ? (
            ''
          ) : (
            <div className="flex justify-center">
              <button
                className="bg-[#0070f3] text-white font-bold py-2 px-4 rounded  mb-10"
                onClick={() => setLimitCount(limitCount + 4)}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
