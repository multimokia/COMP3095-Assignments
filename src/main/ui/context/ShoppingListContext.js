import React, { useContext, useState, useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';

const ShoppingListContext = React.createContext();
const ShoppingListUpdateContext = React.createContext();
const ShoppingListCountContext = React.createContext();
const ShoppingListUpdateCountContext = React.createContext();

export function useShoppingList() {
  return useContext(ShoppingListContext);
}

export function useShoppingListUpdate() {
  return useContext(ShoppingListUpdateContext);
}

export function useShoppingListCount() {
  return useContext(ShoppingListCountContext);
}

export function useShoppingListUpdateCount() {
  return useContext(ShoppingListUpdateCountContext);
}

function getCountFromCookie() {
  const cookie = getCookie('shoppingList');
  if (cookie) {
    return cookie.split('\\n').length - 1;
  } else {
    return 0;
  }
}

export function ShoppingListProvider({ children }) {
  const [shoppingList, setShoppingList] = useState(getCookie('shoppingList'));
  const [shoppingListCount, setShoppingListCount] = useState(
    getCountFromCookie()
  );

  function updateShoppingList(ingredient, action = null) {
    if (action && action === 'delete') {
      let listToArr = shoppingList.split('\\n');
      listToArr.shift();
      let listMinusItem = listToArr.filter((item) => item != ingredient);
      let final = listMinusItem.join('\\n');
      if (final.length > 0) {
        final = '\\n' + final;
        setShoppingList(final);
      } else if (final == 0) {
        setShoppingList('a');
      }
      setShoppingListCount(
        (prevShoppingListCount) => prevShoppingListCount - 1
      );
    } else if (action) {
      setShoppingList('');
    } else {
      setShoppingList(
        (prevShoppingList) => prevShoppingList + `\\n${ingredient}`
      );
      setShoppingListCount(
        (prevShoppingListCount) => prevShoppingListCount + 1
      );
    }
  }

  useEffect(() => {
    document.cookie = `shoppingList=${shoppingList}; path=/; expires=${new Date(
      (Math.floor(Date.now() / 1000) + 60 * 60) * 1000
    ).toUTCString()};`;
  }, [shoppingList]);

  return (
    <ShoppingListContext.Provider value={shoppingList}>
      <ShoppingListCountContext.Provider value={shoppingListCount}>
        <ShoppingListUpdateCountContext.Provider value={setShoppingListCount}>
          <ShoppingListUpdateContext.Provider value={updateShoppingList}>
            {children}
          </ShoppingListUpdateContext.Provider>
        </ShoppingListUpdateCountContext.Provider>
      </ShoppingListCountContext.Provider>
    </ShoppingListContext.Provider>
  );
}
