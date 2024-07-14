import { Modal } from 'antd';

import { Divider } from '.';

export function showTransfer() {
  Modal.info({
    centered: true,
    icon: ' ',
    keyboard: true,
    maskClosable: true,
    closable: true,
    footer: [],
    content: <div id="transfer-photo-modal"></div>,
    title: <h1 className="section-title">Mừng Cưới</h1>,
    className: 'cq-transfer-modal',
  });
}

export default function Transfer() {
  return (
    <div id="transfer" className="cq-section">
      <div className="section-bg"></div>
      <div className="section-wrapper">
        <h1 className="section-title">Mừng Cưới</h1>
        <Divider />
        <div id="cq-transfer-wrapper">
          <div id="transfer-photo"></div>
        </div>
      </div>
    </div>
  );
}
