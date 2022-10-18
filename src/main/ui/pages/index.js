import Head from 'next/head';
import Image from 'next/image';
import useSWR from 'swr';
import { useState } from 'react';

export default function Home() {
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const [isHearted, setIsHearted] = useState(true);
  const [isHovered, setIsHovered] = useState(true);

  const { data, error } = useSWR('/api/recipes', fetcher);

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
              <div className="recipe-card flex bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] hover:cursor-pointer rounded-lg mt-10 p-1 items-center">
                <div className="black-background bg-black rounded-lg flex items-center py-3 px-5 w-[99.99%] justify-between">
                  <div className="recipe-card-content">
                    <h2 className=" text-xl font-bold">{recipe.name}</h2>
                    <p>By: {recipe.author}</p>
                  </div>
                  {isHovered ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-7 "
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {isHearted ? (
                        <defs>
                          <linearGradient
                            x1="50%"
                            y1="92.034%"
                            x2="50%"
                            y2="7.2%"
                            id="a"
                          >
                            <stop offset="15%" stop-color="currentColor" />
                            <stop
                              stop-opacity="0.8"
                              offset="100%"
                              stop-color="red"
                            />
                          </linearGradient>
                        </defs>
                      ) : (
                        ''
                      )}

                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        fill-rule="evenodd"
                        fill="url(#a)"
                        fill-opacity=".8"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
