import React, { useContext, useState } from 'react';

const ShoppingListContext = React.createContext();
const ShoppingListUpdateContext = React.createContext();
const ShoppingListCountContext = React.createContext();

export function useShoppingList() {
  return useContext(ShoppingListContext);
}

export function useShoppingListUpdate() {
  return useContext(ShoppingListUpdateContext);
}

export function useShoppingListCount() {
  return useContext(ShoppingListCountContext);
}

export function ShoppingListProvider({ children }) {
  const [shoppingList, setShoppingList] = useState('');
  const [shoppingListCount, setShoppingListCount] = useState(0);

  function updateShoppingList(ingredient) {
    setShoppingList(
      (prevShoppingList) => prevShoppingList + `\\n${ingredient}`
    );
    setShoppingListCount((prevShoppingListCount) => prevShoppingListCount + 1);
  }

  return (
    <ShoppingListContext.Provider value={shoppingList}>
      <ShoppingListCountContext.Provider value={shoppingListCount}>
        <ShoppingListUpdateContext.Provider value={updateShoppingList}>
          {children}
        </ShoppingListUpdateContext.Provider>
      </ShoppingListCountContext.Provider>
    </ShoppingListContext.Provider>
  );
}
