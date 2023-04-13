import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderPedidos from '../components/cliente-pedidos/header';
import Card from '../components/cliente-pedidos/card';
import Context from '../context/Context';

function Product() {
  const history = useHistory();

  const [products, setProducts] = useState([]);
  const { totalPrice } = useContext(Context);

  useEffect(() => {
    async function fetchProduct() {
      const endpoint = 'http://localhost:3001/product/';
      const result = await fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const productsList = await result.json();
      setProducts(productsList);
    }
    fetchProduct();
  }, []);

  return (
    <div>
      <h1>Product!</h1>
      <HeaderPedidos />
      <ul>
        { products.map((product) => (
          <Card
            key={ product.id }
            id={ product.id }
            name={ product.name }
            imag={ product.urlImage }
            price={ product.price }
          />)) }
      </ul>
      <button
        data-testid="customer_products__button-cart"
        type="button"
        disabled={ totalPrice === '0.00' }
        onClick={ () => {
          history.push('/customer/checkout');
        } }
      >
        <p data-testid="customer_products__checkout-bottom-value">
          { `${totalPrice}`.replace('.', ',') }
        </p>
      </button>
    </div>
  );
}

export default Product;
