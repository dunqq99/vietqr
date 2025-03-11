import React, { useState } from 'react';
import './News.css';

function News() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: "Tích hợp VietQR vào thiết bị IoT - Xu hướng thanh toán tự động",
      date: "15/03/2024",
      category: "IoT & Thanh toán",
      summary: "Khám phá cách VietQR đang cách mạng hóa trải nghiệm thanh toán tự động qua các thiết bị IoT thông minh, từ máy bán hàng đến dịch vụ giải trí...",
      content: `<h2>VietQR và Thiết Bị IoT - Tương lai của Thanh Toán Tự Động</h2>
        <p>Công nghệ VietQR đang mở ra kỷ nguyên mới cho thanh toán tự động thông qua các thiết bị IoT. Người dùng có thể dễ dàng thanh toán tại:</p>
        <h3>Các ứng dụng phổ biến</h3>
        <ul>
          <li>Máy bán nước tự động: Tích hợp màn hình QR động</li>
          <li>Máy gắp thú bông: Thanh toán nhanh chóng qua quét mã</li>
          <li>Photobooth chụp ảnh: Tự động in ảnh sau khi thanh toán</li>
          <li>Máy giặt sấy công cộng: Kích hoạt dịch vụ qua QR</li>
          <li>Trạm sạc pin di động: Thuê và thanh toán tự động</li>
        </ul>
        <h3>Lợi ích nổi bật</h3>
        <ul>
          <li>Giảm chi phí vận hành và bảo trì</li>
          <li>Hoạt động 24/7 không cần nhân viên</li>
          <li>Báo cáo doanh thu theo thời gian thực</li>
          <li>An toàn và chống gian lận</li>
        </ul>`,
      tags: ["#IoT", "#ThanhToánTựĐộng", "#VietQR", "#SmartVending"]
    },
    {
      id: 2,
      title: "Giải pháp VietQR cho thương mại điện tử - Tối ưu trải nghiệm thanh toán",
      date: "14/03/2024",
      category: "E-commerce",
      summary: "Tích hợp VietQR vào website thương mại điện tử giúp tối ưu hóa quy trình thanh toán và tăng tỷ lệ chuyển đổi...",
      content: `<h2>VietQR trong Thương Mại Điện Tử</h2>
        <p>VietQR mang đến giải pháp thanh toán toàn diện cho các nền tảng thương mại điện tử:</p>
        <h3>Tính năng chính</h3>
        <ul>
          <li>API tích hợp đơn giản, linh hoạt</li>
          <li>Xác nhận thanh toán real-time</li>
          <li>Hỗ trợ đa nền tảng (Web, Mobile, App)</li>
          <li>Dashboard quản lý giao dịch</li>
        </ul>
        <h3>Lợi ích cho doanh nghiệp</h3>
        <ul>
          <li>Giảm tỷ lệ đơn hàng bị hủy</li>
          <li>Tăng tốc độ xử lý đơn hàng</li>
          <li>Báo cáo doanh thu chi tiết</li>
          <li>Tích hợp với các hệ thống CRM, ERP</li>
        </ul>`,
      tags: ["#TMĐT", "#ThươngMạiĐiệnTử", "#VietQR", "#Payment"]
    },
    {
      id: 3,
      title: "Giải pháp thu ngân thông minh với VietQR cho cửa hàng",
      date: "13/03/2024",
      category: "Bán lẻ",
      summary: "Hệ thống quản lý thu ngân tích hợp VietQR giúp tối ưu quy trình thanh toán và chia sẻ thông tin cho nhân viên...",
      content: `<h2>VietQR cho Hệ Thống Thu Ngân</h2>
        <p>Giải pháp toàn diện cho việc quản lý thu ngân và chia sẻ thông tin thanh toán:</p>
        <h3>Tính năng cho thu ngân</h3>
        <ul>
          <li>Màn hình hiển thị QR động cho khách hàng</li>
          <li>Thông báo thanh toán real-time</li>
          <li>Quản lý ca làm việc và doanh thu</li>
          <li>Phân quyền nhân viên chi tiết</li>
        </ul>
        <h3>Quản lý thông tin thanh toán</h3>
        <ul>
          <li>Dashboard theo dõi giao dịch</li>
          <li>Báo cáo doanh thu theo nhân viên</li>
          <li>Xuất báo cáo tự động</li>
          <li>Đồng bộ với hệ thống kế toán</li>
        </ul>`,
      tags: ["#ThuNgân", "#QuảnLýBánHàng", "#VietQR", "#POS"]
    },
    {
      id: 4,
      title: "Tích hợp VietQR cho máy bán hàng tự động thế hệ mới",
      date: "12/03/2024",
      category: "IoT & Vending",
      summary: "Giải pháp toàn diện cho việc tích hợp VietQR vào hệ thống máy bán hàng tự động, từ giftbox đến máy làm kẹo bông...",
      content: `<h2>VietQR cho Máy Bán Hàng Tự Động</h2>
        <p>Giải pháp tích hợp cho các loại máy bán hàng tự động:</p>
        <h3>Ứng dụng đa dạng</h3>
        <ul>
          <li>Máy làm kẹo bông tự động</li>
          <li>Giftbox may mắn với QR động</li>
          <li>Túi mù qrcode độc đáo</li>
          <li>Máy massage tự phục vụ</li>
        </ul>
        <h3>Tính năng quản lý</h3>
        <ul>
          <li>Theo dõi tồn kho thời gian thực</li>
          <li>Cảnh báo bảo trì thiết bị</li>
          <li>Báo cáo doanh thu tự động</li>
          <li>Quản lý từ xa qua cloud</li>
        </ul>`,
      tags: ["#MáyBánHàng", "#VendingMachine", "#VietQR", "#IoT"]
    },
    {
      id: 5,
      title: "Thanh toán tiện ích với VietQR - Từ hóa đơn đến dịch vụ công",
      date: "11/03/2024",
      category: "Tiện ích",
      summary: "VietQR mở rộng khả năng thanh toán cho các dịch vụ tiện ích, từ hóa đơn điện nước đến các dịch vụ công...",
      content: `<h2>VietQR cho Thanh Toán Tiện Ích</h2>
        <p>Giải pháp thanh toán toàn diện cho các dịch vụ tiện ích:</p>
        <h3>Phạm vi áp dụng</h3>
        <ul>
          <li>Hóa đơn điện, nước, internet</li>
          <li>Học phí, viện phí</li>
          <li>Phí dịch vụ công</li>
          <li>Nạp tiền điện thoại</li>
        </ul>`,
      tags: ["#TiệnÍch", "#ThanhToánHóaĐơn", "#VietQR"]
    },
    {
      id: 6,
      title: "Bảo mật và quản lý rủi ro trong thanh toán VietQR tự động",
      date: "10/03/2024",
      category: "Bảo mật",
      summary: "Các giải pháp bảo mật và quản lý rủi ro khi triển khai VietQR trong các hệ thống thanh toán tự động...",
      content: `<h2>Bảo Mật Trong Thanh Toán Tự Động</h2>
        <p>Giải pháp bảo mật toàn diện cho hệ thống thanh toán:</p>
        <h3>Tính năng bảo mật</h3>
        <ul>
          <li>Mã hóa đầu cuối</li>
          <li>Xác thực hai lớp</li>
          <li>Giám sát giao dịch real-time</li>
          <li>Phát hiện gian lận tự động</li>
        </ul>`,
      tags: ["#BảoMật", "#QuảnLýRủiRo", "#VietQR", "#Security"]
    }
  ];

  return (
    <div className="news-container">
      <h1 className="news-main-title">Tin tức về VietQR - Giải pháp thanh toán QR hiện đại</h1>
      
      <div className="news-grid">
        {articles.map(article => (
          <article key={article.id} className="news-item" onClick={() => setSelectedArticle(article)}>
            <h2>{article.title}</h2>
            <div className="news-meta">
              <span className="date">Cập nhật: {article.date}</span>
              <span className="category">{article.category}</span>
            </div>
            <p>{article.summary}</p>
            <div className="news-tags">
              {article.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {selectedArticle && (
        <div className="article-popup-overlay" onClick={() => setSelectedArticle(null)}>
          <div className="article-popup" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedArticle(null)}>×</button>
            <div className="article-content" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
            <div className="article-meta">
              <span className="date">Cập nhật: {selectedArticle.date}</span>
              <span className="category">{selectedArticle.category}</span>
            </div>
            <div className="news-tags">
              {selectedArticle.tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default News;