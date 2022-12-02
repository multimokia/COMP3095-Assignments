import { useState } from 'react';
import { useShoppingListUpdate } from '../context/ShoppingListContext';
import { getCookie, setCookie } from 'cookies-next';

export function IngredientListItem({
  ingredientName,
  showPlusIcons,
  showDeleteIcon = false,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const updateShoppingList = useShoppingListUpdate();

  function addToList(ingredientName) {
    updateShoppingList(ingredientName);
    setIsClicked(true);
  }

  return (
    <div className="flex items-center   ">
      <hr className="w-3 border border-b-1  mr-3 border-gray-700"></hr>
      <div className=" flex items-center ">{ingredientName.slice(6)}</div>
      {showPlusIcons &&
        (isClicked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.9}
            stroke="#5ec56a"
            className="w-[1.3rem] h-[1.3rem] ml-1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.9}
            stroke={isHovered ? '#5ec56a' : 'currentColor'}
            className="w-[1.1rem] h-[1.1rem] ml-1.5 hover:cursor-pointer "
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => addToList(ingredientName)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        ))}
    </div>
  );
}
