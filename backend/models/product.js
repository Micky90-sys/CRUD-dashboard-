const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Il nome del prodotto è obbligatorio'],
    trim: true,
    maxlength: [100, 'Il nome non può superare i 100 caratteri']
    // 🚨 RIMOSSO `unique: true` da qui (lo definiamo dopo)
  },
  prezzo: {
    type: Number,
    required: [true, 'Il prezzo è obbligatorio'],
    min: [0, 'Il prezzo non può essere negativo']
  }
}, { 
  timestamps: true 
});

// 🔥 Definizione UNICA dell'indice (aggiungi questa riga)
productSchema.index({ nome: 1 }, { 
  unique: true,
  collation: { locale: 'it', strength: 2 } // Case-insensitive
});

module.exports = mongoose.model('Product', productSchema);