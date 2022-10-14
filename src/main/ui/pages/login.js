import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const { username, token } = await res.json();

      if (token) {
        const returnUrl = router.query.returnUrl || '/';
        router.push(returnUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-[4rem] pt-20">
        <span className="text-[#0070f3]"> Login</span>
      </h1>
      <form
        className="flex flex-col items-center justify-center w-full"
        onSubmit={handleSubmit(onSubmit)}
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
        <button
          type="submit"
          className="w-96 h-12 bg-[#0070f3] text-white rounded-lg"
        >
          Login
        </button>

        <button
          type="button"
          className="w-96 h-12 bg-[#0070f3] text-white mt-10 rounded-lg"
          onClick={() => router.push('/register')}
        >
          Register
        </button>
        {errors.username && <span>username field is required</span>}
        {errors.password && <span>password field is required</span>}
      </form>
    </div>
  );
}
