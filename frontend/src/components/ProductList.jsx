import { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/api';
import Alert from './Alert';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      console.log("Inizio chiamata API"); // Debug 1
      const { data } = await getProducts();
      console.log("Dati ricevuti:", data); // Debug 2
      
      if (!Array.isArray(data)) {
        throw new Error("Formato dati non valido");
      }

      setProducts(data);
    } catch (err) {
      console.error("Errore fetch:", err);
      setAlert({ 
        type: 'error', 
        message: err.message || 'Errore nel caricamento prodotti' 
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setAlert({ type: 'success', message: 'Prodotto eliminato' });
      await fetchProducts(); // Ricarica i dati dopo l'eliminazione
    } catch (err) {
      setAlert({ 
        type: 'error', 
        message: err.response?.data?.errore || 'Errore nell\'eliminazione'
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Caricamento prodotti...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {alert && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert(null)}
        />
      )}

      <h1 className="text-2xl font-bold mb-6">Lista Prodotti</h1>
      
      {products.length === 0 ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p>Nessun prodotto disponibile</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-4">
                <h3 className="font-bold text-lg">{product.nome}</h3>
                <p className="text-blue-600 font-semibold">€{product.prezzo?.toFixed(2)}</p>
                <p className="text-gray-600 mt-2 text-sm">{product.descrizione || 'Nessuna descrizione'}</p>
              </div>
              <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
                <button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
                  onClick={() => console.log("Modifica", product._id)}
                >
                  Modifica
                </button>
                <button 
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
                >
                  Elimina
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}