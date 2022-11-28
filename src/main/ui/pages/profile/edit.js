import Head from 'next/head';
import { useEffect, useState } from 'react';
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

  const { data: user, error: userError } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, token] : null,
    fetcher
  );

  useEffect(() => {
    if (user) {
      console.log(user);
      setUsername(user.username);
    }
  }, [user]);

  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [isImageSuccess, setIsImageSuccess] = useState(false);
  const [isImageSubmitting, setIsImageSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // });
    console.log(data);
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
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QAqRXhpZgAASUkqAAgAAAABADEBAgAHAAAAGgAAAAAAAABHb29nbGUAAP/bAIQAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFAEDBAQFBAUJBQUJFA0LDRQRFBQUFBQUExQUDRQUFBQUEBQTFBUUFBQUEhQVFBUQEhQUFBUSFRESFRQUEhIVFBQU/8AAEQgAIAAgAwERAAIRAQMRAf/EABkAAAIDAQAAAAAAAAAAAAAAAAcIBQYJA//EAC0QAAEDAwMCBQMFAQAAAAAAAAECAwQFESEABhIxQQcIUWGBFCJxFTNDofET/8QAHAEAAgICAwAAAAAAAAAAAAAABgcEBQEDAAII/8QALBEAAQMCAgkEAwEAAAAAAAAAAQIDEQAEITEFBhNBYXGRobESUYHwFKLhIv/aAAwDAQACEQMRAD8Az/ai37amVyiV4NUCNWtxsx5b/wBDFZJdckoaKlZFgDbOLKIHfN+mqq+9WBFWdmhKpBqS8atmRoE/9XhPOPRnnUMqckJCHHlKSpQcCAkWFkWOOpSNZsVmC2edZvGgmFpyyoWORfbVrVURUpS6S/UZbEWKyuRIeWG22mxdS1E2AA1occS2krWYAz5VIaaW8sNtiVHADjR38KvAneVI3NCnzm26Eyn9xl9YcW6k4KeKLptYk3JwQMegfe6xWBQUNkr4gYDjjB7Ud6P1X0l6w46kI4EyTwwkfM/HtbvMN4OVGtfQVOluoqDkZotrbKglakkp4pR2xY9bDPqLHpY6ds0q9BVnwMDn9mtmkNXb5wbRKMt0iTyx8xSyVCkvwHlMyWHI7qerbqClQ+Do0bdQ6PUgyOFATzK2VFLiSD7HCiJ5docd/wAaNntyiEsKmKCiSB/E5bJxe9rXxe2qzSaEuWbiFZEDyKs9ELU1fNOIzBJ/U+2NP3Kgxkqlx18v+8dRSPsI5AE5zYj8Ed9IF1vYLW2omQSBh3MwceVeh2nlOJQ6mIUAc5z5SD1rm1SqU+t5NUbU42EhKOJwDcX6f179etxIsXWEqO3nHKN3Thl39xqututKfx4nfPb+9soK4earb1PO24ctlrhKjyEpJSOygQQT6YHzbRnqlcOi5LajgR3FB2uVu2qyS9H+kkdDh9+KXnadak7S3FS61DsJNPktymwoYJQoKsfY2sfY6ZryA6goO/zuPwaUDDhZcDg3eN4+RIp2aVvmobzrTVYDK4Md7i08yQ45ywACeRPFQskWFumbkklZaVtrRVuVrI2sTgcz5I3CZyzpuaIfvQ+G0JOyBIxGQ47gd5iBjlERa5r7TrKmXJduX4Sr/dAKQQfUBTBiKAPmWr0dygMU5DqXX3X03SFgkJT91yO2QB86YGq1sv8AILxEAA9ThS+1yu0JswwDKlEdBjP33r//2Q==
                  "
                alt="Red dot"
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
                {...register('avatar')}
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
              <input
                type="text"
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                {...register('username')}
              ></input>
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
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
