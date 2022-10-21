import { useForm } from 'react-hook-form';
import Head from 'next/head';
import useSWR from 'swr';
import { useEffect, useState } from 'react';
import Recipe from '../components/Recipe';
import moment from 'moment';

export default function mealplans() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  //fetch meals by userId, it returns a list of meals,create newArray, I then iterate over the list of meals
  //and for each one i push the recipe (minus the hearted field) to the newArray along with the date from the meal
  //then i sort the newArray by date, filter out all dates prior to today,
  //then return jsx, map over newArray and return two elements, the date (if it is different from the previous date) and the recipe

  const { data, error } = useSWR(`/api/mealplans`, fetcher);

  let newArray = [];

  if (data) {
    for (let i = 0; i < data.mealPlans.length; i++) {
      newArray.push({
        recipe: data.mealPlans[i].recipeData,
        date: data.mealPlans[i].timestamp,
      });
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data)

    try {
      const res = await fetch('/api/mealplans/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authheader,
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      // const jsonData = await res.json();
      // console.log(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Head>
        <title>Meal Plans</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center relative">
        <div className="flex flex-col items-center justify-center w-full relative">
          <h1 className="text-[4rem] pt-20">
            Meal <span className="text-[#0070f3]"> Plan</span>
          </h1>

          <div className="w-[30rem]">
            <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
              <div
                id="recipeNameContainer"
                className="mt-10 flex items-center space-x-3"
              >
                <div className="font-bold">Name:</div>
                <input
                  type="text"
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
                  {...register('recipeName')}
                  placeholder="Enter Recipe Name*"
                ></input>
              </div>
            </form>

            {data && !error ? (
              <div className="recipe-container">
                {newArray.map(({ recipe, date }, idx) => (
                  <div key={recipe.recipeId} className="flex flex-col">
                    {idx === 0 ? (
                      <div className="text-[#9ca4ad] text-2xl mt-3">
                        {moment.unix(date).format('MMMM Do YYYY')}
                        <hr className=""></hr>
                      </div>
                    ) : moment.unix(newArray[idx - 1].date).date() !==
                      moment.unix(date).date() ? (
                      <div className="text-[#9ca4ad] text-2xl mt-3">
                        {moment.unix(date).format('MMMM Do YYYY')}
                        <hr></hr>
                      </div>
                    ) : (
                      ''
                    )}

                    <Recipe recipe={recipe} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex mt-10 text-red-400">broken</div>
            )}

            {/* {errorMsg && (
              <div className="mt-20 flex bg-[#c9606086] rounded-lg p-1 items-center justify-center">
                <div>{errorMsg}</div>
              </div>
            )}

            {successMsg && (
              <div className="mt-20 flex bg-[#88c186a6] rounded-lg p-1 items-center justify-center">
                <div>{successMsg}</div>
              </div>
            )} */}
          </div>
        </div>
      </main>
    </div>
  );
}
