import React, { useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import './QrForm.css';
import bankList from './banklist.js';

/* Danh sách ngân hàng (rút gọn). Bổ sung nếu cần */


// Thay thế hàm removeDiacritics / sanitizeInput cũ bằng hàm mới:
function sanitizeInput(str) {
  // Thay Đ/đ
  str = str.replace(/Đ/g, 'D').replace(/đ/g, 'd');
  // Xóa dấu
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
  // Thay ký tự đặc biệt
  str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');
  // Gộp khoảng trắng
  str = str.replace(/\s+/g, ' ').trim();
  // Chuyển hoa
  return str.toUpperCase();
}

// Định dạng tiền (thêm "VNĐ")
function formatCurrency(amount) {
  const value = Number(amount) || 0;
  const formatted = new Intl.NumberFormat('vi-VN').format(value);
  return formatted + ' VNĐ';
}

// Chuyển số thành chữ (đơn giản)
function convertNumberToWords(num) {
  // ... nội dung hàm cũ ...
  const so = ['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín'];
  let n = parseInt(num, 10);
  if (isNaN(n) || n < 0) return '';
  if (n === 0) return 'Không đồng';
  const chuSo = ['', ' nghìn', ' triệu', ' tỷ', ' nghìn tỷ', ' triệu tỷ'];

  function doc3So(block) {
    let tram = Math.floor(block / 100);
    let chuc = Math.floor((block % 100) / 10);
    let donvi = block % 10;
    let s = '';
    if (tram !== 0) {
      s += so[tram] + ' trăm';
      if (chuc === 0 && donvi !== 0) s += ' lẻ';
    }
    if (chuc !== 0 && chuc !== 1) {
      s += ' ' + so[chuc] + ' mươi';
      if (donvi === 5) {
        s += ' lăm';
        return s.trim();
      }
    } else if (chuc === 1) {
      s += ' mười';
      if (donvi === 5) {
        s += ' lăm';
        return s.trim();
      }
    }
    if (donvi !== 0 && donvi !== 5) {
      if ((donvi === 1) && (chuc !== 0) && (chuc !== 1)) {
        s += ' mốt';
      } else {
        s += ' ' + so[donvi];
      }
    }
    return s.trim();
  }

  let blocks = [];
  while (n > 0) {
    blocks.push(n % 1000);
    n = Math.floor(n / 1000);
  }
  let str = '';
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] !== 0) {
      let part = doc3So(blocks[i]);
      if (part !== '') {
        str = part + chuSo[i] + ' ' + str;
      }
    }
  }
  str = str.trim() + ' đồng';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Copy text
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert('Đã copy!'))
    .catch(() => alert('Không thể copy'));
}

function QrForm() {
  const [bankCode, setBankCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [amount, setAmount] = useState('');
  const [content, setContent] = useState('');
  const [qrCode, setQrCode] = useState('');

  const [showBankSearch, setShowBankSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc danh sách ngân hàng
  const filteredBanks = bankList.filter(
    (bank) =>
      bank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bank.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Chọn ngân hàng
  const handleSelectBank = (bank) => {
    setBankCode(bank.code);
    setBankName(bank.name);
    setShowBankSearch(false);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) Sanitize các trường ngay trước khi gửi
    const sanitizedAccountNumber = sanitizeInput(accountNumber);
    const sanitizedHolder = sanitizeInput(accountHolder);
    const sanitizedAmount = sanitizeInput(amount);
    const sanitizedContent = sanitizeInput(content);

    // 2) Cập nhật lại state (để hiển thị trên giao diện)
    setAccountNumber(sanitizedAccountNumber);
    setAccountHolder(sanitizedHolder);
    setAmount(sanitizedAmount);
    setContent(sanitizedContent);

    try {
      // 3) Gọi API với dữ liệu đã làm sạch
      const res = await axios.post('http://localhost:3001/api/generate-qr', {
        bankCode,
        accountNumber: sanitizedAccountNumber,
        accountHolder: sanitizedHolder,
        amount: sanitizedAmount,
        content: sanitizedContent,
      });
      setQrCode(res.data.qrCode);
    } catch (error) {
      console.error('Lỗi:', error.response?.data || error.message);
      alert('Không thể tạo QR');
    }
  };

  return (
    <div className="qr-main-container">
      {/* Cột trái: Form */}
      <div className="qr-form-container">
        <h2>Thông tin tạo mã</h2>
        <form onSubmit={handleSubmit}>
          {/* Ngân hàng */}
          <div className="qr-form-group">
            <label>Ngân hàng</label>
            <div className="bank-search-wrapper">
              <input
                type="text"
                placeholder="Chọn ngân hàng"
                value={bankName}
                readOnly
                onClick={() => {
                  setShowBankSearch(true);
                  setSearchTerm('');
                }}
              />
              <button
                type="button"
                className="submit-btn"
                onClick={() => {
                  setShowBankSearch(true);
                  setSearchTerm('');
                }}
              >
                Tìm ngân hàng
              </button>
            </div>
          </div>

          {/* Số tài khoản */}
          <div className="qr-form-group">
            <label>Số tài khoản</label>
            <input
              type="text"
              placeholder="Nhập số tài khoản"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              // onBlur={(e) => setAccountNumber(sanitizeInput(e.target.value))} 
              required
            />
          </div>

          {/* Tên chủ tài khoản */}
          <div className="qr-form-group">
            <label>Tên chủ tài khoản</label>
            <input
              type="text"
              placeholder="Nhập tên chủ tài khoản (không dấu)"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              // onBlur={(e) => setAccountHolder(sanitizeInput(e.target.value))}
              required
            />
          </div>

          {/* Số tiền */}
          <div className="qr-form-group">
            <label>Số tiền</label>
            <input
              type="number"
              placeholder="Nhập số tiền"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              // onBlur={(e) => setAmount(sanitizeInput(e.target.value))}
              required
            />
          </div>

          {/* Nội dung thanh toán (không bắt buộc) */}
          <div className="qr-form-group">
            <label>Nội dung thanh toán</label>
            <input
              type="text"
              placeholder="Nội dung không dấu (không bắt buộc)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              // onBlur={(e) => setContent(sanitizeInput(e.target.value))}
            />
          </div>

          <button type="submit" className="submit-btn">
            Tạo mã VietQR
          </button>
        </form>
      </div>

      {/* Cột phải: Hiển thị QR */}
      <div className="qr-display-container">
        <h2>Mã QR của bạn</h2>

        {qrCode ? (
          <div className="qr-frame-container">
            <img
              src="images/vietqr-payment-kit.png"
              alt="Khung VietQR"
              className="qr-frame"
            />
            <div className="qr-code-overlay">
              <QRCodeCanvas value={qrCode} size={150} />
            </div>
            <p className="qr-content">
              Nội dung: {content}
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(content || '')}
              >
                Copy
              </button>
            </p>
            <p className="qr-amount">
              Số tiền: {formatCurrency(amount)}
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(formatCurrency(amount))}
              >
                Copy
              </button>
            </p>
            <p className="qr-amount-words">
              Bằng chữ: {convertNumberToWords(amount)}
              <button
                className="copy-btn"
                onClick={() => copyToClipboard(convertNumberToWords(amount))}
              >
                Copy
              </button>
            </p>
          </div>
        ) : (
          <div className="qr-frame-container">
            <img
              src="images/vietqr-payment-kit.png"
              alt="Khung VietQR"
              className="qr-frame"
            />
            <div className="qr-code-overlay">
              <QRCodeCanvas value="https://vietqr.online" size={150} />
            </div>
            <p className="qr-string">Chưa có mã QR nào được tạo</p>
          </div>
        )}
      </div>

      {/* Popup tìm ngân hàng */}
      {showBankSearch && (
        <div className="bank-search-overlay">
          <div className="bank-search-box">
            <div className="bank-search-header">
              <h3>Tìm ngân hàng</h3>
              <button
                className="close-button"
                onClick={() => setShowBankSearch(false)}
              >
                Đóng
              </button>
            </div>
            <div className="bank-search-input">
              <input
                type="text"
                placeholder="Nhập tên hoặc mã ngân hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="bank-list-container">
              <ul className="bank-list">
                {filteredBanks.map((bank) => (
                  <li key={bank.code} onClick={() => handleSelectBank(bank)}>
                    <strong>{bank.code}</strong> - {bank.name}
                  </li>
                ))}
                {filteredBanks.length === 0 && (
                  <li style={{ color: '#999' }}>Không tìm thấy ngân hàng</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QrForm;
