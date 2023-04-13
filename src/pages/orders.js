import HeaderPedidos from '../components/cliente-pedidos/header';
import SellerTable from '../components/seller-table/table';
import UserTable from '../components/user-table/table';
import HeaderSeller from '../components/seller-header/sellerHeader';

function CustomerOrders() {
  const { role } = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      {role === 'seller' ? <HeaderSeller /> : <HeaderPedidos />}
      {role === 'seller' ? <SellerTable /> : <UserTable />}
    </div>
  );
}

export default CustomerOrders;
