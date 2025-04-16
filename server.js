
require('dotenv').config(); // For environment variables
const sg91m = require('./sg91m');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
 const MSG91 = require("msg91-api");
 const morgan = require('morgan');
 const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Configuration (using environment variables)
const MSG91_API_KEY = process.env.MSG91_API_KEY || "447062A0aLF44zdiTt67ff6e25P1";
const TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID || "67ff8605d6fc057f94554e62";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});



console.log("Environment Verification:", {
  API_KEY: process.env.MSG91_API_KEY ? "✔ Loaded" : "✖ Missing",
  TEMPLATE_ID: process.env.MSG91_TEMPLATE_ID ? "✔ Loaded" : "✖ Missing"
});

if (!MSG91_API_KEY || !TEMPLATE_ID) {
  console.error("❌ Missing required environment variables:");
  console.log(`MSG91_API_KEY: ${MSG91_API_KEY ? 'Exists' : 'Missing'}`);
  console.log(`TEMPLATE_ID: ${TEMPLATE_ID ? 'Exists' : 'Missing'}`);
  process.exit(1);
}

// Initialize MSG91 with error handling
let msg91;
try {
  msg91 = new MSG91(MSG91_API_KEY);
  console.log("✅ MSG91 initialized successfully");
} catch (err) {
  console.error("❌ MSG91 initialization failed:", err.message);
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(morgan('dev')); // Request logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ 
      success: false,
      error: "Invalid JSON format in request body" 
    });
  }
  next();
});

// Health check route
app.get('/', (req, res) => {
  res.json({
    status: 'active',
    service: 'OTP Service',
    version: '1.0.0'
  });
});

// OTP Route with comprehensive validation
app.post('/send-otp', async (req, res) => {
  const { phone } = req.body;

  if (!/^\+92\d{10}$/.test(phone)) {
    return res.status(400).json({
      success: false,
      error: "Invalid format. Use +923001234567"
    });
  }

  try {
    const data = await sg91m.sendOtp(phone);
    res.json({
      success: true,
      message: "OTP sent successfully",
      data
    });
  } catch (error) {
    console.error("MSG91 OTP Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: "OTP service error",
      details: error.response?.data || error.message
    });
  }
});


// Verify OTP endpoint
app.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const isValid = await sg91m.verifyOtp(phone, otp);
    if (!isValid) throw new Error("Invalid OTP");

    const user = await admin.auth().createUser({ phoneNumber: phone });
    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    available_endpoints: {
      GET: ["/"],
      POST: ["/send-otp"]
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📞 OTP Endpoint: POST http://localhost:${PORT}/send-otp`);
  console.log(`📞 OTP Endpoint: POST http://localhost:${PORT}/verify-otp`);
  console.log(`🔑 MSG91 Status: ${msg91 ? "Connected" : "Disconnected"}\n`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});