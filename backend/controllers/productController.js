const Product = require("../models/product");

// Create
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ 
      errore: "Validazione fallita",
      dettagli: err.message 
    });
  }
};

// Read All
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ errore: "Errore nel fetch" });
  }
};

// Read One
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ errore: "Prodotto non trovato" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ errore: "ID non valido" });
  }
};

// Update
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ errore: "Prodotto non trovato" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ errore: "Validazione fallita" });
  }
};

// Delete
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ errore: "Prodotto non trovato" });
    }
    res.status(200).json({ messaggio: "Prodotto eliminato" });
  } catch (err) {
    res.status(500).json({ errore: "Errore server" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};