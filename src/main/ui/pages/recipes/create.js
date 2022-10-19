import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export default function create() {
  const [count, setCount] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const inputs = [];

  for (let i = 0; i < count; i++) {
    // inputs.push(
    //   <input
    //     className="mt-5"
    //     key={i}
    //     id={i}
    //     {...register(`${i}`, { required: 'Enter a value' })}
    //     placeholder="test"
    //   ></input>
    // );
    inputs.push(i);
  }

  const userToken = getCookie('token');

  const Authheader = userToken ? { Authorization: `Bearer ${userToken}` } : {};

  // useEffect(() => {
  //   console.log(Authheader);
  // }, [userToken]);

  const onSubmit = async (data) => {
    // console.log(data);
    for (let i = 0; i < count; i++) {
      console.log(data[i]);
    }
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

      const jsonData = await res.json();
      // console.log(jsonData);
    } catch (error) {
      // console.log(error);
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

          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              <div>Name:</div>
              <input type="text" {...register('name')}></input>
            </div>
            {/* <div className="mt-5 flex flex-col">{inputs}</div> */}
            <div className="mt-5 flex flex-col">
              {inputs.map((dontUse, idx) => (
                <div key={idx}>
                  <input
                    className="mt-5"
                    id={idx}
                    {...register(`${idx}`, { required: 'Enter a value' })}
                    placeholder="test"
                  ></input>
                  <div>{errors[idx] && <p>{errors[idx].message}</p>}</div>
                </div>
              ))}
            </div>

            <div
              className=" hover:cursor-pointer"
              onClick={() => setCount(count + 1)}
            >
              Add Step
            </div>
            <button className="mt-10" type="submit">
              Create Recipe
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
