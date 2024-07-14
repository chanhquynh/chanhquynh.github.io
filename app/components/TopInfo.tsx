import { HeartFilled } from '@ant-design/icons';

import { WeddingButtons } from '.';

export default function TopInfo() {
  return (
    <div id="top-info">
      <HeartFilled className="top-info-heart" />
      <HeartFilled className="top-info-heart" />
      <div id="top-info-wrapper">
        <div id="top-info-intro" className="top-info-content">
          <span id="top-info-names">
            Quỳnh Anh <br /> Minh Chánh
          </span>
          <span id="top-info-date">
            <span className="top-info-date-line"></span>
            14 Tháng 9 2024
            <span className="top-info-date-line"></span>
          </span>
          <WeddingButtons transfer={true} type="outline" />
        </div>
        <div id="top-info-pic" className="top-info-content"></div>
      </div>
    </div>
  );
}
