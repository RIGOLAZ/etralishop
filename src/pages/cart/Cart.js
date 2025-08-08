import React from 'react';
import { useSelector } from 'react-redux';
import PiCheckout from '../../components/PiCheckout';
import { useDispatch } from 'react-redux';

const Cart = () => {
const cart = useSelector(state => state.cart);
const getTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
const dispatch = useDispatch();
const removeFromCart = id => dispatch({ type: 'cart/removeFromCart', payload: id });
const clearCart = () => dispatch({ type: 'cart/clearCart' });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mon Panier</h1>

      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <div className="divide-y">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center py-3">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>{item.price * item.qty} π</span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Retirer
                </button>
              </div>
            ))}
          </div>

          <p className="text-xl font-semibold mt-4">Total : {getTotal()} π</p>

          <PiCheckout
            total={getTotal()}
            items={cart.map(i => ({ id: i.id, qty: i.qty }))}
            onSuccess={(txid) => {
              alert(`Paiement réussi ! TxID : ${txid}`);
              clearCart();
              window.location.href = '/';
            }}
          />
        </>
      )}
    </div>
  );
};

export default Cart;