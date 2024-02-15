import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // this is our own custom provider!
  // we will store data (state) and functionality (updaters) in here
  // anyone can acces it via the consumer!

  const [cartOpen, setCartOpen] = useState(false);

  function openCart() {
    setCartOpen(true);
  }

  function closeCart() {
    setCartOpen(false);
  }

  return (
    <LocalStateProvider value={{ cartOpen, openCart, closeCart }}>
      {children}
    </LocalStateProvider>
  );
}

CartStateProvider.propTypes = {
  children: PropTypes.node,
};

CartStateProvider.defaultProps = {
  children: null,
};

// make a custom hook for access the cart local state
function useCart() {
  // use a consumer to access the local state
  const all = useContext(LocalStateContext);

  return all;
}

export {
  useCart,
  CartStateProvider,
};
