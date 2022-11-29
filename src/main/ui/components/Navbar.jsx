import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUserName } from '../lib/hooks';
import { getCookie, deleteCookie } from 'cookies-next';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();
  const jwt = getCookie('jwt');

  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

  const logOut = () => {
    localStorage.removeItem('username');
    deleteCookie('jwt');
    router.push('/');
  };

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
          // onClick={() => goToProfile()}
        >
          <Link href="/profile">
            <div className="flex items-center ">
              <div className="flex">
                <Image
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QAqRXhpZgAASUkqAAgAAAABADEBAgAHAAAAGgAAAAAAAABHb29nbGUAAP/bAIQAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFAEDBAQFBAUJBQUJFA0LDRQRFBQUFBQUExQUDRQUFBQUEBQTFBUUFBQUEhQVFBUQEhQUFBUSFRESFRQUEhIVFBQU/8AAEQgAIAAgAwERAAIRAQMRAf/EABkAAAIDAQAAAAAAAAAAAAAAAAcIBQYJA//EAC0QAAEDAwMCBQMFAQAAAAAAAAECAwQFESEABhIxQQcIUWGBFCJxFTNDofET/8QAHAEAAgICAwAAAAAAAAAAAAAABgcEBQEDAAII/8QALBEAAQMCAgkEAwEAAAAAAAAAAQIDEQAEITEFBhNBYXGRobESUYHwFKLhIv/aAAwDAQACEQMRAD8Az/ai37amVyiV4NUCNWtxsx5b/wBDFZJdckoaKlZFgDbOLKIHfN+mqq+9WBFWdmhKpBqS8atmRoE/9XhPOPRnnUMqckJCHHlKSpQcCAkWFkWOOpSNZsVmC2edZvGgmFpyyoWORfbVrVURUpS6S/UZbEWKyuRIeWG22mxdS1E2AA1occS2krWYAz5VIaaW8sNtiVHADjR38KvAneVI3NCnzm26Eyn9xl9YcW6k4KeKLptYk3JwQMegfe6xWBQUNkr4gYDjjB7Ud6P1X0l6w46kI4EyTwwkfM/HtbvMN4OVGtfQVOluoqDkZotrbKglakkp4pR2xY9bDPqLHpY6ds0q9BVnwMDn9mtmkNXb5wbRKMt0iTyx8xSyVCkvwHlMyWHI7qerbqClQ+Do0bdQ6PUgyOFATzK2VFLiSD7HCiJ5docd/wAaNntyiEsKmKCiSB/E5bJxe9rXxe2qzSaEuWbiFZEDyKs9ELU1fNOIzBJ/U+2NP3Kgxkqlx18v+8dRSPsI5AE5zYj8Ed9IF1vYLW2omQSBh3MwceVeh2nlOJQ6mIUAc5z5SD1rm1SqU+t5NUbU42EhKOJwDcX6f179etxIsXWEqO3nHKN3Thl39xqututKfx4nfPb+9soK4earb1PO24ctlrhKjyEpJSOygQQT6YHzbRnqlcOi5LajgR3FB2uVu2qyS9H+kkdDh9+KXnadak7S3FS61DsJNPktymwoYJQoKsfY2sfY6ZryA6goO/zuPwaUDDhZcDg3eN4+RIp2aVvmobzrTVYDK4Md7i08yQ45ywACeRPFQskWFumbkklZaVtrRVuVrI2sTgcz5I3CZyzpuaIfvQ+G0JOyBIxGQ47gd5iBjlERa5r7TrKmXJduX4Sr/dAKQQfUBTBiKAPmWr0dygMU5DqXX3X03SFgkJT91yO2QB86YGq1sv8AILxEAA9ThS+1yu0JswwDKlEdBjP33r//2Q==
                "
                  alt="profile image"
                  width={45}
                  height={45}
                  className="rounded-full"
                />
              </div>
              <a className="ml-3">
                {/* {username.charAt(0).toUpperCase() + username.slice(1)} */}
                {username}
              </a>
            </div>
          </Link>
        </div>
        <div id="logout">
          {/* <Link href="/api/logout"> */}
          <p
            className="bg-[#0070f3] hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded"
            onClick={() => logOut()}
          >
            Logout
          </p>
          {/* </Link> */}
        </div>
      </div>
    </nav>
  );
}
