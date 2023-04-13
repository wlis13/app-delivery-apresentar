import React, { useEffect, useState } from 'react';
import '../user-table/table.css';
import { useHistory } from 'react-router-dom';

function SellerDetails() {
  const history = useHistory();
  const [getOrder, setOrder] = useState([]);
  const [seller, setSeller] = useState({});
  const [getCart, setCart] = useState([]);
  const [ordersStatus, setOrdersStatus] = useState({});
  const [check, isCheck] = useState(true);

  const getUrl = history.location.pathname;
  const CARACTER_NUMBER = 15;
  const getIdUrl = getUrl.substring(CARACTER_NUMBER);

  const CARACTER_DATA = 10;

  function getLocalStorage() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    setCart(cart);
  }

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem('user'));
    async function fetchOrders() {
      const response = await fetch(`http://localhost:3001/sale/orders/${id}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      const test = data.filter((iten) => iten.id === Number(getIdUrl));
      console.log(test);
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
    return status !== 'Pendente';
  }

  function disabledButton2(status) {
    return status !== 'Preparando';
  }

  function handlePreparingOrder(status) {
    setOrdersStatus({
      ...getOrder,
      [status]: 'Preparando',
    });
    isCheck(false);
  }

  function handleDispatchOrder(status) {
    setOrdersStatus({
      ...getOrder,
      [status]: 'Em Trânsito',
    });
  }

  const TEST_PREFIX = 'seller_order_details__element-order-details-';

  return (
    <div className="improviso">
      <h1>Detalhes do pedido</h1>
      {getOrder ? getOrder.map((iten) => (
        <div key={ iten.id }>
          <p
            data-testid={ `${TEST_PREFIX}label-order-id` }
          >
            { iten.id }
          </p>
          <p
            data-testid={ `${TEST_PREFIX}label-seller-name ` }
          >
            { seller.name }
          </p>
          <p
            data-testid={ `${TEST_PREFIX}label-order-date ` }
          >
            { getOrder[0].saleDate.substring(0, CARACTER_DATA)
              .split('-').reverse().join('/') }
          </p>
          <p
            data-testid={ `${TEST_PREFIX}label-delivery-status ` }
          >
            { check ? getOrder[0].status : ordersStatus[0].status }
          </p>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            disabled={ disabledButton(getOrder[0].status) }
            onClick={ () => handlePreparingOrder(getOrder[0].status) }
          >
            PREPARAR PEDIDOS

          </button>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            disabled={ disabledButton2(getOrder[0].status) }
            onClick={ () => handleDispatchOrder(getOrder[0].status) }
          >
            SAIU PARA ENTREGA

          </button>
          <p data-testid="seller_order_details__element-order-total-price">
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

export default SellerDetails;
