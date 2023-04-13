import { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context/Context';

function CheckoutForm() {
  const history = useHistory();
  const [sellerList, setSellerList] = useState([]);
  const [selectedSellerId, setSelectedSellerId] = useState('');
  const [form, setForm] = useState({
    address: '',
    number: '',
  });
  const { totalPrice } = useContext(Context);

  useEffect(() => {
    async function getSellerList() {
      const endpoint = 'http://localhost:3001/user/seller';

      const response = await fetch(endpoint, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const sellersFromDB = await response.json();
      setSellerList(sellersFromDB);
    }
    getSellerList();
  }, []);

  useEffect(() => {
    if (sellerList.length > 0) {
      setSelectedSellerId(sellerList[0].id);
    }
  }, [sellerList]);

  function makeSaleObj() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const user = JSON.parse(localStorage.getItem('user'));

    const products = cart.reduce((acc, curr) => {
      const { productId, quantity } = curr;
      return [...acc, { productId, quantity }];
    }, []);

    const sale = {
      userId: user.id,
      sellerId: selectedSellerId,
      totalPrice,
      deliveryAddress: form.address,
      deliveryNumber: form.number,
      status: 'Pendente',
      products,
      saleDate: new Date().toISOString(),
    };
    return sale;
  }

  async function registerSale() {
    const endpoint = 'http://localhost:3001/sale';
    const sale = makeSaleObj();
    const creationResponse = await fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(sale),
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('user')).token,
      },
    });

    const CREATED_CODE = 201;
    if (creationResponse.status === CREATED_CODE) {
      const { id: saleId } = await creationResponse.json();
      history.push(`/customer/orders/${saleId}`);
    }
  }

  function handleChange({ target }) {
    const fieldName = target.name;
    const fieldValue = target.value;
    setForm({ ...form, [fieldName]: fieldValue });
  }

  return (
    <form>
      <label htmlFor="seller">
        <p>P. Vendedora Responsável:</p>
        <select
          onChange={ handleChange }
          data-testid="customer_checkout__select-seller"
          id="seller"
          name="sellerId"
          value={ selectedSellerId }
        >
          {
            sellerList.map((seller) => {
              const { id, name } = seller;
              return (
                <option key={ id } value={ id }>{name}</option>
              );
            })
          }
        </select>
      </label>
      <label htmlFor="address">
        <p>Endereço</p>
        <input
          data-testid="customer_checkout__input-address"
          type="text"
          id="address"
          name="address"
          value={ form.address }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="number">
        <p>Número</p>
        <input
          type="number"
          id="number"
          name="number"
          data-testid="customer_checkout__input-address-number"
          value={ form.number }
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ registerSale }
      >
        Finalizar Pedido
      </button>
    </form>
  );
}

export default CheckoutForm;
