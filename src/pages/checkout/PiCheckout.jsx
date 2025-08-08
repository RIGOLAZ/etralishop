import React, { useState } from 'react';

const PiCheckout = ({ total, items, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!window.Pi) {
      alert("Utilise le Pi Browser ou l’extension SDK !");
      return;
    }
    setLoading(true);
    try {
      const payment = await window.Pi.createPayment({
        amount: total,
        memo: 'Achat Etralishop',
        metadata: { items },
      });
      await window.Pi.submitPayment(payment);
      const result = await window.Pi.completePayment(payment);
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