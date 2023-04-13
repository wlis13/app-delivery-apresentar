import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import Context from '../../context/Context';

function HeaderPedidos() {
  const history = useHistory();
  // const { user } = useContext(Context);
  const { name } = JSON.parse(localStorage.getItem('user'));
  return (
    <header>
      <nav>
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <Link
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
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

export default HeaderPedidos;
