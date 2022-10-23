import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [username, setUsername] = useState('');

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const { jwt } = await res.json();
        document.cookie = `jwt=${jwt}; path=/; expires=${new Date(
          (Math.floor(Date.now() / 1000) + 60 * 60) * 1000
        ).toUTCString()};`;
        localStorage.setItem('username', data.username);
        const returnUrl = router.query.returnUrl || '/';
        router.push(returnUrl);
      } else {
        alert('Username or password is incorrect');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-[4rem] pt-20">
        <span className="text-white"> Login</span>
      </h1>
      <form
        className="flex flex-col items-center justify-center "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-5 flex flex-col border border-solid border-gray-700 rounded-lg p-5 mb-8 w-[20rem] ">
          <input
            type="text"
            placeholder="Username*"
            className="self-start
            px-3
            py-1.5
            mb-5
            text-base
            font-normal
            text-white
            border border-solid border-gray-700
            rounded-lg
            transition
            ease-in-out
            m-0 focus:outline-none  focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 bg-inherit flex-1
            w-full "
            {...register('username', { required: true })}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          {errors.username && <span>username field is required</span>}
          <input
            type="password"
            placeholder="Password*"
            className="px-3
            py-1.5
            text-base
            font-normal
            text-white
            border border-solid border-gray-700
            rounded-lg
            transition
            ease-in-out
            m-0 focus:outline-none  focus-visible:ring-2  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 bg-inherit flex-1"
            {...register('password', { required: true })}
          />
          {errors.password && <span>password field is required</span>}
        </div>
        <div className="flex flex-row items-center">
          <button
            type="submit"
            className={`py-2 px-10  bg-[#0070f3] hover:bg-blue-700 text-white rounded-lg `}
          >
            Login
          </button>
          <Link href={'/register'}>
            <a
              type="button"
              className={`ml-24 flex items-center hover:text-[#0070f3] hover:cursor-pointer underline rounded-lg  `}
            >
              Not registered?
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
}
