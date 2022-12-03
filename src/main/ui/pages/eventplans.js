import Head from 'next/head';
import RecipeCard from '../components/RecipeCard';
import { useFetch } from '../lib/hooks';
import moment from 'moment';

export default function Eventplans() {
  const { data: events, error: eventsError } = useFetch(`/api/events`);

  let newArray = [];

  if (events) {
    for (let i = 0; i < events.length; i++) {
      if (moment(events[i].timestamp).valueOf() < moment().valueOf()) {
        continue;
      }
      newArray.push({
        recipe: events[i].recipeData,
        date: events[i].timestamp,
        mealId: events[i].id,
        eventName: events[i].eventName,
      });
    }
  }

  if (events && events.length == 0) {
    return (
      <div>
        <Head>
          <title>Event Plans</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center relative">
          <div className="flex flex-col items-center justify-center w-full relative">
            <h1 className="text-[4rem] pt-20">
              Event <span className="text-[#0070f3]"> Plan</span>
            </h1>

            <div className="w-[30rem]">
              <p className="text-center mt-5">No Events found!</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!events && !eventsError) {
    return (
      <div>
        <Head>
          <title>Event Plans</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center relative">
          <div className="flex flex-col items-center justify-center w-full relative">
            <h1 className="text-[4rem] pt-20">
              Event <span className="text-[#0070f3]"> Plan</span>
            </h1>

            <div className="w-[30rem]">
              <p className="text-center mt-5">loading...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Event Plans</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center relative">
        <div className="flex flex-col items-center justify-center w-full relative">
          <h1 className="text-[4rem] pt-20">
            Event <span className="text-[#0070f3]"> Plan</span>
          </h1>

          <div className="w-[30rem]">
            {events && !eventsError ? (
              <div className="recipe-container">
                {newArray.map(({ recipe, date, mealId }, idx) => (
                  <div key={mealId} className="flex flex-col">
                    {idx === 0 ? (
                      <div className="text-[#9ca4ad] text-2xl mt-3">
                        {moment(date).format('MMMM Do YYYY')}
                        <hr className=""></hr>
                      </div>
                    ) : moment(newArray[idx - 1].date).date() !==
                      moment(date).date() ? (
                      <div className="text-[#9ca4ad] text-2xl mt-3">
                        {moment(date).format('MMMM Do YYYY')}
                        <hr></hr>
                      </div>
                    ) : (
                      ''
                    )}

                    <RecipeCard recipe={recipe} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex mt-10 text-red-400">error</div>
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
