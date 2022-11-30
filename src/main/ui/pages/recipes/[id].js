import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

export default function Recipe() {
  const token = getCookie('jwt');
  const fetcher = async (url, token) =>
    await fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(
      (res) => res.json()
    );

  const router = useRouter();
  const { id } = router.query;

  const [isOpen, setIsOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleDelete = async () => {
    // const res = await fetch(`/api/recipes/${id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // const data = await res.json();

    if (true) {
      setIsDeleteOpen(true);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  };

  const { data: recipe, error: recipeError } = useSWR(
    token && id
      ? [`${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${id}`, token]
      : null,
    fetcher
  );

  const [steps, setSteps] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (recipe && !recipe.error) {
      setSteps(recipe.steps.split('\\n'));
      if (recipe.ingredients) setIngredients(recipe.ingredients.split('\\n'));
    }
  }, [recipe]);

  if (recipe && recipe.error) {
    return (
      <div>
        <p>{recipe.error}</p>
      </div>
    );
  }

  if (!recipe) {
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
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-[4rem] pt-20 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8cdcbc] via-[#6287c2] to-[#b086d7]">
            {recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1)}
          </h1>
        </div>
        <div className="w-[30rem]">
          <div
            id="ingredients"
            className="mt-10 flex flex-col items-center justify-center space-x-3"
          >
            <div className="font-semibold text-2xl">Ingredients</div>
            <div
              className="
                      mt-5
                      px-5
                      py-4
                      text-base
                      font-normal
                      text-white
                      border border-solid border-gray-700
                      rounded-lg
                      transition
                      ease-in-out
                      bg-inherit flex-1 w-full"
            >
              {/* TODO: Figure out a context for shopping list, 
                        for each ingredient, add a plus icon -> check icon and when clicked add
                        the ingredient to the value in context (have the context update the cookie value) */}
              {ingredients.length > 0 ? (
                <div className="flex flex-col">
                  {ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center">
                      <hr className="w-3 border border-b-1  mr-3 border-gray-700"></hr>
                      <div>{ingredient}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <hr className="w-3 border border-b-1  mr-3 border-gray-700"></hr>
                    <div className="text-[#a2a0a6]">
                      This recipe has no ingredients specified. Use your
                      imagination instead!
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mt-10 flex flex-col ">
            {steps.map((step, index) => (
              <div className="mb-5 " key={index}>
                <p className="text-xl">
                  {index + 1}. {step}
                </p>
              </div>
            ))}
          </div>
          {/* <button
            type="button"
            onClick={openModal}
            className="rounded-md bg-[#9d3a3a]  px-8 py-2 text-sm font-medium text-white hover:bg-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Delete
          </button> */}

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-r from-[#858b99] via-[#81899c] to-[#44464d] p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-white"
                      >
                        Are you sure you want to delete this recipe?
                      </Dialog.Title>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            closeModal();
                            handleDelete();
                          }}
                        >
                          Yes, delete it
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>

          <Transition appear show={isDeleteOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setIsDeleteOpen(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-r from-[#858b99] via-[#81899c] to-[#44464d] p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-white"
                      >
                        Deleted successfully!
                      </Dialog.Title>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </main>
    </div>
  );
}
