import Head from 'next/head';
import { useState } from 'react';
import Image from 'next/image';

export default function EditProfile() {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [isImageSuccess, setIsImageSuccess] = useState(false);
  const [isImageSubmitting, setIsImageSubmitting] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  return (
    <div>
      <Head>
        <title>Recipe App</title>

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center ">
        <form className="flex flex-col items-center justify-center pt-20 ">
          <Image
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QAqRXhpZgAASUkqAAgAAAABADEBAgAHAAAAGgAAAAAAAABHb29nbGUAAP/bAIQAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFAEDBAQFBAUJBQUJFA0LDRQRFBQUFBQUExQUDRQUFBQUEBQTFBUUFBQUEhQVFBUQEhQUFBUSFRESFRQUEhIVFBQU/8AAEQgAIAAgAwERAAIRAQMRAf/EABkAAAIDAQAAAAAAAAAAAAAAAAcIBQYJA//EAC0QAAEDAwMCBQMFAQAAAAAAAAECAwQFESEABhIxQQcIUWGBFCJxFTNDofET/8QAHAEAAgICAwAAAAAAAAAAAAAABgcEBQEDAAII/8QALBEAAQMCAgkEAwEAAAAAAAAAAQIDEQAEITEFBhNBYXGRobESUYHwFKLhIv/aAAwDAQACEQMRAD8Az/ai37amVyiV4NUCNWtxsx5b/wBDFZJdckoaKlZFgDbOLKIHfN+mqq+9WBFWdmhKpBqS8atmRoE/9XhPOPRnnUMqckJCHHlKSpQcCAkWFkWOOpSNZsVmC2edZvGgmFpyyoWORfbVrVURUpS6S/UZbEWKyuRIeWG22mxdS1E2AA1occS2krWYAz5VIaaW8sNtiVHADjR38KvAneVI3NCnzm26Eyn9xl9YcW6k4KeKLptYk3JwQMegfe6xWBQUNkr4gYDjjB7Ud6P1X0l6w46kI4EyTwwkfM/HtbvMN4OVGtfQVOluoqDkZotrbKglakkp4pR2xY9bDPqLHpY6ds0q9BVnwMDn9mtmkNXb5wbRKMt0iTyx8xSyVCkvwHlMyWHI7qerbqClQ+Do0bdQ6PUgyOFATzK2VFLiSD7HCiJ5docd/wAaNntyiEsKmKCiSB/E5bJxe9rXxe2qzSaEuWbiFZEDyKs9ELU1fNOIzBJ/U+2NP3Kgxkqlx18v+8dRSPsI5AE5zYj8Ed9IF1vYLW2omQSBh3MwceVeh2nlOJQ6mIUAc5z5SD1rm1SqU+t5NUbU42EhKOJwDcX6f179etxIsXWEqO3nHKN3Thl39xqututKfx4nfPb+9soK4earb1PO24ctlrhKjyEpJSOygQQT6YHzbRnqlcOi5LajgR3FB2uVu2qyS9H+kkdDh9+KXnadak7S3FS61DsJNPktymwoYJQoKsfY2sfY6ZryA6goO/zuPwaUDDhZcDg3eN4+RIp2aVvmobzrTVYDK4Md7i08yQ45ywACeRPFQskWFumbkklZaVtrRVuVrI2sTgcz5I3CZyzpuaIfvQ+G0JOyBIxGQ47gd5iBjlERa5r7TrKmXJduX4Sr/dAKQQfUBTBiKAPmWr0dygMU5DqXX3X03SFgkJT91yO2QB86YGq1sv8AILxEAA9ThS+1yu0JswwDKlEdBjP33r//2Q==
                "
            alt="Red dot"
            width={100}
            height={100}
            className="rounded-full "
          />
          <h1 className="text-[4rem] ">
            <label
              class="block mb-2 mt-8 text-sm font-medium text-gray-900 dark:text-white"
              for="file_input"
            >
              Upload profile picture
            </label>
            <input
              class="block w-full text-sm  border  rounded-lg cursor-pointer  text-gray-400 focus:outline-non bg-inherit border-gray-600 placeholder-gray-400 "
              aria-describedby="file_input_help"
              id="file_input"
              type="file"
            />
            <p
              class="mt-1 text-sm text-gray-500 dark:text-gray-300"
              id="file_input_help"
            ></p>
          </h1>
        </form>
      </main>
    </div>
  );
}
