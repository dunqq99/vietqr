import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <section className="about-header">
        <h1>Giới thiệu về VietQR</h1>
        <p className="intro-text">
          VietQR là giải pháp thanh toán QR code thống nhất tại Việt Nam, được phát triển bởi NAPAS 
          và được Ngân hàng Nhà nước Việt Nam chỉ định. Chúng tôi cung cấp giải pháp tích hợp toàn diện 
          cho doanh nghiệp và các nhà phát triển.
        </p>
      </section>

      <section className="qr-applications">
        <h2>Ứng dụng của VietQR</h2>
        
        <div className="application-grid">
          <div className="application-item">
            <h3>Thanh toán tự động</h3>
            <ul>
              <li>Máy bán hàng tự động</li>
              <li>Trạm sạc pin công cộng</li>
              <li>Máy giặt sấy tự động</li>
              <li>Photobooth tự động</li>
              <li>Máy gắp thú bông</li>
            </ul>
          </div>

          <div className="application-item">
            <h3>Thương mại điện tử</h3>
            <ul>
              <li>Website bán hàng</li>
              <li>Ứng dụng di động</li>
              <li>Sàn thương mại điện tử</li>
              <li>Cổng thanh toán</li>
            </ul>
          </div>

          <div className="application-item">
            <h3>Bán lẻ & Dịch vụ</h3>
            <ul>
              <li>Cửa hàng bán lẻ</li>
              <li>Nhà hàng, café</li>
              <li>Dịch vụ giao hàng</li>
              <li>Dịch vụ giải trí</li>
            </ul>
          </div>

          <div className="application-item">
            <h3>Thanh toán tiện ích</h3>
            <ul>
              <li>Hóa đơn điện nước</li>
              <li>Học phí, viện phí</li>
              <li>Phí dịch vụ công</li>
              <li>Nạp tiền điện thoại</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Tính năng nổi bật</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Tích hợp đơn giản</h3>
            <p>API đơn giản, tài liệu chi tiết, hỗ trợ đa nền tảng</p>
          </div>
          <div className="feature-item">
            <h3>Bảo mật cao</h3>
            <p>Chuẩn bảo mật ngân hàng, mã hóa đầu cuối, xác thực đa lớp</p>
          </div>
          <div className="feature-item">
            <h3>Quản lý thông minh</h3>
            <p>Dashboard quản lý, báo cáo real-time, thống kê chi tiết</p>
          </div>
          <div className="feature-item">
            <h3>Hỗ trợ 24/7</h3>
            <p>Đội ngũ kỹ thuật chuyên nghiệp, hỗ trợ triển khai tận nơi</p>
          </div>
        </div>
      </section>

      <section className="contact-info">
        <h2>Thông tin liên hệ</h2>
        <div className="contact-grid">
          <div className="contact-item">
            <h3>Văn phòng chính</h3>
            <p>Tầng 16, Tòa nhà VietQR Tower</p>
            <p>123 Nguyễn Huệ, Quận 1, TP.HCM</p>
          </div>
          
          <div className="contact-item">
            <h3>Hỗ trợ kỹ thuật</h3>
            <p>Email: support@vietqr.online</p>
            <p>Hotline: 0332556499</p>
          </div>

          <div className="contact-item">
            <h3>Kinh doanh</h3>
            <p>Email: coderyeuem@gmail.com</p>
            <p>Hotline: 0332556499</p>
          </div>

          <div className="contact-item">
            <h3>Giờ làm việc</h3>
            <p>Thứ 2 - Thứ 6: 8:30 - 17:30</p>
            <p>Thứ 7: 8:30 - 12:00</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;