import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Head from 'next/head';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';

export default function createRecipe() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const userToken = getCookie('token');

  const Authheader = userToken ? { Authorization: `Bearer ${userToken}` } : {};

  // useEffect(() => {
  //   console.log(Authheader);
  // }, [userToken]);

  const onSubmit = async (data) => {
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
      console.log(jsonData);
    } catch (error) {
      console.log(error);
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Recipe Name"
              {...register('name')}
            />
            <input
              type="text"
              placeholder="Recipe Steps"
              {...register('steps')}
            />

            <button type="submit">Create Recipe</button>
          </form>
        </div>
      </main>
    </div>
  );
}
