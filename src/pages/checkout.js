import CheckoutTable from '../components/checkout/checkoutTable';
import CheckoutForm from '../components/checkout/checkoutForm';
import HeaderPedidos from '../components/cliente-pedidos/header';

function Checkout() {
  return (
    <div>
      <HeaderPedidos />
      <CheckoutTable />
      <CheckoutForm />
    </div>
  );
}

export default Checkout;
