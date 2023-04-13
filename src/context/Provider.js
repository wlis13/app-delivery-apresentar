import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState({});

  function sumCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartReduce = (cart.reduce(
      (acc, currentValue) => acc + currentValue.subTotal,
      0,
    ));
    setTotalPrice(cartReduce.toFixed(2));
  }

  const value = useMemo(() => ({
    totalPrice,
    user,
    setUser,
    sumCart,
  }), [totalPrice, user]);

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
