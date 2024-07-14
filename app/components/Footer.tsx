import { Divider } from '.';

export default function Footer() {
  return (
    <div id="footer" className="cq-section">
      <div className="section-bg"></div>
      <div className="section-wrapper">
        <span id="footer-save-the-date">Save the date</span>
        <span id="footer-names">Quỳnh Anh & Minh Chánh</span>
        <Divider className="footer-divider" />
        <span id="footer-date">14 Tháng 9, 2024</span>
      </div>
    </div>
  );
}
