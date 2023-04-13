import React, { useEffect, useState } from 'react';
import './table.css';
import { useHistory } from 'react-router-dom';

function UserDetails() {
  const history = useHistory();
  const [getOrder, setOrder] = useState([]);
  const [seller, setSeller] = useState({});
  const [getCart, setCart] = useState([]);

  const getUrl = history.location.pathname;
  const CARACTER_NUMBER = 17;
  const getIdUrl = getUrl.substring(CARACTER_NUMBER);

  const CARACTER_DATA = 10;

  function getLocalStorage() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    setCart(cart);
  }

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem('user'));
    async function fetchOrders() {
      const response = await fetch(`http://localhost:3001/customer/orders/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const test = data.filter((iten) => iten.id === Number(getIdUrl));
      setOrder(test);
    }
    fetchOrders();
    getLocalStorage();
  }, []);

  useEffect(() => {
    async function findUserById() {
      if (getOrder.length > 0 && getOrder[0].sellerId) {
        const response = await fetch(`http://localhost:3001/user/id/${getOrder[0].sellerId}`, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const dataSeller = await response.json();
        setSeller(dataSeller);
      }
    }
    findUserById();
  }, [getOrder, setOrder]);

  function disabledButton(status) {
    return status !== 'Entregue';
  }

  const dataTest = 'customer_order_details__element-order-details-label-delivery-status';

  return (
    <div className="improviso">
      <h1>Detalhes do produto</h1>
      {getOrder ? getOrder.map((iten) => (
        <div key={ iten.id }>
          <p
            data-testid="customer_order_details__element-order-details-label-order-id"
          >
            { iten.id }
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-seller-name"
          >
            { seller.name }
          </p>
          <p
            data-testid="customer_order_details__element-order-details-label-order-date"
          >
            { getOrder[0].saleDate.substring(0, CARACTER_DATA)
              .split('-').reverse().join('/') }
          </p>
          <p
            data-testid={ dataTest }
          >
            { getOrder[0].status }
          </p>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            disabled={ disabledButton(getOrder[0].status) }
          >
            MARCAR COMO ENTREGUE

          </button>
          <p data-testid="customer_order_details__element-order-total-price">
            {`Total: R$ ${getOrder[0].totalPrice.replace('.', ',')}`}
          </p>
        </div>
      )) : <p>Loading...</p>}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            getCart.map((product, index) => {
              const { name, productId, quantity, unitPrice, subTotal } = product;

              // test ids
              const TEST_PREFIX = 'customer_order_details__element-order-table-';

              return (
                <tr key={ productId }>
                  <td>
                    <span
                      data-testid={ `${TEST_PREFIX}item-number-${index}` }
                    >
                      { index + 1}
                    </span>
                  </td>
                  <td>
                    <span
                      data-testid={ `${TEST_PREFIX}name-${index}` }
                    >
                      {name}
                    </span>
                  </td>
                  <td>
                    <span
                      data-testid={ `${TEST_PREFIX}quantity-${index}` }
                    >
                      {quantity}
                    </span>
                  </td>
                  <td>
                    <span
                      data-testid={ `${TEST_PREFIX}unit-price-${index}` }
                    >
                      {Number(unitPrice).toFixed(2).replace('.', ',')}
                    </span>
                  </td>
                  <td>
                    <span
                      data-testid={ `${TEST_PREFIX}sub-total-${index}` }
                    >
                      {Number(subTotal).toFixed(2).replace('.', ',')}
                    </span>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default UserDetails;
