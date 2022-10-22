import { useForm } from 'react-hook-form';
import Router from 'next/router';
import Link from 'next/link';

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { username, password } = data;
    // console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        //modal to say you have successfully registered
        console.log('alll good in the hood');
        await Router.push('/login');
      }
    } catch (error) {
      //modal to say there was an error
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-[4rem] pt-20">
        <span className="text-white">Register</span>
      </h1>
      <form
        className="flex flex-col items-center justify-center  "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mt-5 flex flex-col border border-solid border-gray-700 rounded-lg p-5 mb-8 w-[23rem] ">
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
          />
          {errors.username && <span>username field is required</span>}
          <input
            type="password"
            placeholder="Password*"
            className="px-3
            py-1.5
            text-base
            mb-5
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

          <input
            type="password"
            placeholder="Confirm password*"
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
            {...register('confirmPassword', {
              required: true,
              validate: (val) => {
                if (watch('password') != val) {
                  return 'Your passwords do not match';
                }
              },
            })}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>
        <div className="flex flex-row  justify-start">
          <button
            type="submit"
            className={`py-2 px-10  bg-[#0070f3] hover:bg-blue-700 text-white rounded-lg `}
          >
            Register
          </button>
          <Link href={'/login'}>
            <a
              type="button"
              className={`ml-12 flex items-center hover:text-[#0070f3] hover:cursor-pointer underline rounded-lg  `}
            >
              Already have an account?
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
}
