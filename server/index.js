const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/stkpush', (req, res) => {
  const { phone, amount } = req.body;
  if (!phone || !amount) {
    return res.status(400).json({ error: 'Missing phone or amount' });
  }

  // Simulate M-Pesa processing delay
  setTimeout(() => {
    const success = Math.random() > 0.2;
    if (success) {
      res.json({
        MerchantRequestID: `sim-${Date.now()}`,
        CheckoutRequestID: `ws_co_sim_${Math.random().toString(36).substr(2, 9)}`,
        ResponseCode: "0",
        ResponseDescription: "Success. Request accepted for processing",
        CustomerMessage: "Success. Request accepted for processing"
      });
    } else {
      res.status(400).json({
        error: "The transaction was declined by M-Pesa",
        ResponseCode: "1"
      });
    }
  }, 1500);
});

app.listen(3001, () => console.log('M-Pesa Simulator running on port 3001'));
