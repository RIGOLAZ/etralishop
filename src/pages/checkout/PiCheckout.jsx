import React, { useState } from 'react';
import PiNetwork from '@pinetwork/sdk';

const PiCheckout = ({ total, items, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const pi = new PiNetwork();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const payment = await pi.createPayment({
        amount: total,
        memo: 'Achat Etralishop',
        metadata: { items },
      });
      await pi.submitPayment(payment);
      const result = await pi.completePayment(payment);
      onSuccess(result.identifier);
    } catch (err) {
      console.error(err);
      alert('Erreur paiement : ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={handlePayment}
      className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
    >
      {loading ? 'Traitement…' : `Payer ${total} π`}
    </button>
  );
};

export default PiCheckout;