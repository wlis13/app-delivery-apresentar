import React from 'react';
import HeaderPedidos from '../components/cliente-pedidos/header';
import HeaderSeller from '../components/seller-header/sellerHeader';
import SellerDetails from '../components/seller-table/seller-details';
import UserDetails from '../components/user-table/user-details';

function OrderDetails() {
  const { role } = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <div>
        {role === 'seller' ? <HeaderSeller /> : <HeaderPedidos />}
        {role === 'seller' ? <SellerDetails /> : <UserDetails />}
      </div>
    </div>
  );
}

export default OrderDetails;
