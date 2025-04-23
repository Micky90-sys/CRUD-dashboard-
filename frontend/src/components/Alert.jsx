export default function Alert({ type, message, onClose }) {
    const colors = {
      error: 'bg-red-50 border-red-400 text-red-700',
      success: 'bg-green-50 border-green-400 text-green-700',
      warning: 'bg-yellow-50 border-yellow-400 text-yellow-700'
    };
  
    return (
      <div className={`${colors[type]} border-l-4 p-4 mb-6 rounded`}>
        <div className="flex justify-between items-center">
          <p>{message}</p>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }