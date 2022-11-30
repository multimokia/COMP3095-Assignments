import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCookie, deleteCookie } from 'cookies-next';
import Image from 'next/image';
import { useUser } from '../lib/hooks';

export default function Navbar() {
  const router = useRouter();

  const [username, setUsername] = useState('');

  const { data: user, error: userError } = useUser();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const logOut = () => {
    deleteCookie('jwt');
    router.push('/');
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
    <nav className="flex justify-center items-center mt-10 mx-auto relative ">
      <div id="nav-links" className="  flex justify-center gap-11 ml-64   ">
        <Link href="/">
          <a className="bg-[#0070f3] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
            All Recipes
          </a>
        </Link>
        <Link href="/recipes/create">
          <a className="bg-[#0070f3] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create Recipe
          </a>
        </Link>
        <Link href="/mealplans">
          <a className="bg-[#0070f3] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Plan Meal
          </a>
        </Link>
      </div>

      <div className="flex items-center relative ml-10 xl:left-52 lg:left-32 space-x-5  ">
        <div
          id="icon"
          className="flex items-center  hover:text-blue-500 hover:cursor-pointer"
        >
          <Link href="/profile">
            <div className="flex items-center ">
              <div className="flex">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="profile image"
                    width={45}
                    height={45}
                    className="rounded-full"
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
              </div>
              <a className="ml-3">{username}</a>
            </div>
          </Link>
        </div>
        <div id="logout">
          <p
            className="bg-[#0070f3] hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded"
            onClick={() => logOut()}
          >
            Logout
          </p>
        </div>
      </div>
    </nav>
  );
}
