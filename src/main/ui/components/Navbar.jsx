import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUserName } from '../lib/hooks';

export default function Navbar() {
  const router = useRouter();

  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

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

      <div className="flex relative ml-10 xl:left-52 lg:left-32 space-x-5  ">
        <div
          id="icon"
          className="flex  hover:text-blue-500 hover:cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <Link href="/profile">
            <a>{username}</a>
          </Link>
        </div>
        <div id="logout">
          <Link href="/api/logout">
            <a className="bg-[#0070f3] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
