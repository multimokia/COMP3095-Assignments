import Head from 'next/head';
import Image from 'next/image';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Recipe from '../components/Recipe';

export default function Home() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const [limitCount, setLimitCount] = useState(4);

  const router = useRouter();
  const { name, limit } = router.query;
  const filter = name ? `&name=${name}` : '';
  const recipeLimit = limit ? `?limit=${limit}` : `?limit=${limitCount}`;

  //Logic for conditionally rendering the load more button
  //if data.recipes.length < limitCount
  // hide load more button
  //else show load more button

  const { data, error } = useSWR(
    `/api/recipes${recipeLimit}${filter}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

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
              className="w-6 h-6"
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
            ></input>
          </div>
          <div className="recipe-container">
            {data.recipes.map((recipe) => (
              <Recipe key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
