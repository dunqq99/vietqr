import React, { useState } from 'react';
import './Service.css';

function Service() {
  const [activeStep, setActiveStep] = useState(1); // Mặc định hiển thị step 1
  const [activeResponseTab, setActiveResponseTab] = useState('200-qr-dong');
  const [activeCurlTab, setActiveCurlTab] = useState('qr-dong');

  const handleStepClick = (stepNumber) => {
    setActiveStep(stepNumber);
    // Reset activeResponseTab về mặc định khi chuyển step
    if (stepNumber === 2) {
      setActiveResponseTab('200');
    } else if (stepNumber === 3) {
      setActiveResponseTab('200-qr-dong');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Đã copy!'))
      .catch(() => alert('Không thể copy'));
  };

  return (
    <div className="service-container">
      <h1 className="service-title">Tài liệu kết nối API VietQR</h1>
      
      <div className="steps-container">
        {[1, 2, 3, 4].map((step) => (
          <div 
            key={step}
            className={`step-widget ${activeStep === step ? 'active' : ''}`}
            onClick={() => handleStepClick(step)}
          >
            <div className="step-number">{step}</div>
            <h3 className="step-title">
              {step === 1 && "Đăng ký tài khoản"}
              {step === 2 && "Lấy Token"}
              {step === 3 && "Tạo mã QR"}
              {step === 4 && "Hiển thị QR"}
            </h3>
            <p className="step-content">
              {step === 1 && "Đăng ký tài khoản đối tác với VietQR để nhận thông tin xác thực API: username và password cho việc tạo token."}
              {step === 2 && "Sử dụng API token_generate với thông tin xác thực để lấy access_token. Token có hiệu lực trong 300 giây."}
              {step === 3 && "Sử dụng access_token để gọi API tạo mã QR với thông tin người nhận và số tiền cần chuyển."}
              {step === 4 && "Nhận kết quả trả về và hiển thị mã QR cho người dùng quét để thực hiện giao dịch."}
            </p>
          </div>
        ))}
      </div>

      {/* API Documentation cho Step 1 */}
      {activeStep === 1 && (
        <div className="api-docs">
          <h2>Step 1: Đăng ký tài khoản API</h2>

          <div className="setup-section">
            <h3>1. Yêu cầu hệ thống</h3>
            <ul className="requirement-list">
              <li>Máy chủ có địa chỉ IP tĩnh</li>
              <li>Có khả năng cấu hình Reverse Proxy</li>
              <li>Hỗ trợ giao thức HTTPS</li>
              <li>Có chứng chỉ SSL hợp lệ</li>
            </ul>
          </div>

          <div className="setup-section">
            <h3>2. Cấu hình Reverse Proxy</h3>
            <p>Ví dụ cấu hình với Nginx:</p>
            <div className="code-block">
{`server {
    listen 443 ssl;
    server_name api.your-domain.com;

    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;

    location /vietqr/ {
        proxy_pass https://api.vietqr.org/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`}</div>
            <button className="copy-btn" onClick={() => copyToClipboard(/* nginx config */)}>
              Copy Nginx Config
            </button>
          </div>

          <div className="setup-section">
            <h3>3. Kiểm tra kết nối</h3>
            <p>Sử dụng đoạn code sau để kiểm tra kết nối tới server của bạn:</p>
            <div className="code-block">
{`curl --location --request GET 'https://api.your-domain.com/vietqr/health-check' \\
--header 'Content-Type: application/json'`}</div>
            <button className="copy-btn" onClick={() => copyToClipboard(/* curl command */)}>
              Copy cURL
            </button>
          </div>

          <div className="setup-section">
            <h3>4. Liên hệ đăng ký</h3>
            <p>Sau khi hoàn tất cấu hình, vui lòng cung cấp các thông tin sau:</p>
            <ul className="contact-checklist">
              <li>Domain name đã cấu hình</li>
              <li>IP public của server</li>
              <li>Thông tin doanh nghiệp</li>
              <li>Thông tin người phụ trách kỹ thuật</li>
            </ul>
            <div className="contact-box">
              <h4>Thông tin liên hệ</h4>
              <p><strong>Hotline:</strong> 0332 556 499 - Zalo</p>
              <p><strong>Telegram:</strong> @devcanvar</p>
              <p><strong>Email:</strong> Coderyeuem@gmail.com</p>
              <p className="note">Thời gian phản hồi: 8h00 - 22h00 các ngày trong tuần</p>
            </div>
          </div>
        </div>
      )}

      {/* API Documentation - chỉ hiển thị khi active step tương ứng */}
      {activeStep === 2 && (
        <div className="api-docs">
          <h2>Step 2: Lấy Token</h2>
          
          <div className="api-section">
            <div className="method-badge">POST</div>
            <div className="endpoint">
              https://dev.vietqr.org/vqr/api/token_generate
            </div>
          </div>

          <div className="api-section">
            <h3>Headers</h3>
            <table className="params-table">
              <tbody>
                <tr>
                  <td>Content-Type</td>
                  <td>application/json</td>
                </tr>
                <tr>
                  <td>Authorization</td>
                  <td>Bearer &lt;token&gt; bạn nhận được khi gọi API Get Token ở bước 2.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="api-section">
            <h3>Body</h3>
            <table className="params-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>access_token</td>
                  <td>String</td>
                  <td>Là Bearer Token được VietQR cung cấp sau khi hoàn thành bước 4. Dùng để truy cập tạo mã thanh toán VietQR.</td>
                </tr>
                <tr>
                  <td>token_type</td>
                  <td>String</td>
                  <td>Là dạng token dạng "Bearer".</td>
                </tr>
                <tr>
                  <td>expires_in</td>
                  <td>String</td>
                  <td>Thời gian hết hạn của token. Mặc định là 300 giây.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="api-section">
            <h3>Response</h3>
            <div className="response-tabs">
              <button 
                className={`tab ${activeResponseTab === '200' ? 'active' : ''}`}
                onClick={() => setActiveResponseTab('200')}
              >
                200
              </button>
              <button 
                className={`tab ${activeResponseTab === '400' ? 'active' : ''}`}
                onClick={() => setActiveResponseTab('400')}
              >
                400
              </button>
            </div>
            {activeResponseTab === '200' ? (
              <div className="code-block success-response">
{`{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
    "token_type": "Bearer",
    "expires_in": 300
}`}
              </div>
            ) : (
              <div className="code-block error-response">
{`{
    "status": "FAILED",
    "message": "mã_lỗi_và_mô_tả_lỗi"
}`}
              </div>
            )}
          </div>

          <div className="api-section">
            <h3>Code tham khảo</h3>
            <div className="code-tabs">
              <button 
                className={`tab ${activeCurlTab === 'qr-dong' ? 'active' : ''}`}
                onClick={() => setActiveCurlTab('qr-dong')}
              >
                cURL tạo mã QR động
              </button>
              <button 
                className={`tab ${activeCurlTab === 'qr-ban-dong' ? 'active' : ''}`}
                onClick={() => setActiveCurlTab('qr-ban-dong')}
              >
                cURL tạo mã QR bán động
              </button>
              <button 
                className={`tab ${activeCurlTab === 'qr-tinh' ? 'active' : ''}`}
                onClick={() => setActiveCurlTab('qr-tinh')}
              >
                cURL tạo mã QR tĩnh
              </button>
            </div>

            {activeCurlTab === 'qr-dong' && (
              <div className="code-block curl-example">
{`curl --location 'https://dev.vietqr.org/vqr/api/qr/generate-customer' \\
--header 'Cookie: JSESSIONID=5CAD2D74C5EBDF9B1CAC5684F2DB47CE; JSESSIONID=C1711954475F66AE09967ADFFA4C80CD; JSESSIONID=D4468C26FD481B215DBF12CB9707B0AD' \\
--header 'Content-Type: application/json' \\
--data '{
    "amount": "số_tiền_cần_thanh_toán",
    "content": "nội_dung_thanh_toán",
    "bankAccount": "tài_khoản_ngân_hàng_nhận",
    "bankCode": "mã_ngân_hàng",
    "userBankName": "tên_chủ_tài_khoản",
    "transType": "C:giao_dịch_đến/D:giao_dịch_đi",
    "qrType": 0,
    "orderId": "mã_đơn_hàng",
    "note": "ghi_chú_mã_qr",
    "urlLink": "link_mã_trang_qr_link_sẽ_redirect_đến_mã_qr_được_thanh_toán_thành_công",
    "additionalData": "thông_tin_thêm_mã_QR_có_thể_truyền_đi_khi_qr_được_thanh_toán_thành_công"
}'`}
              </div>
            )}

            {activeCurlTab === 'qr-ban-dong' && (
              <div className="code-block curl-example">
{`curl --location 'https://dev.vietqr.org/vqr/api/qr/generate-customer' \\
--header 'Cookie: JSESSIONID=5CAD2D74C5EBDF9B1CAC5684F2DB47CE; JSESSIONID=C1711954475F66AE09967ADFFA4C80CD; JSESSIONID=D4468C26FD481B215DBF12CB9707B0AD' \\
--header 'Content-Type: application/json' \\
--data '{
    "amount": "số_tiền_của_sản_phẩm",
    "content": "nội_dung_thanh_toán",
    "bankAccount": "tài_khoản_ngân_hàng_nhận",
    "bankCode": "mã_ngân_hàng",
    "userBankName": "tên_chủ_tài_khoản",
    "transType": "C:giao_dịch_đến/D:giao_dịch_đi",
    "qrType": "loại qr: 1",
    "terminalCode": "mã_điểm_bán_đã_đồng_bộ",
    "serviceCode": "mã_sản_phẩm",
    "qrType": 3
}'`}
              </div>
            )}

            {activeCurlTab === 'qr-tinh' && (
              <div className="code-block curl-example">
{`curl --location 'https://dev.vietqr.org/vqr/api/qr/generate-customer' \\
--header 'Cookie: JSESSIONID=5CAD2D74C5EBDF9B1CAC5684F2DB47CE; JSESSIONID=C1711954475F66AE09967ADFFA4C80CD; JSESSIONID=A2494C77F9BCB561B15CDFDF6FF2CD1F' \\
--header 'Content-Type: application/json' \\
--data '{
    "content": "nội_dung_thanh_toán",
    "bankAccount": "tài_khoản_ngân_hàng_nhận",
    "bankCode": "mã_ngân_hàng",
    "userBankName": "tên_chủ_tài_khoản",
    "transType": "C:giao_dịch_đến/D:giao_dịch_đi",
    "qrType": "loại qr: 1",
    "terminalCode": "mã_điểm_bán_đã_đồng_bộ"
}'`}
              </div>
            )}

            <button className="copy-btn" onClick={() => copyToClipboard(/* curl command */)}>
              Copy cURL
            </button>
          </div>
        </div>
      )}

      {/* API Documentation cho Step 3 */}
      {activeStep === 3 && (
        <div className="api-docs">
          <h2>Step 3: Tạo mã QR</h2>
          
          <div className="api-section">
            <div className="method-badge">POST</div>
            <div className="endpoint">
              https://dev.vietqr.org/vqr/api/qr/generate-customer
            </div>
          </div>

          <div className="api-section">
            <h3>Headers</h3>
            <table className="params-table">
              <tbody>
                <tr>
                  <td>Content-Type</td>
                  <td>application/json</td>
                </tr>
                <tr>
                  <td>Authorization</td>
                  <td>Bearer &lt;token&gt; bạn nhận được khi gọi API Get Token ở bước 2.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="api-section">
            <h3>Body</h3>
            <table className="params-table">
              <tbody>
                <tr>
                  <td data-label="Name">bankCode</td>
                  <td data-label="Type">String</td>
                  <td data-label="Required">Yes</td>
                  <td data-label="Description">Mã ngân hàng của tài khoản.</td>
                </tr>
                <tr>
                  <td data-label="Name">bankAccount</td>
                  <td data-label="Type">String</td>
                  <td data-label="Required">Yes</td>
                  <td data-label="Description">Tài khoản ngân hàng tạo mã thanh toán VietQR.</td>
                </tr>
                <tr>
                  <td data-label="Name">userBankName</td>
                  <td data-label="Type">String</td>
                  <td data-label="Required">Yes</td>
                  <td data-label="Description">Họ tên chủ tài khoản. Không dấu tiếng Việt.</td>
                </tr>
                <tr>
                  <td data-label="Name">content</td>
                  <td data-label="Type">String</td>
                  <td data-label="Required">Yes</td>
                  <td data-label="Description">Nội dung chuyển tiền.<br/>Tối đa 50 ký tự, tiếng Việt không dấu, không ký tự đặc biệt.</td>
                </tr>
                <tr>
                  <td data-label="Name">qrType</td>
                  <td data-label="Type">Integer</td>
                  <td data-label="Required">Yes</td>
                  <td data-label="Description">Tùy loại mã thanh toán cần tạo:<br/>- VietQR động: 0<br/>- VietQR tĩnh: 1<br/>- VietQR bán động: 3</td>
                </tr>
                <tr>
                  <td data-label="Name">amount</td>
                  <td data-label="Type">Long</td>
                  <td data-label="Required">Optional</td>
                  <td data-label="Description">Số tiền cần thanh toán.<br/>*Bắt buộc nếu* qrType = 0 hoặc 3</td>
                </tr>
                <tr>
                  <td data-label="Name">orderId</td>
                  <td data-label="Type">String</td>
                  <td data-label="Required">Optional</td>
                  <td data-label="Description">Mã ID giao dịch bên đối tác cần quản lý "orderId" sẽ được trả về khi hệ thống nhận biến động số dư (có trong giao dịch vừng với giao dịch được tạo bằng mã QR).</td>
                </tr>
                <tr>
                  <td data-label="Name">transType</td>
                  <td data-label="Type">String</td>
                  <td data-label="Required">Optional</td>
                  <td data-label="Description">Phân loại giao dịch là ghi nợ/ghi có (giá trị: D/C).<br/>Mặc định là "C".<br/>*Bắt buộc nếu* qrType = 0</td>
                </tr>
                <tr>
                  <td data-label="Name">terminalCode</td>
                  <td data-label="Type">String</td>
                  <td data-label="Required">Optional</td>
                  <td data-label="Description">Mã cửa hàng/điểm bán.<br/>*Bắt buộc nếu* qrType = 1 hoặc 3</td>
                </tr>
                <tr>
                  <td data-label="Name">serviceCode</td>
                  <td data-label="Type">String</td>
                  <td data-label="Required">Optional</td>
                  <td data-label="Description">Mã sản phẩm, dịch vụ được thanh toán.<br/>*Bắt buộc nếu* qrType = 3</td>
                </tr>
                <tr>
                  <td data-label="Name">subTerminalCode</td>
                  <td data-label="Type">String</td>
                  <td data-label="Required">Optional</td>
                  <td data-label="Description">Mã cửa hàng/điểm bán phụ.</td>
                </tr>
                <tr>
                  <td data-label="Name">sign</td>
                  <td data-label="Type">String</td>
                  <td data-label="Required">Optional</td>
                  <td data-label="Description">Chữ ký.</td>
                </tr>
                <tr>
                  <td data-label="Name">urlLink</td>
                  <td data-label="Type">String</td>
                  <td data-label="Required">Optional</td>
                  <td data-label="Description">Trang chuyển đến sau khi quét mã thanh toán. Khi thanh toán thành công sẽ tự động.</td>
                </tr>
                <tr>
                  <td data-label="Name">note</td>
                  <td data-label="Type">String</td>
                  <td data-label="Required">Optional</td>
                  <td data-label="Description">Ghi chú cho giao dịch.</td>
                </tr>
                <tr>
                  <td data-label="Name">additionalData</td>
                  <td data-label="Type">Object</td>
                  <td data-label="Required">Optional</td>
                  <td data-label="Description">Các tham số truyền thêm.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="api-section">
            <h3>Response</h3>
            <div className="response-tabs">
              <button 
                className={`tab ${activeResponseTab === '200-qr-dong' ? 'active' : ''}`}
                onClick={() => setActiveResponseTab('200-qr-dong')}
              >
                200 - mã QR động
              </button>
              <button 
                className={`tab ${activeResponseTab === '200-qr-ban-dong' ? 'active' : ''}`}
                onClick={() => setActiveResponseTab('200-qr-ban-dong')}
              >
                200 - mã QR bán động
              </button>
              <button 
                className={`tab ${activeResponseTab === '200-qr-tinh' ? 'active' : ''}`}
                onClick={() => setActiveResponseTab('200-qr-tinh')}
              >
                200 - mã QR tĩnh
              </button>
              <button 
                className={`tab ${activeResponseTab === '400' ? 'active' : ''}`}
                onClick={() => setActiveResponseTab('400')}
              >
                400
              </button>
            </div>

            {activeResponseTab === '200-qr-dong' && (
              <div className="code-block success-response">
{`{
    "bankCode": "mã_ngân_hàng",
    "bankName": "tên_ngân_hàng",
    "bankAccount": "tài_khoản_ngân_hàng_nhận",
    "customerName": "tên_chủ_tài_khoản",
    "amount": "số_tiền_cần_thanh_toán",
    "content": "nội_dung_thanh_toán",
    "qrCode": "mã_QR_dạng_string",
    "imgId": "id_ảnh_ngân_hàng",
    "qrInfor": "1. đã_được_tạo_trên_hệ_thống_vietQR_thành_công",
    "transactionId": "id_giao_dịch_của_QR",
    "transactionRefId": "mã_giao_dịch_của_QR",
    "qrLink": "mã_QR_dạng_link",
    "terminalCode": "mã_điểm_bán",
    "subTerminalCode": "mã_con_điểm_bán",
    "serviceCode": "mã_sản_phẩm",
    "storeId": "mã_cửa_hàng",
    "additionalData": "thông_tin_thêm"
}`}
              </div>
            )}

            {activeResponseTab === '200-qr-ban-dong' && (
              <div className="code-block success-response">
{`{
    "bankCode": "mã_ngân_hàng",
    "bankName": "tên_ngân_hàng",
    "bankAccount": "tài_khoản_ngân_hàng_nhận",
    "userBankName": "tên_chủ_tài_khoản",
    "amount": "số_tiền_cần_thanh_toán",
    "content": "nội_dung_thanh_toán",
    "qrCode": "mã_QR_dạng_string",
    "imgId": "id_ảnh_ngân_hàng",
    "existing": "1: đã_được_tạo_trên_hệ_thống_vietQR_thành_công",
    "transactionId": "id_định_danh_của_QR",
    "transactionRefId": "mã_định_danh_của_QR",
    "qrLink": "mã_QR_dạng_link",
    "terminalCode": "mã_điểm_bán",
    "subTerminalCode": "mã_con_điểm_bán",
    "serviceCode": "mã_sản_phẩm",
    "orderId": "mã_đơn_hàng",
    "additionalData": "thông_tin_thêm"
}`}
              </div>
            )}

            {activeResponseTab === '200-qr-tinh' && (
              <div className="code-block success-response">
{`{
    "bankCode": "mã_ngân_hàng",
    "bankName": "tên_ngân_hàng",
    "bankAccount": "tài_khoản_ngân_hàng_nhận",
    "userBankName": "tên_chủ_tài_khoản",
    "amount": "số_tiền_cần_thanh_toán",
    "content": "nội_dung_thanh_toán",
    "qrCode": "mã_QR_dạng_string",
    "imgId": "id_ảnh_ngân_hàng",
    "existing": "1: đã_được_tạo_trên_hệ_thống_vietQR_thành_công",
    "transactionId": "id_định_danh_của_QR",
    "transactionRefId": "mã_định_danh_của_QR",
    "qrLink": "mã_QR_dạng_link",
    "terminalCode": "mã_điểm_bán",
    "subTerminalCode": "mã_con_điểm_bán",
    "serviceCode": "mã_sản_phẩm",
    "orderId": "mã_đơn_hàng",
    "additionalData": "thông_tin_thêm"
}`}
              </div>
            )}

            {activeResponseTab === '400' && (
              <div className="code-block error-response">
{`{
    "status": "FAILED",
    "message": "mã_lỗi_và_mô_tả_lỗi"
}`}
              </div>
            )}
          </div>

          <div className="api-section">
            <h3>Code tham khảo</h3>
            <div className="code-tabs">
              <button 
                className={`tab ${activeCurlTab === 'qr-dong' ? 'active' : ''}`}
                onClick={() => setActiveCurlTab('qr-dong')}
              >
                cURL tạo mã QR động
              </button>
              <button 
                className={`tab ${activeCurlTab === 'qr-ban-dong' ? 'active' : ''}`}
                onClick={() => setActiveCurlTab('qr-ban-dong')}
              >
                cURL tạo mã QR bán động
              </button>
              <button 
                className={`tab ${activeCurlTab === 'qr-tinh' ? 'active' : ''}`}
                onClick={() => setActiveCurlTab('qr-tinh')}
              >
                cURL tạo mã QR tĩnh
              </button>
            </div>

            {activeCurlTab === 'qr-dong' && (
              <div className="code-block curl-example">
{`curl --location 'https://dev.vietqr.org/vqr/api/qr/generate-customer' \\
--header 'Cookie: JSESSIONID=5CAD2D74C5EBDF9B1CAC5684F2DB47CE; JSESSIONID=C1711954475F66AE09967ADFFA4C80CD; JSESSIONID=D4468C26FD481B215DBF12CB9707B0AD' \\
--header 'Content-Type: application/json' \\
--data '{
    "amount": "số_tiền_cần_thanh_toán",
    "content": "nội_dung_thanh_toán",
    "bankAccount": "tài_khoản_ngân_hàng_nhận",
    "bankCode": "mã_ngân_hàng",
    "userBankName": "tên_chủ_tài_khoản",
    "transType": "C:giao_dịch_đến/D:giao_dịch_đi",
    "qrType": 0,
    "orderId": "mã_đơn_hàng",
    "note": "ghi_chú_mã_qr",
    "urlLink": "link_mã_trang_qr_link_sẽ_redirect_đến_mã_qr_được_thanh_toán_thành_công",
    "additionalData": "thông_tin_thêm_mã_QR_có_thể_truyền_đi_khi_qr_được_thanh_toán_thành_công"
}'`}
              </div>
            )}

            {activeCurlTab === 'qr-ban-dong' && (
              <div className="code-block curl-example">
{`curl --location 'https://dev.vietqr.org/vqr/api/qr/generate-customer' \\
--header 'Cookie: JSESSIONID=5CAD2D74C5EBDF9B1CAC5684F2DB47CE; JSESSIONID=C1711954475F66AE09967ADFFA4C80CD; JSESSIONID=D4468C26FD481B215DBF12CB9707B0AD' \\
--header 'Content-Type: application/json' \\
--data '{
    "amount": "số_tiền_của_sản_phẩm",
    "content": "nội_dung_thanh_toán",
    "bankAccount": "tài_khoản_ngân_hàng_nhận",
    "bankCode": "mã_ngân_hàng",
    "userBankName": "tên_chủ_tài_khoản",
    "transType": "C:giao_dịch_đến/D:giao_dịch_đi",
    "qrType": "loại qr: 1",
    "terminalCode": "mã_điểm_bán_đã_đồng_bộ",
    "serviceCode": "mã_sản_phẩm",
    "qrType": 3
}'`}
              </div>
            )}

            {activeCurlTab === 'qr-tinh' && (
              <div className="code-block curl-example">
{`curl --location 'https://dev.vietqr.org/vqr/api/qr/generate-customer' \\
--header 'Cookie: JSESSIONID=5CAD2D74C5EBDF9B1CAC5684F2DB47CE; JSESSIONID=C1711954475F66AE09967ADFFA4C80CD; JSESSIONID=A2494C77F9BCB561B15CDFDF6FF2CD1F' \\
--header 'Content-Type: application/json' \\
--data '{
    "content": "nội_dung_thanh_toán",
    "bankAccount": "tài_khoản_ngân_hàng_nhận",
    "bankCode": "mã_ngân_hàng",
    "userBankName": "tên_chủ_tài_khoản",
    "transType": "C:giao_dịch_đến/D:giao_dịch_đi",
    "qrType": "loại qr: 1",
    "terminalCode": "mã_điểm_bán_đã_đồng_bộ"
}'`}
              </div>
            )}

            <button className="copy-btn" onClick={() => copyToClipboard(/* curl command */)}>
              Copy cURL
            </button>
          </div>
        </div>
      )}

      {/* API Documentation cho Step 4 */}
      {activeStep === 4 && (
        <div className="api-docs">
          <h2>Step 4: Hiển thị mã QR</h2>
          
          <div className="api-section">
            <h3>Hiển thị mã QR sử dụng QRCodeCanvas</h3>
            <p>Sau khi nhận được response từ API, sử dụng giá trị <code>qrCode</code> để hiển thị mã QR:</p>
            
            <div className="code-block">
{`import { QRCodeCanvas } from 'qrcode.react';

// Trong component của bạn
function QRCodeDisplay({ qrCode }) {
  return (
    <div className="qr-container">
      <QRCodeCanvas 
        value={qrCode}
        size={256}
        bgColor="#ffffff"
        fgColor="#000000"
        level="L"
        includeMargin={true}
      />
    </div>
  );
}`}
            </div>

            <div className="setup-section">
              <h3>Các thuộc tính của QRCodeCanvas</h3>
              <table className="params-table">
                <thead>
                  <tr>
                    <th>Thuộc tính</th>
                    <th>Kiểu dữ liệu</th>
                    <th>Mặc định</th>
                    <th>Mô tả</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>value</td>
                    <td>String</td>
                    <td>Required</td>
                    <td>Giá trị qrCode nhận được từ response API</td>
                  </tr>
                  <tr>
                    <td>size</td>
                    <td>Number</td>
                    <td>256</td>
                    <td>Kích thước của mã QR (đơn vị pixel)</td>
                  </tr>
                  <tr>
                    <td>bgColor</td>
                    <td>String</td>
                    <td>"#ffffff"</td>
                    <td>Màu nền của mã QR</td>
                  </tr>
                  <tr>
                    <td>fgColor</td>
                    <td>String</td>
                    <td>"#000000"</td>
                    <td>Màu của các module QR</td>
                  </tr>
                  <tr>
                    <td>level</td>
                    <td>String</td>
                    <td>"L"</td>
                    <td>Mức độ sửa lỗi (L, M, Q, H)</td>
                  </tr>
                  <tr>
                    <td>includeMargin</td>
                    <td>Boolean</td>
                    <td>false</td>
                    <td>Thêm margin xung quanh mã QR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="setup-section">
              <h3>Ví dụ sử dụng</h3>
              <div className="code-block">
{`// Trong component xử lý response API
const handleGenerateQR = async () => {
  try {
    const response = await fetch('https://dev.vietqr.org/vqr/api/qr/generate-customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      body: JSON.stringify({
        // ... các thông tin tạo QR
      })
    });

    const data = await response.json();
    if (data.qrCode) {
      return (
        <QRCodeDisplay qrCode={data.qrCode} />
      );
    }
  } catch (error) {
    console.error('Lỗi khi tạo mã QR:', error);
  }
}`}
              </div>
            </div>

            <div className="note-section">
              <h3>Lưu ý</h3>
              <ul>
                <li>Cần cài đặt thư viện qrcode.react: <code>npm install qrcode.react</code></li>
                <li>Mã QR được tạo ra sẽ tự động điều chỉnh kích thước để hiển thị tốt nhất trên thiết bị</li>
                <li>Có thể tùy chỉnh style cho container chứa mã QR để phù hợp với giao diện của ứng dụng</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Service;