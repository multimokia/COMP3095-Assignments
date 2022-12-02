import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { deleteCookie, getCookie } from 'cookies-next';
import Image from 'next/image';
import { useUser } from '../lib/hooks';
import {
  useShoppingListCount,
  useShoppingListUpdateCount,
  useShoppingListUpdate,
} from '../context/ShoppingListContext';

export default function Navbar() {
  const router = useRouter();

  const shoppingListCount = useShoppingListCount();
  const updateShoppingListCount = useShoppingListUpdateCount();
  const updateShoppingList = useShoppingListUpdate();

  const [username, setUsername] = useState('');

  const { data: user, error: userError } = useUser();

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const logOut = () => {
    deleteCookie('jwt');
    deleteCookie('shoppingList');
    updateShoppingListCount(0);
    updateShoppingList('', 'clear');

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
        <div id="icon" className="flex items-center ">
          <div className="hover:cursor-pointer">
            <div className="flex flex-col relative ">
              <div className="flex items-center">
                {shoppingListCount > 0 && (
                  <div className="mr-1 ">{shoppingListCount}</div>
                )}
                <Link href="/profile/shoppinglist">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 mr-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </Link>
                <div
                  className="flex items-center "
                  onClick={() => setShowMenu(!showMenu)}
                >
                  <div className="flex">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt="profile image"
                        width={45}
                        height={45}
                        className="rounded-full hover:cursor-pointer"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-12 h-12 mr-1  border-gray-500 border-4 rounded-full p-2 hover:cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    )}
                  </div>
                  <a className="ml-3  hover:text-blue-500 hover:cursor-pointer">
                    {username}
                  </a>
                </div>
              </div>
              {showMenu && (
                <div id="tsalkbubble" className="relative top-10 z-10 ">
                  <div className="flex flex-col items-center">
                    <div className="flex-col items-center">
                      <Link href="/profile">
                        <a className="hover:cursor-pointer hover:text-blue-500">
                          profile
                        </a>
                      </Link>
                      <div
                        onClick={() => logOut()}
                        className="mt-3 hover:text-blue-500"
                      >
                        logout
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <div id="logout">
          <p
            className="bg-[#0070f3] hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded"
            onClick={() => logOut()}
          >
            Logout
          </p>
        </div> */}
      </div>
    </nav>
  );
}
