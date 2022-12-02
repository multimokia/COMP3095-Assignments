import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useUser } from '../../lib/hooks';
import { getCookie } from 'cookies-next';
import { IngredientListItem } from '../../components/IngredientListItem';
import { useShoppingList } from '../../context/ShoppingListContext';

export default function Shoppinglist() {
  const token = getCookie('jwt');

  const { data: user, error: userError } = useUser();

  const shoppingListCtx = useShoppingList();

  const [ingredients, setIngredients] = useState([]);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (shoppingListCtx) {
      let arr = shoppingListCtx.split('\\n');
      arr.shift();
      setIngredients(arr);
    }
  }, [shoppingListCtx]);

  //   function shoppingListToArary(shoppingList) {
  //     let shoppingListArray = [];
  //     for (let i = 0; i < shoppingList.length; i++) {
  //       shoppingListArray.push(shoppingList[i]);
  //     }
  //     return shoppingListArray;
  //   }

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
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-[4rem] pt-20 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8cdcbc] via-[#6287c2] to-[#b086d7]">
            Shopping List
          </h1>
        </div>
        <div className="w-[30rem]">
          <div
            id="ingredients"
            className="mt-10 flex flex-col items-center justify-center space-x-3"
          >
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
                      onMouseOver={() => setShowDelete(true)}
                      onMouseLeave={() => setShowDelete(false)}
            >
              {ingredients.length > 0 ? (
                <div className="flex flex-col">
                  {ingredients.map((ingredient, index) => (
                    <IngredientListItem
                      key={index}
                      ingredientName={ingredient}
                      showPlusIcons={false}
                      showDeleteIcons={showDelete}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <hr className="w-3 border border-b-1  mr-3 border-gray-700"></hr>
                    <div className="text-[#a2a0a6]">
                      No items yet. Add some ingredients to your shopping list!
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
