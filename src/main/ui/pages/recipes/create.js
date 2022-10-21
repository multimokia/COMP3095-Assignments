import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export default function create() {
  const [count, setCount] = useState(1);

  const [step1Text, setStep1Text] = useState('');
  const [rName, setRname] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (successMsg) {
      setTimeout(() => {
        setSuccessMsg('');
      }, 5000);
    }
  }, [successMsg]);

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        setErrorMsg('');
      }, 5000);
    }
  }, [errorMsg]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const inputs = [];

  for (let i = 0; i < count; i++) {
    inputs.push(i);
  }

  const userToken = getCookie('token');

  const Authheader = userToken ? { Authorization: `Bearer ${userToken}` } : {};

  const onSubmit = async (data) => {
    // console.log(data)
    let steps = '';
    for (let i = 0; i < count; i++) {
      steps += data[i] + '\\n';
    }

    const { recipeName } = data;

    try {
      const res = await fetch('/api/createRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authheader,
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      // throw new Error('Testing error');
      setSuccessMsg(`${recipeName} recipe created successfully!`);

      // const jsonData = await res.json();
      // console.log(jsonData);
    } catch (error) {
      console.log(error.message);
      setErrorMsg(error.message);
    }
  };
  return (
    <div>
      <Head>
        <title>Create Recipe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center relative">
        <div className="flex flex-col items-center justify-center w-full relative">
          <h1 className="text-[4rem] pt-20">
            Create a <span className="text-[#0070f3]"> Recipe</span>
          </h1>
          {errorMsg && (
            <div className="mt-5 flex bg-[#c9606086] rounded-lg p-1.5 items-center justify-center">
              <div>{errorMsg}</div>
            </div>
          )}

          {successMsg && (
            <div className="mt-5 flex bg-[#bbeea8ba] rounded-lg p-1.5 items-center justify-center">
              <div>{successMsg}</div>
            </div>
          )}

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
                  value={rName}
                  onChange={(e) => setRname(e.target.value)}
                ></input>
              </div>

              <div id="stepsContainer" className="">
                {inputs.map((dontUse, idx) => (
                  <div
                    key={idx}
                    className="mt-7 flex flex-col bg-gradient-to-r from-[#515055] via-[#676d76] to-[#9393a2]   rounded-lg p-1 items-center"
                  >
                    <div className="black-background opacity-95 bg-black rounded-lg flex items-center pt-3 pb-6  px-5 w-[99.99%] justify-between">
                      <div className="flex flex-col flex-1 ">
                        <p className="font-bold">Step {idx + 1}:</p>
                        <input
                          className="mt-1 rounded-lg p-1 pl-2.5 bg-inherit border border-gray-700 focus:outline-none  focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 w-[95%]  "
                          id={idx}
                          {...register(`${idx}`, {
                            required: `Enter a value for step ${idx + 1}`,
                          })}
                          placeholder={
                            idx == 0 ? 'How should we start?*' : "What's next?"
                          }
                          {...(idx == 0 ? { value: step1Text } : {})}
                          {...(idx == 0
                            ? {
                                onChange: (e) => {
                                  setStep1Text(e.target.value);
                                },
                              }
                            : {})}
                        ></input>
                        <div>
                          {errors[idx] && (
                            <p className="text-sm text-red-400">
                              {errors[idx].message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-green-500 mt-5 hover:cursor-pointer"
                    onClick={() => setCount(count + 1)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                  {count > 1 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-red-500 mt-5 hover:cursor-pointer"
                      onClick={() => setCount(count - 1)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 12h-15"
                      />
                    </svg>
                  )}
                </div>
                <button
                  className={`mt-10 ${
                    step1Text && rName
                      ? 'bg-[#0070f3] hover:bg-blue-700'
                      : 'bg-[#33373b] '
                  }  text-white font-bold py-2 px-4 rounded `}
                  type="submit"
                  disabled={!step1Text && !rName}
                >
                  Create Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
