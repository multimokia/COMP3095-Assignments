import Head from 'next/head';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { getCookie } from 'cookies-next';
import { useForm } from 'react-hook-form';

export default function EditProfile() {
  const token = getCookie('jwt');
  const fetcher = async (url, token) =>
    await fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(
      (res) => res.json()
    );

  const {
    data: user,
    error: userError,
    mutate,
  } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, token] : null,
    fetcher
  );

  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (avatar) data.avatar = avatar;
    if (data.password == '') delete data.password;
    if (data.password == '') delete data.confirmPassword;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      mutate();
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } else {
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setAvatar(base64);
  };

  if (user && userError) {
    return (
      <div>
        <p>{data.error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Recipe App</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center ">
        <div className="w-[30rem]">
          <form
            className="flex flex-col items-center justify-center pt-20 "
            onSubmit={handleSubmit(onSubmit)}
          >
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt="user avatar"
                width={100}
                height={100}
                className="rounded-full "
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-24 h-24 mr-1  border-gray-500 border-4 rounded-full p-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            )}
            <h1 className="text-[4rem] ">
              <label
                className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload/Re-upload a profile picture
              </label>
              <input
                className="block w-full text-sm  border  rounded-lg cursor-pointer  text-gray-400 focus:outline-non bg-inherit border-gray-600 placeholder-gray-400 "
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                accept="image/png, image/jpeg"
                onInput={handleImage}
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300 "
                id="file_input_help"
              ></p>
            </h1>

            <div>
              <label className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>

              <div className="w-[16.1rem]">{user.username}</div>
            </div>
            {showPassword ? (
              <div>
                <div>
                  <label className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="
                        w-[16.1rem]
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
                    {...register('password', { required: false })}
                  ></input>
                </div>
                <div>
                  <label className="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white">
                    Re-enter new password
                  </label>
                  <input
                    type="password"
                    className="
                        w-[16.1rem]
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
                    {...register('confirmPassword', {
                      required: false,
                      validate: (val) => {
                        if (watch('password') != val) {
                          return 'Your passwords do not match';
                        }
                      },
                    })}
                  ></input>
                </div>
                {errors.confirmPassword && (
                  <div className="text-red-500 mt-2 ">
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
            ) : (
              <div
                className="w-[16rem] mt-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                <p className="text-[#0070f3] underline hover:cursor-pointer hover:text-blue-700">
                  Change Password?
                </p>
              </div>
            )}

            <div className="w-[16.1rem] ">
              <button
                className="mt-10 bg-[#0070f3] hover:bg-blue-700  text-white font-bold py-2 px-4 rounded flex"
                type="submit"
              >
                Save Changes
              </button>
              {isError && (
                <div className="mt-5 flex bg-[#c9606086] rounded-lg p-1.5 items-center justify-center">
                  <div>Error</div>
                </div>
              )}

              {isSuccess && (
                <div className="mt-5 flex bg-[#bbeea8ba] rounded-lg p-1.5 items-center justify-center">
                  <div>Saved successfully</div>
                </div>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
