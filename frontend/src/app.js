import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QrForm from './QrForm';
import Service from './Service';
import News from './News';
import About from './About';
import Contact from './Contact';
import './app.css'; // Import file CSS

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <div className="header-container">
            <button className="menu-toggle" onClick={toggleMenu}>
              ☰
            </button>
            <div className="logo-container">
              <img src="images/images/VietQR-logo.png" alt="VietQR Logo" className="logo" />
            </div>
            <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
              <ul className="nav-list">
                <li className="nav-item"><Link to="/create-qr" onClick={() => setIsMenuOpen(false)}>Tạo mã QR</Link></li>
                <li className="nav-item"><Link to="/service" onClick={() => setIsMenuOpen(false)}>Tài liệu kết nối API</Link></li>
                <li className="nav-item"><Link to="/tin-tuc" onClick={() => setIsMenuOpen(false)}>Tin tức</Link></li>
                <li className="nav-item"><Link to="/gioi-thieu" onClick={() => setIsMenuOpen(false)}>Giới thiệu</Link></li>
                <li className="nav-item"><Link to="/lien-he" onClick={() => setIsMenuOpen(false)}>Liên hệ</Link></li>
              </ul>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<QrForm />} />
            <Route path="/create-qr" element={<QrForm />} />
            <Route path="/service" element={<Service />} />
            <Route path="/tin-tuc" element={<News />} />
            <Route path="/gioi-thieu" element={<About />} />
            <Route path="/lien-he" element={<Contact />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>Hotline: 0332 556 499 - Zalo</p>
          <p>Tele: @devcanvar</p>
          <p>Email: Coderyeuem@gmail.com</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
