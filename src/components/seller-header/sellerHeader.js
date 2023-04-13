import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import Context from '../../context/Context';

function HeaderSeller() {
  const history = useHistory();
  // const { user } = useContext(Context);
  const { name } = JSON.parse(localStorage.getItem('user'));
  return (
    <header>
      <nav>
        <Link
          to="/seller/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Pedidos
        </Link>
        <Link
          to="/"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { name }
        </Link>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => {
            localStorage.removeItem('user');
            history.push('/');
          } }
        >
          Sair
        </button>
      </nav>
    </header>
  );
}

export default HeaderSeller;
