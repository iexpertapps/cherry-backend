// sg91m.js
const axios = require('axios');

const MSG91_API_KEY = process.env.MSG91_API_KEY;
const BASE_URL = 'https://api.msg91.com/api/v5/otp';

async function sendOtp(mobile, sender = 'CHERRY', template_id = process.env.MSG91_TEMPLATE_ID, otp_length = 6) {
  const payload = {
    authkey: MSG91_API_KEY,
    mobile: mobile.replace('+', ''),
    template_id,
    sender,
    otp_length
  };

  const response = await axios.post(BASE_URL, payload, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  return response.data;
}

async function verifyOtp(mobile, otp) {
  const response = await axios.get(`${BASE_URL}/verify`, {
    params: {
      authkey: MSG91_API_KEY,
      mobile: mobile.replace('+', ''),
      otp
    }
  });

  return response.data && response.data.type === 'success';
}

module.exports = {
  sendOtp,
  verifyOtp
};
