import { useState } from 'react';
import { createProduct, updateProduct } from '../services/api';

export default function ProductForm({ product, onSuccess }) {
  const [formData, setFormData] = useState({
    nome: product?.nome || '',
    prezzo: product?.prezzo || '',
    descrizione: product?.descrizione || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (product?._id) {
        await updateProduct(product._id, formData);
      } else {
        await createProduct(formData);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Nome</label>
        <input
          type="text"
          value={formData.nome}
          onChange={(e) => setFormData({...formData, nome: e.target.value})}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <div>
        <label className="block">Prezzo</label>
        <input
          type="number"
          step="0.01"
          value={formData.prezzo}
          onChange={(e) => setFormData({...formData, prezzo: e.target.value})}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <div>
        <label className="block">Descrizione</label>
        <textarea
          value={formData.descrizione}
          onChange={(e) => setFormData({...formData, descrizione: e.target.value})}
          className="border p-2 w-full rounded"
        />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {product?._id ? 'Aggiorna' : 'Crea'} Prodotto
      </button>
    </form>
  );
}