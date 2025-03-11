import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Liên hệ với chúng tôi</h1>
      
      <div className="contact-description">
        <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Hãy liên hệ với chúng tôi qua các kênh sau:</p>
      </div>

      <div className="social-grid">
        <a 
          href="https://zalo.me/0332556499" 
          className="social-link"
          style={{ '--social-color': '#0068FF' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="social-icon">
            <img src="/icons/zalo.png" alt="Zalo" />
          </div>
          <div className="social-info">
            <h3>Zalo</h3>
            <p>Chat với chúng tôi qua Zalo</p>
          </div>
        </a>

        <a 
          href="https://facebook.com/your-profile" 
          className="social-link"
          style={{ '--social-color': '#1877F2' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="social-icon">
            <img src="/icons/facebook.png" alt="Facebook" />
          </div>
          <div className="social-info">
            <h3>Facebook</h3>
            <p>Theo dõi chúng tôi trên Facebook</p>
          </div>
        </a>

        <a 
          href="https://t.me/your-username" 
          className="social-link"
          style={{ '--social-color': '#0088cc' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="social-icon">
            <img src="/icons/telegram.png" alt="Telegram" />
          </div>
          <div className="social-info">
            <h3>Telegram</h3>
            <p>Nhắn tin với chúng tôi qua Telegram</p>
          </div>
        </a>

        <a 
          href="https://m.me/your-profile" 
          className="social-link"
          style={{ '--social-color': '#00B2FF' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="social-icon">
            <img src="/icons/messenger.png" alt="Messenger" />
          </div>
          <div className="social-info">
            <h3>Messenger</h3>
            <p>Chat với chúng tôi qua Messenger</p>
          </div>
        </a>

        <a 
          href="https://www.threads.net/@your-profile" 
          className="social-link"
          style={{ '--social-color': '#000000' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="social-icon">
            <img src="/icons/threads.png" alt="Threads" />
          </div>
          <div className="social-info">
            <h3>Threads</h3>
            <p>Theo dõi chúng tôi trên Threads</p>
          </div>
        </a>

        <a 
          href="https://youtube.com/@your-channel" 
          className="social-link"
          style={{ '--social-color': '#FF0000' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="social-icon">
            <img src="/icons/youtube.png" alt="YouTube" />
          </div>
          <div className="social-info">
            <h3>YouTube</h3>
            <p>Xem video hướng dẫn trên YouTube</p>
          </div>
        </a>

        <a 
          href="https://twitter.com/your-profile" 
          className="social-link"
          style={{ '--social-color': '#000000' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="social-icon">
            <img src="/icons/x.png" alt="X (Twitter)" />
          </div>
          <div className="social-info">
            <h3>X (Twitter)</h3>
            <p>Theo dõi chúng tôi trên X</p>
          </div>
        </a>

        <a 
          href="tel:0332556499" 
          className="social-link"
          style={{ '--social-color': '#4CAF50' }}
        >
          <div className="social-icon">
            <img src="/icons/phone.png" alt="Phone" />
          </div>
          <div className="social-info">
            <h3>Điện thoại</h3>
            <p>Gọi cho chúng tôi: 0332556499</p>
          </div>
        </a>
      </div>

      <div className="contact-info">
        <h2>Thông tin liên hệ</h2>
        <div className="info-grid">
          <div className="info-item">
            <h3>Email Hỗ trợ</h3>
            <p>support@vietqr.online</p>
          </div>
          <div className="info-item">
            <h3>Email Kinh doanh</h3>
            <p>sales@vietqr.online</p>
            <p>coderyeuem@gmail.com</p>
          </div>
          <div className="info-item">
            <h3>Hotline</h3>
            <p>0332556499</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;