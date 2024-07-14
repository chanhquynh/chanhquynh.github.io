'use client';

import { ReactElement, useEffect, useState } from 'react';

import { showTransfer } from '.';

type Props = {
  transfer?: boolean;
  type?: 'primary' | 'outline';
};

export default function WeddingButtons(props: Props) {
  const [btns, setBtns] = useState<ReactElement[]>([]);

  const smoothScroll = () => {
    const wrapper = document.getElementById('cq-content-wrapper__outer');
    wrapper?.classList.add('scroll-smooth');
    setTimeout(() => wrapper?.classList.remove('scroll-smooth'), 500);
  };
  useEffect(() => {
    const _btns = [];
    _btns.push(
      <a
        href="#blessing"
        className={`cq-btn cq-btn-${props.type ?? 'primary'}`}
        onClick={smoothScroll}
      >
        Gửi lời chúc
      </a>
    );
    if (window.location.pathname !== '/') {
      _btns.push(
        <a
          href="#confirmation"
          className={`cq-btn cq-btn-${props.type ?? 'primary'}`}
          onClick={smoothScroll}
        >
          Xác nhận tham dự
        </a>
      );
      if (props.transfer) {
        _btns.push(
          <a
            className={`cq-btn cq-btn-${props.type ?? 'primary'}`}
            onClick={showTransfer}
          >
            Mừng cưới
          </a>
        );
      }
    }

    setBtns(_btns);
  }, [props.transfer, props.type]);

  return (
    <div id="top-info-btns" className="wedding-btns">
      {btns}
    </div>
  );
}
