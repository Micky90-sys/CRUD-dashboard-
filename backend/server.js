const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Configurazione CORS (prima dei route handler)
app.use(cors({
  origin: 'http://localhost:3000', // Solo il tuo frontend può chiamare l'API
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("API CRUD attiva!");
});

// DB Connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connesso!");
    app.listen(PORT, () => {
      console.log(`🚀 Server attivo su http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log("❌ Errore MongoDB:", err));