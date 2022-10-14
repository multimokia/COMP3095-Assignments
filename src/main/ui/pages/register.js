import { useForm } from 'react-hook-form';
import Router from 'next/router';

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json === 'truth') {
        console.log(json);
        await Router.push('/login');
      } else {
        console.log('this is the falseddd');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-[4rem] pt-20">
        <span className="text-[#0070f3]"> Register</span>
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full"
      >
        <input
          type="text"
          placeholder="Username"
          className="w-96 h-12 border-2 border-gray-300 rounded-lg px-4"
          {...register('username', { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-96 h-12 border-2 border-gray-300 rounded-lg px-4"
          {...register('password', { required: true })}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-96 h-12 border-2 border-gray-300 rounded-lg px-4"
          {...register('confirmPassword', { required: true })}
        />
        <button
          type="submit"
          className="w-96 h-12 bg-[#0070f3] text-white rounded-lg"
        >
          Register
        </button>
        {errors.username && <span>username is required</span>}
        {errors.password && <span>password is required</span>}
        {errors.confirmPassword && <span>confirm password is required</span>}
      </form>
    </div>
  );
}
