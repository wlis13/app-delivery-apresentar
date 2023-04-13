import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTable() {
  const [orders, setOrders] = useState([]);

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
      setOrders(data);
    }
    fetchOrders();
  }, []);

  const SUBSTR = 10;

  return (
    <div>
      <table>
        <tbody>
          {orders.length > 0 && orders.map((order) => (
            <div key={ order.id }>
              <Link to={ `/customer/orders/${order.id}` }>
                <tr>
                  <td
                    data-testid={ `customer_orders__element-order-id-${order.id}` }
                  >
                    {order.id}
                  </td>
                  <td
                    data-testid={ `customer_orders__element-delivery-status-${order.id}` }
                  >
                    {order.status}
                  </td>
                  <td
                    data-testid={ `customer_orders__element-order-date-${order.id}` }
                  >
                    {order.saleDate
                      .toLocaleString().substr(0, SUBSTR).split('-').reverse()
                      .join('/') }
                  </td>

                  <td
                    data-testid={ `customer_orders__element-card-price-${order.id}` }
                  >
                    {order.totalPrice.replace(/\./, ',')}
                  </td>
                </tr>
              </Link>
            </div>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
