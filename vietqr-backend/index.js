// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Sử dụng thông tin Basic Auth được mã hóa từ "customer-vietqrtest-user2468:Y3VzdG9tZXItdmlldHFydGVzdC11c2VyMjQ2OA=="
// Chuỗi dưới đây được tạo ra khi base64 encode "customer-vietqrtest-user2468:Y3VzdG9tZXItdmlldHFydGVzdC11c2VyMjQ2OA=="
const BASIC_AUTH = 'Basic Y3VzdG9tZXItdmlldHFydGVzdC11c2VyMjQ2ODpZM1Z6ZEc5dFpYSXRkbWxsZEhGeWRHVnpkQzExYzJWeU1qUTJPQT09';

// URL của API VietQR
const TOKEN_URL = 'https://api.vietqr.org/vqr/api/token_generate';
const GENERATE_URL = 'https://api.vietqr.org/vqr/api/qr/generate-customer';

const app = express();
app.use(cors());          // Cho phép truy cập từ các domain khác (nếu cần)
app.use(express.json());  // Hỗ trợ parse JSON body

/**
 * Endpoint: POST /api/generate-qr
 * Body: { bankCode, accountNumber, accountHolder, amount, content }
 */
app.post('/api/generate-qr', async (req, res) => {
  try {
    // Lấy dữ liệu người dùng gửi lên từ frontend
    const { bankCode, accountNumber, accountHolder, amount, content } = req.body;

    // 1) Gọi API token_generate để lấy access_token
    const tokenRes = await axios.post(
      TOKEN_URL,
      {}, // body rỗng
      {
        headers: {
          Authorization: BASIC_AUTH,
          // Nếu cần, thêm Cookie: 'JSESSIONID=...'
        }
      }
    );
    const accessToken = tokenRes.data.access_token;

    // 2) Gọi API generate-customer với Bearer token và dữ liệu người dùng
    const qrRes = await axios.post(
      GENERATE_URL,
      {
        amount,                // Số tiền
        content,               // Nội dung
        bankAccount: accountNumber,
        bankCode,
        userBankName: accountHolder,
        transType: 'C',
        orderId: 'myOrderId123', // Có thể thay đổi theo ý muốn
        sign: '',
        qrType: '0'
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          // Nếu cần, thêm Cookie: 'JSESSIONID=YOUR_COOKIE_VALUE'
        }
      }
    );

    // Lấy chuỗi qrCode từ response của API VietQR
    const { qrCode } = qrRes.data;
    return res.json({ qrCode });
  } catch (error) {
    console.error('Lỗi generate-qr:', error.response?.data || error.message);
    return res.status(500).json({ message: 'Không thể tạo QR' });
  }
});

// Chạy server trên cổng 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend đang chạy ở cổng ${PORT}`);
});
